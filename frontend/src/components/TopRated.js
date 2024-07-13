
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from "react-router-dom";
import {details} from '../components/action/index';
import { useDispatch } from "react-redux";

const TopRated = () => {
    const [cat, setCat] = useState([]);
    const [imgData, setImgData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const top = () => {
        fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Nzk4MzQ5ZDk2ZWM0YzRjOWNlMzEyN2E5MWViZTgzNCIsInN1YiI6IjY2NDFjNWU5MzliNzUwZjY0NGU1OTJhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0aRKjIlFYYgLQ_mlRp6kWxCcOPiTptu_v1Nqv3qpuRs',
                'content-type': 'application/json',
            }
        })
            .then((result) => result.json())
            .then((data) => {
                setCat(data.results);
            })
            .catch((error) => {
                console.log("Error fetching top rated movies");
            })
    }

    const getImg = async () => {
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
    }

    const sendData = (Title, date, Plot, imdbRating, Poster)=>{
        date = String(date);
        let Year = date.substr(0,4);
        let obj = {
            Title,Year,Plot,
            imdbRating,
            Poster,
            Genre: "NA",
            Country: "NA"
        }
        dispatch(details(obj));
        navigate('/select');
        console.log(obj);
    }

    useEffect(() => {
        top();
    }, []);

    useEffect(() => {
        if (cat.length > 0) {
            getImg();
        }
    }, [cat]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl text-white font-bold m-2">Top Rated</h1>
            <div className="hidden lg:flex max-w[1520px] m-auto py-2 px-2">
                <div className="hidden">{}</div>
                <Splide options={{ perPage: 6, gap: "0.5rem", drag: "free", arrows: false }}>
                    {
                        cat && cat.length > 0 ? cat.map((item, index) => {
                            return (
                                <SplideSlide key={index}>
                                    <div className='flex flex-col rounded-3xl relative cursor-pointer' onClick={()=>sendData(item.title,item.release_date,item.overview,item.vote_average,imgData[index])}>
                                        <img className='h-[200px] w-full object-cover rounded-3xl cursor-pointer hover:scale-105 ease-out duration-300'
                                            src={imgData[index]} alt={item.title} />
                                            <h1 className="text-lg text-white font-bold m-2">{item.title}</h1>
                                    </div>
                                </SplideSlide>
                            )
                        }) : ("")
                    }
                </Splide>
            </div>
        </div>
    )
}

export default TopRated;