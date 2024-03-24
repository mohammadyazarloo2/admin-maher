import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHandPointLeft, FaRegHandPointer } from "react-icons/fa";

export default function UpdateNoteForm({
    _id,
  title: existTitle,
  textNote: existTextNote,
}) {
  const [error, setError] = useState("");
  const [title, setTitle] = useState(existTitle);
  const [textNote, setTextNote] = useState(existTextNote);
  const router = useRouter();

  const data={title,textNote}


  const handleUpdate = (e) => {
    e.preventDefault();
    fetch("/api/note/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data,_id }),
    });
    router.push('/note')
  };


  return (
    <form className="p-3" onSubmit={handleUpdate}>
      <div className="flex justify-between items-center">
        <h2 className="py-3">ایجاد یادداشت</h2>
        <Link href="/note" className="p-2 group relative">
          {/* بازگشت به صفحه قبل */}
          <FaRegHandPointLeft className="w-6 h-6" />
          <div className="p-3 absolute left-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
            بازگشت
          </div>
        </Link>
      </div>

      {/* نمایش ارور */}
      <div className="text-red-500">{error}</div>
      <div className="grid grid-cols-2 gap-2">
        
        <input
          type="text"
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان یادداشت"
        />
        <input
          type="text"
          className="w-full"
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
          placeholder="متن یادداشت"
        />
      </div>
      <button className="p-2 bg-emerald-600 my-3 text-white">
        بروز رسانی یادداشت
      </button>
    </form>
  );
}
