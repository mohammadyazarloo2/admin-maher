"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaRegHandPointLeft } from "react-icons/fa";

export default function Delete() {
  const [products, setProduct] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  });

  console.log(products);

  const handleClick = async (_id) => {
    try {
      await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      router.push("/products/delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] p-3">
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
      {products.length > 0 ? (
        <table className="table-fixed border border-separate border-s-teal-400 w-full mt-5">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">
                نام محصول
              </th>
              <th scope="col" className="px-6 py-4">
                عنوان محصول
              </th>
              <th scope="col" className="px-6 py-4">
                {" "}
                قیمت{" "}
              </th>
              <th scope="col" className="px-6 py-4">
                تاریخ ثبت
              </th>
              <th scope="col" className="px-6 py-4">
                حذف{" "}
              </th>
            </tr>
            {products.map((data, key) => (
              <tr
                key={key}
                className="border-b border-neutral-200 dark:border-white/10"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                  {" "}
                  {data.name}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center"> {data.title} </td>
                <td className="whitespace-nowrap px-6 py-4 text-center"> {data.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </td>
                <td className="whitespace-nowrap px-6 py-4 text-center"> {data.price} </td>
                <td className=" text-center">
                  <button
                    type="button"
                    className="px-3 py-2 bg-red-500 text-white"
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
      ):(
        <div className="bg-red-400 text-white text-center p-3">
          هیچ محصولی وجود ندارد
        </div>
      )}
    </div>
  );
}
