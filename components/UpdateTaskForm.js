import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHandPointLeft, FaRegHandPointer } from "react-icons/fa";

export default function UpdateNoteForm({
  _id,
  taskTitle: existTitle,
  taskDescription: existTaskDescription,
  taskStatus: existTaskStatus,
  status: existStatus,
}) {
  const [error, setError] = useState("");
  const [taskEditTitle, setTaskTitle] = useState(existTitle);
  const [taskEditDiscription, setTaskDescription] = useState(existTaskDescription);
  const [taskEditStatus, setTaskStatus] = useState(existTaskStatus);
  const [status, setStatus] = useState(existStatus);
  const router = useRouter();

  const data = { taskEditTitle, taskEditDiscription, taskEditStatus, status };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch("/api/task/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, _id }),
    });
    router.push("/task");
  };

  return (
    <form className="p-3" onSubmit={handleUpdate}>
      <div className="flex justify-between items-center">
        <h2 className="py-3">ویرایش یادداشت</h2>
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
      <div className="grid grid-cols-2 gap-2 mt-4">
        <input
          type="text"
          className="w-full"
          value={taskEditTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="عنوان یادداشت"
        />
        <input
          type="text"
          className="w-full"
          value={taskEditDiscription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="متن یادداشت"
        />
        <select className="p-2" onChange={(e) => setTaskStatus(e.target.value)}>
          <option value={"0"}>اضطراری</option>
          <option value={"1"}>مهم</option>
          <option value={"2"}>غیر ضروری</option>
        </select>
        <select className="p-2" onChange={(e) => setStatus(e.target.value)}>
          <option value="0">انجام نشده</option>
          <option value="1">در حال انجام </option>
          <option value="2">انجام شده</option>
        </select>
      </div>
      <button className="p-2 bg-emerald-600 my-3 text-white">
        ویرایش یادداشت
      </button>
    </form>
  );
}
