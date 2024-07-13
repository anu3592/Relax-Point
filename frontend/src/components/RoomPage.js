import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "./SocketProvider";
import peer from "./peer";
import { useLocation } from "react-router-dom";


const RoomPage = ()=>{
    const socket = useSocket();
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [remoteSocketId, setRemoteSocketId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const room = location.pathname.split('/')[2];
        if (email && room) {
            socket.emit('room:join', { email, room });
        }
    }, [location.search, location.pathname, socket]);

    const handleUserJoined = ({email, id})=>{
        console.log(`Email ${email} joined the room`);
        setRemoteSocketId(id);
    }

    const handleScreenShare = async () => {
        /*const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        //peer.peer.removeTrack(myStream);
        setMyStream(stream);
        // Remove existing video and audio tracks
        peer.peer.getSenders().forEach(sender => peer.peer.removeTrack(sender));
        
        // Add screen share tracks to peer connection
        myStream.getTracks().forEach(track => peer.peer.addTrack(track, myStream));*/

        
        const mediaStream = await getLocalScreenCaptureStream();
        
         const screenTrack = mediaStream.getVideoTracks()[0];

        if(screenTrack){
            console.log('replace camera track with screen track');
            replaceTrack(screenTrack);
        }
        
        screenTrack.onended = async () => {
            //stopScreenShare();
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            const videoTrack = stream.getVideoTracks()[0];
            setMyStream(prevStream => {
                const newStream = new MediaStream([...prevStream.getAudioTracks(), videoTrack]);
                return newStream;
            });
            const Track = stream.getVideoTracks()[0];
            if(Track)
            {
                replaceTrack(Track);
            }
        };
    };

    const getLocalScreenCaptureStream = async ()=>{
        try{
            const screenCaptureStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            return screenCaptureStream;
        }
        catch(error)
        {
            console.log('failed to get local screen', error);
        }

    }

    const replaceTrack = (newTrack)=>{
        const sender = peer.peer.getSenders().find(sender => 
            sender.track.kind === newTrack.kind
        );

        if(!sender){
            console.log('failed to find sender');

            return;
        }

        sender.replaceTrack(newTrack);


    }

    const stopScreenShare = async () => {
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop());
            const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
            setMyStream(stream);
            
        }
    };

    const handleCallUser = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});
        const offer = await peer.getOffer();
        socket.emit('user:call', {to:remoteSocketId, offer});
        setMyStream(stream);
    }

    const handleIncommingCall = async ({from, offer})=>{
        console.log("incomming call ",from, offer);
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});
        setMyStream(stream);
        const ans = await peer.getAns(offer);
        socket.emit("call:accepted", {to: from, ans});
    }

    const sendStream = ()=>{
        for(const track of myStream.getTracks())
            {
                peer.peer.addTrack(track,myStream);
            }
    }

    const handleCallAccepted = ({from, ans})=>{
        peer.setLocalDescription(ans);
        console.log("call accepted");
    }


    const handleNegoNeeded = async ()=>{
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', {offer, to:remoteSocketId});
    }

    const handleNegoNeedIncomming = async ({from, offer})=>{
        const ans = await peer.getAns(offer);
        socket.emit('peer:nego:done', {to:from, ans});
    }

    const handleNegoNeedFinal = async ({from, ans})=>{
        await peer.setLocalDescription(ans);
    }

    useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
        return ()=>{
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
        }
    })

    useEffect(()=>{
        peer.peer.addEventListener('track', async(ev)=>{
            const remoteStream = ev.streams;
            console.log('Tracks!!!');
            setRemoteStream(remoteStream[0]);
        })

    },[])
    
    useEffect(()=>{
        socket.on('user:joined', handleUserJoined);
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncomming);
        socket.on('peer:nego:final', handleNegoNeedFinal);

        return ()=>{
            socket.off('user:joined', handleUserJoined);
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncomming);
            socket.off('peer:nego:final', handleNegoNeedFinal);
        }
    },[])

    return(
        <>
        
            <h1 className="text-2xl text-white font-bold m-2">Now you are streaming</h1>
            
            <ReactPlayer playing muted controls height="300px" width="300px" url={remoteStream} className="ml-[35%] mt-4 mb-4 mr-4"/>
            <h4 className="text-xl text-white font-bold m-2">{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream? <button className="text-lg text-white bg-orange-400 rounded-md border-none p-1 w-[200px] m-2" onClick={sendStream}>Send Stream</button>:<></>}
            {remoteSocketId? <button className="text-lg text-white bg-orange-400 rounded-md border-none p-1 w-[100px] m-2" onClick={handleCallUser}>Call</button>:<></>}
            {myStream? <button className="text-lg text-white bg-orange-400 rounded-md border-none p-1 w-[200px] m-2" onClick={handleScreenShare}>Share Screen</button>:<></>}
            <ReactPlayer playing muted controls height="300px" width="300px" url={myStream} className="ml-[35%] mt-4 mb-4 mr-4"/>
            
            
        
        </>
    )
}

export default RoomPage;