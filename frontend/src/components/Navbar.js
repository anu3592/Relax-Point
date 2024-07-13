import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { details } from '../components/action/index';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [moreOption, setMoreOption] = useState(false);
    const [val, setVal] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let check = localStorage.getItem('user');

    const sendData = async (value) => {
        let result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=5d1c7323&t=${value}`);
        result = await result.json();
        console.log(result);

        dispatch(details(result));
        //localStorage.setItem('movie',JSON.stringify(result));
        navigate('/select');
    }

    const LogOut = ()=>{
        localStorage.clear();
        navigate('/login');
        
    }

    return (
        <nav className="flex flex-row w-screen justify-between items-center z-10 p-1">
            <h1 className="text-3xl font-bold text-orange-500 m-2 cursive max-sm:text-lg">Relax Point</h1>
            <div className="flex flex-row m-2 ">
                <FaSearch size={30} className="m-2 text-white bg-orange-500 h-[50px] w-[50px] p-2 mr-[-2px] mt-[-0.25px] rounded-l-md cursor-pointer " onClick={() => sendData(val)} />
                <input placeholder="search..." className="rounded-r-md w-[200px] h-[50px] p-2 focus:outline-none" value={val} onChange={(e) => setVal(e.target.value)} />
            </div>
            {check ?
                <>
                    <Link to="/" className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg">Home</Link>
                    <Link className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg">About us</Link>
                    <Link to="/room" className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg">Streaming</Link>
                    <Link className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg" onClick={LogOut}>Logout</Link>
                    <Link className="hidden md:flex text-white font-bold text-xl m-2"><CgProfile size={25} /></Link>
                    <Link className="md:hidden text-white font-bold text-xl m-2" onClick={() => setMoreOption(!moreOption)}><PiDotsThreeOutlineVerticalFill size={25} /></Link>
                </> :
                <>
                    <Link to="/login" className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg">Login</Link>
                    <Link to='/signup' className="hidden md:flex text-white font-bold text-xl m-2 p-2 hover:border-2 hover:border-orange-400 hover:text-orange-400 rounded-lg max-sm:text-lg">Sign Up</Link>
                    <Link className="md:hidden text-white font-bold text-xl m-2" onClick={() => setMoreOption(!moreOption)}><PiDotsThreeOutlineVerticalFill size={25} /></Link>
                </>
            }
            {
                moreOption ? <div className="bg-black/60 fixed w-full h-screen z-10 top-0 left-0" onClick={() => setMoreOption(!moreOption)}></div> : <></>
            }

            <div className={moreOption ? "fixed top-0 right-0 w-[300px] h-screen bg-black z-10 duration-200" :
                "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"}>
                <nav>
                    <h1 className="text-xl font-bold text-orange-500 cursive">Relax Point</h1>
                    <ul className="flex flex-col text-xl justify-center items-center">
                        {check ?
                            <>
                                <Link to='/'><li className="font-bold m-3 p-2 text-white cursor-pointer ">Home</li></Link>
                                <li className="font-bold m-3 p-2 text-white cursor-pointer">About Us</li>
                                <Link to='/room'><li className="font-bold m-3 p-2 text-white cursor-pointer">Streaming</li></Link>
                                <li className="flex font-bold m-3 p-2 text-white cursor-pointer" onClick={LogOut}> Logout</li>
                                <li className="flex font-bold m-3 p-2 text-white cursor-pointer"><CgProfile size={25} /> Profile</li>
                            </>
                            :
                            <>
                                <Link to='/login'><li className="font-bold m-3 p-2 text-white cursor-pointer ">Login</li></Link>
                                <Link to="/signup"><li className="font-bold m-3 p-2 text-white cursor-pointer">Sign Up</li></Link>
                            </>
                        }
                    </ul>
                </nav>
            </div>

        </nav>

    );
}

export default Navbar;
