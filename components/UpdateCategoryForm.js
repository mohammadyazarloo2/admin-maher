'use client'
import Link from "next/link";
import { useState } from "react";
import { FaRegHandPointLeft } from "react-icons/fa";

export default function UpdateCategoryForm({name:existsName,parent:existsParent,sub:existsSub,_id}) {

    const [error,setError]=useState();
    const [name,setName]=useState(existsName || '');
    const [parent,setParent]=useState(existsParent || '');
    const [sub,setSub]=useState(existsSub || '');

    const handleSubmit=()=>{
        if(!name || !parent){
            return;
        }
        console.log('ok')
    }

    return (
        <div>
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <h2 className="py-3">ایجاد دسته بندی</h2>
              <Link href="/category" className="p-2 group relative">
                {/* بازگشت به صفحه قبل */}
                <FaRegHandPointLeft className="w-6 h-6" />
                <div className="p-3 absolute right-0 pointer-events-none group-hover:pointer-events-auto bg-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
                  بازگشت
                </div>
              </Link>
            </div>
            {/* نمایش ارور */}
            <div className="text-red-500">{error}</div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام  "
              />
              <select onChange={(e)=>setParent(e.target.value)}>
                <option value=''>انتخاب سطح دسته بندی</option>
                <option selected={parent=='0' ? 'true' : 'false'} value='0'>پدر</option>
                <option value='1'>محصولات</option>
              </select>
              {parent!='' && (
                <select  className="p-2" onChange={(e=>setSub(e.target.value))}>
                <option value='0'>پدر</option>
                <option value='1'>محصولات</option>
              </select>
              )}
              
            </div>
            <button className="p-2 bg-emerald-600 my-3 text-white">
              ایجاد دسته بندی
            </button>
          </form>
        </div>
      );
}