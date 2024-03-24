"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [textNote, setTextNote] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !textNote) {
      setError("همه فیلدها باید پر شود");
      return;
    }
    // api call to create product
    try {
      const res = await fetch("/api/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          textNote,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/note");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center my-4">
          <h2 className="py-3">ایجاد محصولات</h2>
          <Link href="/note" className="p-2 group relative">
            {/* بازگشت به صفحه قبل */}
            <FaRegHandPointLeft className="w-6 h-6" />
            <div className="p-3 absolute right-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
              بازگشت
            </div>
          </Link>
        </div>
        {/* نمایش ارور */}
        <div className="text-red-500">{error}</div>
        <div className="grid grid-cols-1 gap-y-2">
          <input
            className="w-full"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان یادداشت"
          />
          <textarea
            className="p-2"
            onChange={(e) => setTextNote(e.target.value)}
            placeholder="عنوان یادداشت"
          ></textarea>
        </div>
        <button className="p-2 bg-emerald-600 my-3 text-white">
          ایجاد یادداشت
        </button>
      </form>
    </div>
  );
}
