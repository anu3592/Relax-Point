import React, { useEffect, useState } from "react";
import { SlArrowLeftCircle } from "react-icons/sl";

const Theatre = ()=>{
    const [name, setName] = useState("");
    const [year, setYear] = useState("");

    useEffect(()=>{
        

        let obj = JSON.parse(localStorage.getItem('movie'));
        let title = obj.title;
        title = String(title);
        title = title.toLowerCase();
        let movieName = title.split(' ').join('-');
        console.log(movieName);
        
        setName(movieName);
        setYear(obj.year);

        
    })
    return(
        <div id="frame">
            <iframe src={`https://gokutv.pics/${name}-${year}/#`} className="shrink" name="myiFrame"
            scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="500px" width="600px"
            allowfullscreen allow="fullscreen"></iframe>
            {/*kung-fu-panda-4-2024 */}
        </div>
    )
}

export default Theatre;