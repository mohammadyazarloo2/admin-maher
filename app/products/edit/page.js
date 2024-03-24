"use client";
import { FaRegHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UpdateProductForm from "@/components/UpdateProductForm";

export default function Edit() {
  const [products, setProductInfo] = useState(null);
  
  const router = useSearchParams();
  const id = router.get("id");

  console.log(id);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch("/api/products/findproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => setProductInfo(data.message));
  });

  console.log(products);

    // const [name,setName]=useState(products !=null ? products : '');
    // const [title,setTitle]=useState(products ==null ? '' : products.message.title);
    // const [description,setDescription]=useState(products ==null ? '' : products.message.description);
    // const [category,setCategory]=useState(products ==null ? '' : products.message.category);
    // const [price,setPrice]=useState(products ==null ? '' : products.message.price);

  
    
  
    

  
    return (
      
      <div className="p-3 w-[80%]">
        {products != null ? (
        <UpdateProductForm {...products} />
        ):(
        <div className="w-full h-full flex items-center justify-center">در حال بارگزاری لطفا صبور باشید</div>
      )}
      </div>
    
    );
  
  
}
