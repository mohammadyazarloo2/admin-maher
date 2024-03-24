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
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Note from "./NoteIndex";

export default function NoteIndex() {
  const [notes, setNotes] = useState("");
  const [textNote, setTextNote] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const c = setInterval(() => {
      fetch("/api/note")
        .then((res) => res.json())
        .then((responsive) => setNotes(responsive.data));

      console.log(notes);
    }, 5000);
    return ()=>clearInterval(c)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !textNote) {
      return;
    }
    try {
      const res = await fetch("/api/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, textNote }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error during registration", error);
    }
  };

  return (
    <div className="h-auto bg-gradient-to-t from-amber-200 p-2 mt-4 rounded-lg shadow-lg relative overflow-hidden">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded-lg p-2 my-1"
          placeholder="عنوان یادداشت"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="note"
          className="w-full rounded-lg p-2 my-2"
          type="text"
          placeholder="یادداشت"
          onChange={(e) => setTextNote(e.target.value)}
        ></textarea>
        <button className="w-full p-2 bg-yellow-500 rounded-md text-white">
          ثبت
        </button>
      </form>
      <Link
        href="/note"
        className="flex justify-between items-center my-2 mt-3"
      >
        <div>مشاهده بیشتر</div>
        <FaAngleLeft />
      </Link>
      <div className="pb-5 w-full">
        {notes.length > 0 && (
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y, EffectFade]}
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 3,
              },
              865: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 4,
              },
              1500: {
                slidesPerView: 5,
              },
              1700: {
                slidesPerView: 6,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            style={{
              "--swiper-navigation-color": "red",
              "--swiper-navigation-size": "15px",
            }}
          >
            {notes
              .filter((item, id) => id < 8)
              .map((item, key) => (
                <SwiperSlide
                  key={key}
                  className=" bg-slate-500 p-4 my-1 text-white cursor-pointer"
                >
                  <Link href={"/note/view?id=" + item._id}>{item.title} </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
