"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaAngleLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { MdNotificationImportant } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

export default function Tasks() {
  const { data: session } = useSession();

  const [showCreateTaskModal, setShowTaskModal] = useState("");
  const [showEditTaskModal, setShowTaskEditModal] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const [tasks, setTasks] = useState([]);
  const [gettaskid, setGettaskid] = useState("");
  const router = useRouter();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log(taskStatus);
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskTitle, taskDescription, taskStatus }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showTaskModal = (e) => {
    e.preventDefault();
    if (showCreateTaskModal === false) {
      setShowTaskModal(true);
    } else {
      setShowTaskModal(false);
    }
  };

    useEffect(()=>{
      const c=setInterval(() => {
        fetch("/api/task")
          .then((res) => res.json())
          .then((data) => setTasks(data.data));
      },5000);
      return ()=>clearInterval(c)
    })

  const showEditModal = (_id) => {
    console.log(gettaskid);
    setShowTaskEditModal(true);
    if (!_id) {
      return;
    }

    const res = fetch("/api/task/findone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGettaskid(data.message);

        setEditTitle(data.taskTitle);
        setEditDescription(data.taskDescription);
        setEditStatus(data.status);
      });
    console.log(showEditTaskModal);
  };
  const closeEditModal = () => {
    setShowTaskEditModal(false);
  };

  const [taskEditTitle, setEditTitle] = useState(gettaskid.taskTitle || "");
  const [taskEditDiscription, setEditDescription] = useState(
    gettaskid.taskDescription || ""
  );
  const [taskEditStatus, setEditStatus] = useState(gettaskid.taskStatus || "");

  const handleEditTask = (_id) => {
    const data = { taskEditTitle, taskEditDiscription, taskEditStatus };
    fetch("/api/task/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, _id }),
    });
    router.push("/dashboard");
    console.log(data);
  };

  return (
    <div className="h-[400px]">
      <div className="relative rounded-lg mt-4 p-3 bg-gradient-to-b from-stone-300 shadow-md h-full">
        <button
          className="w-10 h-10 bg-lime-500 rounded-lg text-white absolute bottom-0"
          onClick={(e) => showTaskModal(e)}
        >
          +
        </button>
        <Link
          href={"/task"}
          className=" bg-emerald-400 w-80 h-10 rounded-lg absolute bottom-0 left-0 flex items-center justify-center"
        >
          <span className="pl-1">مشاهده همه و مدیریت</span> <MdManageSearch />
        </Link>
        <div className="h-[90%] overflow-y-auto snap-proximity snap-y">
          <div className="p-2 flex justify-between">
            <span>وظایف</span>
            <GoTasklist className="text-xl" />
          </div>
          {tasks.length > 0 &&
            tasks.map((data, key) => (
              <div
                key={key}
                className="flex justify-between items-center p-3 my-2 bg-neutral-100 rounded-md shadow-md"
              >
                <span>
                  {" "}
                  {data.taskTitle}
                  {data.taskStatus === "0" ? (
                    <span className="text-rose-400"> (ضروری)</span>
                  ) : data.taskStatus === "1" ? (
                    <span className="text-amber-400"> (مهم)</span>
                  ) : (
                    ""
                  )}
                </span>
                <div className="flex gap-3">
                  <button
                    className={`p-2 ${
                      data.status === "0" && "bg-rose-500"
                    } rounded-full text-white`}
                  >
                    <BiTaskX />
                  </button>
                  <button
                    className={`p-2 rounded-full text-white ${
                      data.taskStatus === "0"
                        ? "bg-rose-600"
                        : data.taskStatus === "1"
                        ? "bg-amber-300"
                        : ""
                    } `}
                  >
                    {data.taskStatus === "0" && (
                      <MdNotificationImportant className="animate-ping text-amber-400" />
                    )}
                    {data.taskStatus === "1" && (
                      <BiInfoCircle className="animate-bounce" />
                    )}
                  </button>
                  <button
                    className="p-2 bg-blue-500 rounded-full text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      showEditModal(data._id);
                    }}
                  >
                    <CiEdit />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {gettaskid != "" && (
        <div
          className={`absolute top-0 left-0 z-20 w-full h-full bg-gradient-radial from-emerald-400 flex justify-center items-center  ${
            showEditTaskModal === true
              ? "transition-all ease-in-out opacity-100 pointer-events-auto duration-1000"
              : "transition-all ease-in-out opacity-0 pointer-events-none duration-1000"
          }`}
        >
          <div
            className={` w-[450px] h-auto bg-gradient-to-r to-zinc-200 from-gray-400 p-3 rounded-md
          ${
            showEditTaskModal === true
              ? "transition-all ease-in-out duration-1000 translate-y-1"
              : "translate-y-full transition-all ease-in-out duration-1000"
          }`}
          >
            <div className="py-3 flex items-center justify-between">
              <h2>ایجاد وظیفه جدید</h2>
              <span
                className="w-7 h-7 flex items-center justify-center cursor-pointer bg-red-500 rounded-full text-white"
                onClick={closeEditModal}
              >
                x
              </span>
            </div>
            <form
              className="my-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTask(gettaskid._id);
              }}
            >
              <input
                className="rounded-md w-full my-2"
                type="text"
                value={gettaskid.taskTitle}
                placeholder="عنوان وظیفه"
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="rounded-md p-2 w-full my-2"
                value={gettaskid.taskDescription}
                placeholder="توظیحات"
                onChange={(e) => setEditDescription(e.target.value)}
              ></textarea>
              <select
                className="rounded-md p-2 w-full my-2"
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value={"0"}>اضطراری</option>
                <option value={"1"}>مهم</option>
                <option value={"2"}>غیر ضروری</option>
              </select>
              <button className="p-2 my-2 bg-teal-600 rounded-md text-white">
                ثبت وظیفه
              </button>
            </form>
          </div>
        </div>
      )}

      <div
        className={`absolute top-0 left-0 z-20 w-full h-full bg-gradient-radial from-emerald-400 flex justify-center items-center  ${
          showCreateTaskModal === true
            ? "transition-all ease-in-out opacity-100 pointer-events-auto duration-1000"
            : "transition-all ease-in-out opacity-0 pointer-events-none duration-1000"
        }`}
      >
        <div
          className={` w-[450px] h-auto bg-gradient-to-r to-zinc-200 from-gray-400 p-3 rounded-md
          ${
            showCreateTaskModal === true
              ? "transition-all ease-in-out duration-1000 translate-y-1"
              : "translate-y-full transition-all ease-in-out duration-1000"
          }`}
        >
          <div className="py-3 flex items-center justify-between">
            <h2>ایجاد وظیفه جدید</h2>
            <span
              className="w-7 h-7 flex items-center justify-center cursor-pointer bg-red-500 rounded-full text-white"
              onClick={showTaskModal}
            >
              x
            </span>
          </div>
          <form className="my-2" onSubmit={handleCreateTask}>
            <input
              className="rounded-md w-full my-2"
              type="text"
              placeholder="عنوان وظیفه"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              className="rounded-md p-2 w-full my-2"
              placeholder="توظیحات"
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <select
              className="rounded-md p-2 w-full my-2"
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value={"0"}>اضطراری</option>
              <option value={"1"}>مهم</option>
              <option value={"2"}>غیر ضروری</option>
            </select>
            <button className="p-2 my-2 bg-teal-600 rounded-md text-white">
              ثبت وظیفه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
