"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function Products() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  });

  const handleClick = async (_id) => {
    try {
      await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  return (
    <div className="p-3 w-[80%]">
      <div className="create-product-btn my-3">
        <h2 className="my-3">مدیریت کاربران</h2>
        <Link href="/products/create" className="p-2 bg-emerald-500 my-2">
          ایجاد محصول جدید
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
                قیمت{" "}
              </th>
              <th scope="col" className="px-6 py-4">
                تاریخ ثبت
              </th>
              <th scope="col" className="px-6 py-4">
                بروز رسانی{" "}
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
                  {data.name}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.title}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.price}{" "}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  {data.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                </td>
                <td className=" text-center">
                  <Link
                    href={"/products/edit?id="+ data._id}
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
          هیچ محصولی وجود ندارد
        </div>
      )}
    </div>
  );
}
