"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useShop } from "../context/ShopContext";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPage } = useShop();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const handleChange = (text: string) => {
    setValue(text);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (text.trim()) params.set("q", text);
    else params.delete("q");
    router.replace(`/?${params}`);
  };

  return (
    <div className="hidden flex-1 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-slate-500 md:flex md:max-w-sm">
      <Search size={18} />
      <input
        value={value}
        onChange={({ target }) => handleChange(target.value)}
        placeholder="Tìm kiếm sản phẩm, phụ kiện, thiết bị..."
        className="flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
}
