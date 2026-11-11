import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCheckout() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
        <ShoppingBag size={48} className="text-slate-400" />
        <h1 className="text-lg font-bold text-slate-900">
          Chưa có sản phẩm nào được chọn
        </h1>
        <p className="text-sm text-slate-600">
          Hãy quay lại giỏ hàng và tick chọn sản phẩm cần thanh toán.
        </p>
        <Link
          href="/cart"
          className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
        >
          Quay lại giỏ hàng
        </Link>
      </div>
    </div>
  );
}
