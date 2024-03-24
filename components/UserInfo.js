"use client";

import { signOut, useSession } from "next-auth/react";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import { FaAngleLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { MdNotificationImportant } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
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

  const [taskStatus, setTaskStatus] = useState("");

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-2 grid-cols-2 p-5">
      <div className=" bg-sky-400 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> کاربران</h2>
          <button className="p-2 bg-transparent border hover:bg-lime-300 rounded-md text-slate-100">مدیریت کاربران</button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <FaUsers className="w-10 h-10 text-slate-100" />
          </div>
        </div>
        <div className=" bg-green-400 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> محصولات</h2>
          <button className="p-2 bg-transparent border hover:bg-sky-300 rounded-md text-slate-100">مدیریت محصولات</button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <MdOutlineProductionQuantityLimits className="w-10 h-10 text-slate-100" />
          </div>
        </div>
        <div className=" bg-pink-600 p-4 relative rounded-md">
          <h2 className="pb-3 text-slate-100"> فروش</h2>
          <button className="p-2 bg-transparent hover:bg-amber-100 border rounded-md text-slate-100">مدیریت آمار فروش</button>
          <div className="absolute top-0 left-0 z-0 opacity-50 h-full w-full flex items-center justify-end">
            <span className="pl-3 text-slate-100">324 </span>
            <MdOutlineProductionQuantityLimits className="w-10 h-10 text-slate-100" />
          </div>
          <div className="absolute bottom-0 left-2">
            <PiPresentationChartFill className="w-6 h-6 text-slate-100" />

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
