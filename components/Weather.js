'use client'
import { useEffect, useState } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { IoCloudSharp } from "react-icons/io5";
import { BsCloudHaze2 } from "react-icons/bs";
import { LiaCloudRainSolid } from "react-icons/lia";

export default function Weather(){
    const apiWeather = {
        key: "f6236fa149b1b70b02599662d457c536",
        base: "https://api.openweathermap.org/data/2.5/",
      };
    
      const [search, setSearch] = useState("");
      const [weather, setWeather] = useState("");
      const [lat, setLat] = useState("");
      const [long, setLong] = useState("");

    const searchPressed = () => {
        fetch(`${apiWeather.base}weather?q=${search}&units=metric&lang=fa&cnt=7&APPID=${apiWeather.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
          });
      };

    return(
        <div className=" h-auto shadow-lg p-8 bg-zince-300/10 flex flex-col item gap-2 my-6">
            {weather.cod == 404 && <div className="bg-red-400 text-white text-center p-3">{'شهر مورد نظر یافت نشد'}</div>}
            {weather.cod == 200 && (
            <div className=" flex flex-col items-center">
                {weather.weather[0].main == 'Clear' && <p className="pb-2"><TiWeatherSunny className="text-4xl text-yellow-400" /></p>}
                {weather.weather[0].main == 'Clouds' && <p className="pb-2"><IoCloudSharp className="text-4xl text-sky-500" /></p>}
                {weather.weather[0].main == 'Haze' && <p className="pb-2"><BsCloudHaze2 className="text-4xl text-yellow-800" /></p>}
                {weather.weather[0].main == 'Rain' && <p className="pb-2"><LiaCloudRainSolid className="text-4xl text-blue-600" /></p>}
                <p className="pb-2">{weather.name}</p>
                <p className="pb-2">{weather.main.temp} f</p>
                <p className="pb-2"> {weather.weather[0].description} </p>
            </div>
            )}
            <h1 className="">آب و هوا</h1>
            <div className="">
            <input
                type="text"
                className="w-full"
                placeholder="منظقه مورد نظرتو جستجو کن"
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className="p-2 bg-pink-600 text-white mt-2 w-full" onClick={searchPressed}>جستجو</button>
            </div>
            
        </div>
    )
}