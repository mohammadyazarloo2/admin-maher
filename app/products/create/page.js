"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !title || !description || !category || !price) {
      setError("همه فیلدها باید پر شود");
      return;
    }
    // api call to create product
    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          title,
          description,
          category,
          price,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/products");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-[80%]">
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h2 className="py-3">ایجاد محصولات</h2>
          <Link href="/products" className="p-2 group relative">
            {/* بازگشت به صفحه قبل */}
            <FaRegHandPointLeft className="w-6 h-6" />
            <div className="p-3 absolute right-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
              بازگشت
            </div>
          </Link>
        </div>
        {/* نمایش ارور */}
        <div className="text-red-500">{error}</div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="نام محصول"
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان محصول"
          />
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات محصول"
          />
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="دسته بندی محصول"
          />
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="قیمت محصول"
          />
        </div>
        <button className="p-2 bg-emerald-600 my-3 text-white">
          ایجاد محصول
        </button>
      </form>
    </div>
  );
}
