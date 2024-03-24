"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UpdateCategoryForm from "@/components/UpdateCategoryForm";

export default function Edit() {
  const [category, setCategory] = useState(null);
  
  const router = useSearchParams();
  const id = router.get("id");

  console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch("/api/category/findcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => setCategory(data.message));
  });

  console.log(category);

    // const [name,setName]=useState(products !=null ? products : '');
    // const [title,setTitle]=useState(products ==null ? '' : products.message.title);
    // const [description,setDescription]=useState(products ==null ? '' : products.message.description);
    // const [category,setCategory]=useState(products ==null ? '' : products.message.category);
    // const [price,setPrice]=useState(products ==null ? '' : products.message.price);

  
    
  
    

  
    return (
      
      <div className="p-3 w-[80%]">
        {category != null ? (
        <UpdateCategoryForm {...category} />
        ):(
        <div className="w-full h-full flex items-center justify-center">در حال بارگزاری لطفا صبور باشید</div>
      )}
      </div>
    
    );
  
  
}
