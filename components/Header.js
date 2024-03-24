'use client';
import { MdMenuOpen, MdNotificationsActive } from "react-icons/md";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GrSettingsOption } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { disableNavWithFooter } from "@/utils/disableNavWithFooter";
import Sidebar from "./Sidebar";
import { signOut, useSession } from "next-auth/react"
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";

export default function Header() {
  const path = usePathname();
  const {data:session}=useSession();
  const [show,setShow]=useState(false)

  const handleShow=(e)=>{
    e.preventDefault()
    if(show === true){
      setShow(false)
    }else{
      setShow(true)
    }
  }

  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <header className="bg-teal-300 bg-fixed w-full h-[60px]">
          <div className="flex items-center justify-between h-full">
            <div className="pr-5 h-full">
              <ul className="nav inline-flex h-full">
              <li className="nav-item inline-flex items-center pr-2 pl-2 group relative h-full">
                  <IoMdLogOut className="text-2xl cursor-pointer transition-colors delay-100 ease-out hover:text-indigo-400" />
                  <div className="border-solid -bottom-[25px] border-teal-500 border-l-8 -rotate-90 border-y-transparent border-y-[6px] border-r-0 absolute right-0 opacity-0 transition-all group-hover:right-3 group-hover:opacity-100"></div>
                  <div className="scale-0 absolute top-[60px] left-0 bg-teal-500 rounded-lg p-1 text-white text-md transition-all ease-out delay-50 group-hover:scale-100">
                    خروج
                  </div>
                </li>
                <li className="nav-item inline-flex items-center pr-2 pl-2 group relative h-full">
                  <GrSettingsOption className="text-2xl cursor-pointer transition-colors delay-100 ease-out hover:text-indigo-400" />
                  <div className="border-solid -bottom-[25px] border-teal-500 border-l-8 -rotate-90 border-y-transparent border-y-[6px] border-r-0 absolute right-0 opacity-0 transition-all group-hover:right-3 group-hover:opacity-100"></div>
                  <div className="scale-0 absolute top-[60px] left-0 bg-teal-500 rounded-lg p-1 text-white text-md transition-all ease-out delay-50 group-hover:scale-100">
                    تنظیمات
                  </div>
                </li>
                <li className="nav-item inline-flex items-center pr-2 pl-2 group relative h-full">
                  <GiCaptainHatProfile className="text-2xl cursor-pointer transition-colors delay-100 ease-out hover:text-[#facc15]" />
                  <div className="border-solid -bottom-[25px] border-teal-500 border-l-8 -rotate-90 border-y-transparent border-y-[6px] border-r-0 absolute right-0 opacity-0 transition-all group-hover:right-3 group-hover:opacity-100"></div>
                  <div className="scale-0 absolute top-[60px] left-0 bg-teal-500 rounded-lg p-1 text-white text-md transition-all ease-out delay-50 group-hover:scale-100">
                    مدیریت
                  </div>
                </li>
                <li className="nav-item inline-flex items-center pr-2 pl-2 group relative h-full">
                  <MdNotificationsActive className="text-2xl cursor-pointer transition-all delay-100 ease-out hover:text-rose-600" />
                  <div className="border-solid -bottom-[25px] border-teal-500 border-l-8 -rotate-90 border-y-transparent border-y-[6px] border-r-0 absolute right-0 opacity-0 transition-all group-hover:right-4 group-hover:opacity-100"></div>
                  <div className="scale-0 absolute h-auto w-[240px] top-[60px] -right-4 bg-teal-500 rounded-lg p-1 text-white text-md transition-all ease-out delay-50 group-hover:scale-100">
                    <div className="notifications p-2 relative h-[100%]">
                      {/* <Link href='#' className="notification-item border-b border-gray-300 p-2 block">
                                        نویسنده مطلب جدیدی اضافه کرده
                                    </Link>
                                    <Link href='#' className="notification-item border-b border-gray-300 p-2 block">
                                        ادمین مطلب جدیدی اضافه کرده
                                    </Link>
                                    <Link href='#' className="notification-item border-b border-gray-300 p-2 block">
                                        یک پیام از ادمین
                                    </Link> */}
                      <span className="text-xs text-center p-3 block">
                        هشدار جدید وجود ندارد
                      </span>
                      <div className=" bottom-0 p-3 text-center border-t border-gray-300">
                        <Link href="#">برای مشاهده همه کلیک کنید</Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item inline-block pr-2 pl-2"></li>
              </ul>
            </div>
            <div className="pl-2">
              <div className="icons">
                <button className={`p-2 hover:ring-4 mix-blend-color-burn ${show === true ? 'transition-all ease-in-out ml-64' : ''}`}>
                  <MdMenuOpen className={`text-2xl cursor-pointer ${show===true && 'rotate-180'}`} onClick={(e)=>handleShow(e)} />
                </button>
              </div>
                <Sidebar name={session?.user?.name} show={show} signOut={signOut}/>
              
            </div>
          </div>
        </header>
      )}
    </>
  );
}
