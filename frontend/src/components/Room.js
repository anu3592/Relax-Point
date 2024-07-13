import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useNavigate } from "react-router-dom";


const Room = ()=>{
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    
    const navigate = useNavigate();

    const socket = useSocket();

    const handleFormSubmit = (e)=>{
        e.preventDefault();

        //socket.emit('room:join', {email, room});
        const url = `/room/${room}?email=${encodeURIComponent(email)}`;
        window.open(url, '_blank');
        //console.log(socket);
    }

    const handleJoinRoom = (data)=>{
        const {email, room} = data;
        //navigate(`/room/${room}`);
        
    }

    useEffect(()=>{
        socket.on('room:join', handleJoinRoom);

        return ()=>{
            socket.off('room:join', handleJoinRoom);
        }
    })

    return(
        <div className="flex flex-col m-2">
            <h1 className="text-3xl text-white font-bold m-3">Room to invite</h1>
            <form onSubmit={handleFormSubmit} className="">
                <label htmlFor="email" className="text-white text-xl font-bold m-3">Email ID</label>
                <br/>
                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email..." className="w-[200px] h-7 rounded-lg m-2 p-2"/>
                <br/>
                <label htmlFor="room" className="text-white text-xl font-bold m-3">Room Number</label>
                <br/>
                <input type="text" id="room" value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="Room no..." className="w-[200px] h-7 rounded-lg m-2 p-2"/>
                <br/>
                <button className="w-[100px] p-2 bg-green-400 rounded-lg m-3">Join</button>
            </form>
            
        </div>
    )
}

export default Room;