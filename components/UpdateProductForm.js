import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHandPointLeft, FaRegHandPointer } from "react-icons/fa";

export default function UpdateProductForm({
    _id,
  name: existName,
  title: existTitle,
  description: existDescription,
  category: existCategory,
  price: existPrice,
}) {
  const [error, setError] = useState("");
  const [name, setName] = useState(existName);
  const [title, setTitle] = useState(existTitle);
  const [description, setDescription] = useState(existDescription);
  const [category, setCategory] = useState(existCategory);
  const [price, setPrice] = useState(existPrice);
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  const data={name,title,description,category,price}


  const handleUpdate = (e) => {
    e.preventDefault();
    fetch("/api/products/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data,_id }),
    });
    router.push('/products')
  };

  console.log(existName);

  return (
    <form className="p-3" onSubmit={handleUpdate}>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام محصول"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان محصول"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات محصول"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="دسته بندی محصول"
        />
        <input
          type="text"
          value={price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="قیمت محصول"
        />
      </div>
      <button className="p-2 bg-emerald-600 my-3 text-white">
        ایجاد محصول
      </button>
    </form>
  );
}
