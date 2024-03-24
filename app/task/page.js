"use client";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiHome } from "react-icons/bi";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  fetch("/api/task")
    .then((res) => res.json())
    .then((data) => setTasks(data.data));

  const handleClick = async (_id) => {
    try {
      await fetch("/api/task/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      router.push("/task");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="create-product-btn my-3 flex items-center justify-between">
        <div className="">
          <h2 className="my-3">مدیریت وظایف ها</h2>
          <Link href="/task/create" className="p-2 bg-emerald-500 my-2">
            ایجاد وظیفه جدید
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

      {tasks.length > 0 ? (
        <table className="table-fixed border border-separate border-s-teal-400 w-full mt-5">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">
                عنوان وظیفه
              </th>
              <th scope="col" className="px-6 py-4">
                توضیحات وظیفه
              </th>
              <th scope="col" className="px-6 py-4">
                تاریخ ثبت{" "}
              </th>
              <th scope="col" className="px-6 py-4">
                بروز رسانی{" "}
              </th>

              <th scope="col" className="px-6 py-4">
                حذف{" "}
              </th>
            </tr>
            {tasks.map((data, key) => (
              <tr
                key={key}
                className="border-b border-neutral-200 dark:border-white/10"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                  {data.taskTitle}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.taskDescription}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.createdAt}{" "}
                </td>
                <td className=" text-center">
                  <Link
                    href={"/task/edit?id=" + data._id}
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
          هیچ وظیفه ای وجود ندارد
        </div>
      )}
    </div>
  );
}
