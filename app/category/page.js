'use client'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";

export default function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/api/category")
          .then((res) => res.json())
          .then((data) => setCategories(data.data));
      });

  return (
    <div className="p-3 w-[80%]">
      <div className="create-product-btn my-3">
        <h2 className="my-3">مدیریت دسته بندی ها</h2>
        <Link href="/category/create" className="p-2 bg-emerald-500 my-2">
          ایجاد دسته بندی جدید
        </Link>
      </div>
      {categories.length > 0 ? (
        <table className="table-fixed border border-separate border-s-teal-400 w-full mt-5">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">
                نام دسته بندی
              </th>
              <th scope="col" className="px-6 py-4">
                بروز رسانی{" "}
              </th>
              <th scope="col" className="px-6 py-4">
                حذف{" "}
              </th>
            </tr>
            {categories.map((data, key) => (
              <tr
                key={key}
                className="border-b border-neutral-200 dark:border-white/10"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                  {data.name}{" "}
                </td>
                
                <td className=" text-center">
                  <Link
                    href={"/category/edit?id=" + data._id}
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
          هیچ دسته بندی ای وجود ندارد
        </div>
      )}
    </div>
  );
}
