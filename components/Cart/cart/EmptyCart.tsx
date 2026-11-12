import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
        <ShoppingCart size={48} className="text-slate-400" />
        <h1 className="text-lg font-bold text-slate-900">
          Giỏ hàng của bạn đang trống
        </h1>
        <Link
          href="/"
          className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
