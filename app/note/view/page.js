"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function View() {
  const [notes, setNote] = useState(null);

  const router = useSearchParams();
  const id = router.get("id");

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch("/api/note/findnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => setNote(data.message));
  });
  const variants = {
    hidden: { opacity: 0, x: 0, y: 200 },
    enter: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <div className="p-3 mx-4">
      {notes != null ? (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="enter"
          transition={{ type: "linear" }}
        >
          <div className="flex justify-between items-center">
            <h2 className="py-3"> </h2>
            <Link href="/note" className="p-2 group relative">
              {/* بازگشت به صفحه قبل */}
              <FaRegHandPointLeft className="w-6 h-6" />
              <div className="p-3 absolute right-[-20px] pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
                بازگشت
              </div>
            </Link>
          </div>
          <div className="bg-gradient-to-tl from-slate-300 p-3 h-50 border-r-fuchsia-400">
            <div className=" py-4">
              <h2> {notes.title} </h2>
            </div>
            <div className="py-3">{notes.textNote}</div>
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          در حال بارگزاری لطفا صبور باشید
        </div>
      )}
    </div>
  );
}
