import React, { useEffect, useState, useMemo, useCallback } from "react";
import { CgPlayButtonO } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { details } from '../components/action/index';
import { useNavigate } from "react-router-dom";

const Home = () => {
    /*const [name, setName] = useState('');
    const [img, setImg] = useState('');
    let num = Math.floor(Math.random() * 20);
    useEffect(() => {
        callTmdb();
        if (name != '') {
            getMovieImg(name);
        }
    })
    const getMovieImg = async (name) => {
        let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${name}`, {
            method: 'GET',
        });
        result = await result.json();
        setImg(result.poster);
        console.log(img);
    }
    const callTmdb = async () => {
        let result = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Nzk4MzQ5ZDk2ZWM0YzRjOWNlMzEyN2E5MWViZTgzNCIsInN1YiI6IjY2NDFjNWU5MzliNzUwZjY0NGU1OTJhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0aRKjIlFYYgLQ_mlRp6kWxCcOPiTptu_v1Nqv3qpuRs',
                'content-type': 'application/json',
            }
        });

        result = await result.json();
        
        setName(result.results[num].title);
        console.log(name);
    }*/

    //const [name, setName] = useState('');
    let name = "";
    const num = Math.floor(Math.random() * 20);
    const [img, setImg] = useState();
    const [cat, setCat] = useState();
    const [imgData, setImgData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getMovieImg = useCallback(async (movieName) => {
        try {
            let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${movieName}`, {
                method: 'GET',
            });
            result = await result.json();
            setImg(result.Poster);
            name = result.Title;
            //console.log(result);
        } catch (error) {
            console.error("Error fetching movie image:", error);
        }
    }, []);

    const callTmdb = useCallback(async () => {
        try {
            let result = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Nzk4MzQ5ZDk2ZWM0YzRjOWNlMzEyN2E5MWViZTgzNCIsInN1YiI6IjY2NDFjNWU5MzliNzUwZjY0NGU1OTJhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0aRKjIlFYYgLQ_mlRp6kWxCcOPiTptu_v1Nqv3qpuRs',
                    'content-type': 'application/json',
                }
            });

            result = await result.json();

            //setName(result.results[num].title);
            name = result.results[num].title;
            setCat(result.results);


            //console.log(cat);
        } catch (error) {
            console.error("Error calling TMDB API:", error);
        }
    }, []);

    /*const memo = usefunction getImage(){
        let arr = [];
        let len = 0;
        if(cat && cat.length)
            {
                len = cat.length;
            }
        for (let i = 0; i < len; i++) {
            let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${cat[i].title}`, {
                method: 'GET',
            });

            result = await result.json();
            arr.push(result.Poster);
        }
        setImgData(arr);
    }, []);*/

    const sendData = async (value) => {
        let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${value.title}`);
        result = await result.json();
        console.log(result);

        dispatch(details(result));
        //localStorage.setItem('movie',JSON.stringify(result));
        navigate('/select');
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(!token){
            navigate('/login');
        }
        
        const fetchData = async () => {
            try {
                await callTmdb();
                if (name !== '') {
                    await getMovieImg(name);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        //getImage();

    }, [callTmdb, getMovieImg, name, localStorage.getItem('token')]);


    useEffect(() => {
        const getImage = async () => {
            let arr = [];
            let len = 0;
            if (cat && cat.length) {
                len = cat.length;
            }
            for (let i = 0; i < len; i++) {
                let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${cat[i].title}`, {
                    method: 'GET',
                });

                result = await result.json();
                arr.push(result.Poster);
            }
            setImgData(arr);
        };

        getImage();
    }, [cat]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="max-w-[1520px] h-screen w-full py-4 px-4 relative object-cover">
                <div className="w-full h-full bg-center bg-cover duration-500" style={{ backgroundImage: `url(${img})` }}>
                
                </div>
                
                <h1 className="text-3xl text-white font-bold z-20 items-center mt-[-200px]">{name}</h1>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl text-white font-bold">Top Categories</h1>
                <h1 className="hidden"></h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-5 px-2 m-2">
                    {
                        cat && cat.length > 0 ? cat.map((val, index) => (
                            <div className="flex flex-col m-2 justify-center items-center">
                                <img src={imgData[index]} alt="image" className="h-[300px] w-[300px]" />
                                <h1 className="text-xl text-white m-2">{val.title}</h1>
                                <button className="flex text-sm font-bold rounded-lg p-2 bg-green-400 w-[70px] m-2" onClick={() => sendData(val)}><CgPlayButtonO size={25} />Watch</button>
                            </div>
                        )) : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;