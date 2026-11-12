import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CartItem } from "../../context/ShopContext";
import { formatPrice } from "./SaleCode";
import PolicyBadges from "./PolicyBadge";

export default function OrderItemsSection({
  items,
  orderCode,
}: {
  items: CartItem[];
  orderCode: string;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-900">Đơn hàng của bạn</h2>
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
          {items.length} món
        </span>
      </div>
      {orderCode && (
        <p className="mt-2 text-sm text-slate-600">
          Mã đơn hàng: <b className="text-blue-700">#{orderCode}</b>
        </p>
      )}
      <ul className="mt-4">
        {items.map(
          ({
            id,
            title,
            thumbnail,
            price,
            quantity,
            warranty,
            returnPolicy,
          }) => (
            <li
              key={id}
              className="flex flex-col gap-3 border-t border-slate-100 py-4 md:flex-row md:items-start md:justify-between md:gap-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-20 w-20 shrink-0 rounded-xl bg-slate-100 object-contain"
                />
                <h3 className="line-clamp-2 font-semibold text-slate-900">
                  {title}
                </h3>
              </div>
              <div className="shrink-0 md:text-right">
                <p className="text-lg font-bold text-blue-700">
                  {formatPrice(price * quantity)}
                </p>
                <p className="text-xs text-slate-500">
                  {formatPrice(price)} / món × {quantity}
                </p>
                <PolicyBadges warranty={warranty} returnPolicy={returnPolicy} />
              </div>
            </li>
          ),
        )}
      </ul>
      <div className="border-t border-slate-100 pt-4">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700"
        >
          <ChevronLeft size={16} />
          Quay lại giỏ hàng
        </Link>
      </div>
    </section>
  );
}
