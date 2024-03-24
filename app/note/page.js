"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { BiHome } from "react-icons/bi";

export default function Products() {
  const [notes, setNotes] = useState("");
  const [textNote, setTextNote] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/note")
      .then((res) => res.json())
      .then((responsive) => setNotes(responsive.data));
  });

  const handleClick = async (_id) => {
    try {
      await fetch("/api/note/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      router.push("/note");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(notes);

  return (
    <div className="p-3">
      <div className="create-product-btn my-3 flex items-center justify-between">
        <div>
          <h2 className="my-3">مدیریت یادداشت ها</h2>
          <Link href="/note/create" className="p-2 bg-emerald-500 my-2">
            ایجاد یادداشت جدید
          </Link>
        </div>
        <Link href="/dashboard" className="p-2 group relative">
          {/* بازگشت به صفحه قبل */}
          <BiHome className="w-6 h-6" />
          <div className="p-3 absolute left-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
            خانه
          </div>
        </Link>
      </div>
      {notes.length > 0 ? (
        <table className="table-fixed border border-separate border-s-teal-400 w-full mt-5">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">
                عنوان یادداشت
              </th>
              <th scope="col" className="px-6 py-4">
                متن یادداشت
              </th>

              <th scope="col" className="px-6 py-4">
                بروز رسانی{" "}
              </th>
              <th scope="col" className="px-6 py-4">
                حذف{" "}
              </th>
            </tr>
            {notes.map((data, key) => (
              <tr
                key={key}
                className="border-b border-neutral-200 dark:border-white/10"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                  {data.title}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.textNote}{" "}
                </td>
                <td className=" text-center">
                  <Link
                    href={"/note/edit?id=" + data._id}
                    className="px-3 py-2 flex justify-center items-center"
                  >
                    <CiEdit className="w-6 h-6 bg-cyan-400 text-black text-center rounded-md" />
                  </Link>
                </td>
                <td className=" text-center">
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleClick(data._id)}
                  >
                    <MdOutlineRemoveShoppingCart />
                  </button>
                </td>
              </tr>
            ))}
          </thead>
          <tbody></tbody>
        </table>
      ) : (
        <div className="bg-red-400 text-white text-center p-3">
          هیچ یادداشتی وجود ندارد
        </div>
      )}
    </div>
  );
}
