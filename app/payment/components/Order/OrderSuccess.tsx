import Link from "next/link";
import { Check, ClipboardList, ShoppingBag } from "lucide-react";
import { Order } from "../../../components/context/ShopContext";
import OrderDetails from "../../../components/OrderDetails";

export default function OrderSuccess({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Check size={32} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Đặt hàng thành công!
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Cảm ơn bạn đã mua sắm tại NovaStore. Đơn hàng của bạn đang được xử
              lý và chuẩn bị giao tới tận tay trong thời gian sớm nhất.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
          >
            <ShoppingBag size={18} />
            Tiếp tục mua sắm
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-6 py-3 text-sm font-bold text-slate-800"
          >
            <ClipboardList size={18} />
            Xem đơn hàng đã mua
          </Link>
        </div>
      </section>

      <OrderDetails order={order} />
    </div>
  );
}
