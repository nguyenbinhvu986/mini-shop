"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useShop } from "../components/context/ShopContext";
import OrderDetails from "../payment/OrderDetails";

export default function OrdersPage() {
  const { ready, orders } = useShop();

  if (!ready) return null;

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
          <ClipboardList size={48} className="text-slate-400" />
          <h1 className="text-lg font-bold text-slate-900">
            Bạn chưa có đơn hàng nào
          </h1>
          <p className="text-sm text-slate-600">
            Các đơn hàng đã đặt sẽ hiển thị tại đây.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
          >
            Bắt đầu mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <h1 className="mb-4 text-xl font-bold text-slate-900">
        Đơn hàng đã mua ({orders.length})
      </h1>
      <div className="space-y-10">
        {orders.map((order) => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
