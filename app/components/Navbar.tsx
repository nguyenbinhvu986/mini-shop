import Link from "next/link";
import { Suspense } from "react";
import { Search, Truck } from "lucide-react";
import SearchBar from "./Searchbar";
import CartIcon from "../cart/components/cart/Carticon";

export default function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-center gap-2 bg-blue-700 py-3 text-sm font-semibold text-white">
        <Truck size={18} />
        <span>
          Miễn phí vận chuyển cho đơn hàng từ 500.000đ | Giao nhanh trong 2h
        </span>
      </div>
      <div className="bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
              N
            </span>
            <span className="text-lg font-bold text-slate-900">
              Nova<span className="text-blue-600">Store</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-slate-700 xl:flex">
            <Link href="/"></Link>
          </nav>
          <Suspense fallback={<div className=" flex-1 md:block md:max-w-sm" />}>
            <SearchBar />
          </Suspense>
          <div className="flex items-center gap-6 text-slate-800">
            <Link href="/search" className="md:hidden">
              <Search size={24} />
            </Link>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
