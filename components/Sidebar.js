"use client";

import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Sidebar(props) {
  return (
    <div className={`flex fixed  top-0 h-screen z-20 w-[250px] ${props.show === true ? ' left-0 transition-all ease-in-out duration-300' : 'left-[-250px] transition-all ease-in-out duration-300' }`}>
      {/* Sidebar */}
      <div className="bg-gray-800 px-4 py-8 w-full text-right">
        <div className="flex flex-col items-center ">
          <div className="sidebar-head-img border-2 border-gray-400 rounded-full p-3">
            <Image src="/logo.png" width={"100"} height={"100"} />
          </div>
          <span className="text-lg text-white py-2"> {props.name} </span>
        </div>
        <nav>
          <ul className="list-none">
            <Link
              href="/"
              className="inline-flex items-center w-full text-gray-300 hover:text-white"
            >
              <MdKeyboardDoubleArrowLeft />
              <span className="block p-2">داشبورد</span>
            </Link>
            <div href="#" className="flex flex-col justify-center text-gray-300 hover:text-white p-2 relative border border-1 border-slate-400 group">
              <div className="inline-flex justify-between items-center w-full">
                <span className="block">کاربران</span>
                <FaChevronLeft className="group-hover:rotate-90 transition-all delay-500 ease-in-out" />
              </div>
              <div className="menu-down block pt-2 h-0 scale-0 pointer-events-none group-hover:pointer-events-auto group-hover:h-auto group-hover:scale-100 transition-all ease-in-out duration-500">
                <div className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>ایجاد کاربر جدید</span>
                </div>
                <div className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>مدیریت کاربران</span>
                </div>
                <div className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>حذف کاربر</span>
                </div>
              </div>
            </div>
            <div href="#" className="flex flex-col justify-center text-gray-300 hover:text-white p-2 relative border border-1 border-slate-400 group">
              <div className="inline-flex justify-between items-center w-full">
                <span className="block">محصولات</span>
                <FaChevronLeft className="group-hover:rotate-90 transition-all delay-500 ease-in-out" />
              </div>
              <div className="menu-down block pt-2 h-0 scale-0 pointer-events-none group-hover:pointer-events-auto group-hover:h-auto group-hover:scale-100 transition-all ease-in-out duration-500">
                <Link href="/products/create" className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>ایجاد محصول جدید</span>
                </Link>
                <Link href='/products' className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>مدیریت محصولات</span>
                </Link>
                <Link href="/products/delete" className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>حذف محصولات</span>
                </Link>
              </div>
            </div>
            <div href="#" className="flex flex-col justify-center text-gray-300 hover:text-white p-2 relative border border-1 border-slate-400 group">
              <div className="inline-flex justify-between items-center w-full">
                <span className="block">دستبه بندی ها</span>
                <FaChevronLeft className="group-hover:rotate-90 transition-all delay-500 ease-in-out" />
              </div>
              <div className="menu-down block pt-2 h-0 scale-0 pointer-events-none group-hover:pointer-events-auto group-hover:h-auto group-hover:scale-100 transition-all ease-in-out duration-500">
                <Link href='/category' className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>ایجاد دسته بندی جدید</span>
                </Link>
                <Link href='/category' className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>مدیریت دسته بندی ها</span>
                </Link>
                <Link href='/category' className="menu-item pt-2 inline-flex items-center w-full">
                  <MdKeyboardDoubleArrowLeft className="ml-2" />
                  <span>حذف دسته بندی</span>
                </Link>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
