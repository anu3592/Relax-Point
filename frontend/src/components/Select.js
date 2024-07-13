import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from "react-router-dom";
import TopRated from "./TopRated";


const Select = () => {
    const movie = useSelector((state) => state.getDetails);

    const len = movie.length;
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    const goToTheatre = (title, year) => {
        let obj = {
            title,year
        };
        localStorage.setItem('movie',JSON.stringify(obj));
        navigate('/theatre');
    }

    useEffect(() => {

        //topRated();
        //getImag();
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);

    }, [])




    return (
        <>
            {loading ? <p className="text-2xl text-white font-bold">Loading...</p> :
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row h-[400px] w-[96%] border-2 border-white rounded-xl p-2 m-3 items-center">
                        <img src={movie[len - 1].Poster} className="w-[50%] h-[95%] rounded-lg m-2 p-1" />

                        <div className="flex flex-col justify-center h-full">
                            <h1 className="text-xl text-white font-bold m-2 max-sm:text-md">{movie[len - 1].Title}</h1>
                            <p className="text-white m-2 max-sm:text-sm">{movie[len - 1].Plot}</p>
                            <div className="flex flex-row">
                                <h1 className="text-lg text-orange-300 m-2 max-sm:text-sm">Genre:</h1>
                                <p className="text-white m-2 max-sm:text-sm">{movie[len - 1].Genre}</p>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="text-lg text-orange-300 m-2 max-sm:text-sm">Country:</h1>
                                <p className="text-white m-2 max-sm:text-sm">{movie[len - 1].Country}</p>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="text-lg text-orange-300 m-2 max-sm:text-sm">Imdb Rating:</h1>
                                <p className="text-white m-2 max-sm:text-sm">{movie[len - 1].imdbRating}</p>
                            </div>
                            <button className="p-2 w-[100px] rounded-lg bg-green-300 max-sm:w-[70px] max-sm:text-[0.6rem]" onClick={()=>goToTheatre(movie[len-1].Title, movie[len-1].Year)}>Watch Now</button>
                        </div>

                    </div>
                    <TopRated />
                </div>
            }
        </>

    )
}

export default Select;