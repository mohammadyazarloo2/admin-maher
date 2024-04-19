"use client";

import { signOut, useSession } from "next-auth/react";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPresentationChartFill } from "react-icons/pi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import NoteIndex from "./NoteIndex";
import Tasks from "./Tasks";

export default function UserInfo() {
  const { data: session } = useSession();

  const [saleModel, setSaleModal] = useState(false);

  const openSaleChart = () => {
    if (saleModel === true) {
      setSaleModal(false);
    } else {
      setSaleModal(true);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-2 grid-cols-2 p-5">
        <div className=" bg-sky-400 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> کاربران</h2>
          <button className="p-2 bg-transparent border hover:bg-lime-300 rounded-md text-slate-100">
            مدیریت کاربران
          </button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <FaUsers className="w-10 h-10 text-slate-100" />
          </div>
        </div>
        <div className=" bg-green-400 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> محصولات</h2>
          <button className="p-2 bg-transparent border hover:bg-sky-300 rounded-md text-slate-100">
            مدیریت محصولات
          </button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <MdOutlineProductionQuantityLimits className="w-10 h-10 text-slate-100" />
          </div>
        </div>
        <div className=" bg-pink-600 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> فروش</h2>
          <button className="p-2 bg-transparent hover:bg-amber-100 border rounded-md text-slate-100">
            مدیریت آمار فروش
          </button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <MdOutlineProductionQuantityLimits className="w-10 h-10 text-slate-100" />
          </div>
          <div
            className="absolute bottom-0 left-2"
            onClick={() => openSaleChart()}
          >
            <PiPresentationChartFill className="w-6 h-6 text-slate-100 cursor-pointer" />
          </div>
        </div>
      </div>
      <div
        className={`salemodal fixed top-0 left-0 bg-gradient-radial w-full h-screen from-emerald-400 p-4 z-20 flex items-center justify-center ${
          saleModel === true
            ? "transition-all ease-in-out duration-300 opacity-100"
            : "transition-all ease-in-out duration-300 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-zinc-100 w-full h-full shadow-md rounded-md ${
            saleModel === true
              ? "transition-all ease-in-out duration-300 translate-y-1"
              : "transition-all ease-in-out duration-300 translate-y-full"
          }`}
        >
          <div className="w-full p-3 flex justify-between items-center">
            <div className="">آمار فروش</div>
            <div className=" cursor-pointer" onClick={() => openSaleChart()}>
              <IoMdCloseCircleOutline className="text-red-600 text-2xl" />
            </div>
          </div>
          <div className="tabs w-full h-auto p-3">
            <div className="tab-links flex items-center justify-start p-3">
              <Link href={'#daily'} className="tab-link p-2 active bg-red-500 text-white">روزانه</Link>
              <Link href={'#monthly'} className="tab-link p-2 bg-slate-400 ">ماهانه</Link>
              <Link href={'#yearly'} className="tab-link p-2 bg-slate-400">سالانه</Link>
            </div>
            <div className="tab-content w-full h-[400px] bg-red-100">
              <div className="cahrt"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 h-full justify-end mt-5 mx-4">
        {/* quick access section */}

        {/* Weather App Section */}
        <Weather />

        {/* دفترچه یادداشت */}

        <NoteIndex />

        {/* مدیریت وظایف */}

        <Tasks />
      </div>
    </>
  );
}
