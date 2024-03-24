"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription || !taskStatus || !status) {
      setError("همه فیلدها باید پر شود");
      return;
    }
    // api call to create product
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle,
          taskDescription,
          taskStatus,
          status,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/task");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center my-4">
          <h2 className="py-3">ایجاد وظیفه</h2>
          <Link href="/task" className="p-2 group relative">
            {/* بازگشت به صفحه قبل */}
            <FaRegHandPointLeft className="w-6 h-6" />
            <div className="p-3 absolute left-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
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
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="عنوان یادداشت"
          />
          <textarea
            className="p-2"
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="توظیحات یادداشت"
          ></textarea>
          <select className="p-2" onChange={(e) => setTaskStatus(e.target.value)}>
            <option value={"0"}>اضطراری</option>
            <option value={"1"}>مهم</option>
            <option value={"2"}>غیر ضروری</option>
          </select>
          <select className="p-2" onChange={(e) => setStatus(e.target.value)}>
            <option value='0'>انجام نشده</option>
            <option value='1'>در حال انجام  </option>
            <option value='2'>انجام شده</option>
          </select>
        </div>
        <button className="p-2 bg-emerald-600 my-3 text-white">
          ایجاد یادداشت
        </button>
      </form>
    </div>
  );
}
