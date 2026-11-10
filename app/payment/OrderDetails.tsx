import { CalendarDays, MapPin, Wallet } from "lucide-react";
import { Order } from "../components/context/ShopContext";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const PAYMENT_LABELS: Record<Order["customer"]["payment"], string> = {
  qr: "Chuyển khoản VietQR / MoMo / VNPay",
  card: "Thẻ quốc tế (Visa, Mastercard, JCB)",
  cod: "Thanh toán khi nhận hàng (COD)",
};

export default function OrderDetails({ order }: { order: Order }) {
  const { items, subtotal, discount, shippingFee, total, customer, placedAt } =
    order;
  const { name, phone, address, district, province, payment } = customer;
  const date = new Date(placedAt);

  const info = [
    {
      icon: CalendarDays,
      label: "Ngày đặt hàng",
      text: `${date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })} ${date.toLocaleDateString("vi-VN")}`,
      sub: "",
    },
    {
      icon: Wallet,
      label: "Phương thức thanh toán",
      text: PAYMENT_LABELS[payment],
      sub: "",
    },
    {
      icon: MapPin,
      label: "Giao tới",
      text: `${name} · ${phone}`,
      sub: `${address}, ${district}, ${province}`,
    },
  ];

  return (
    <div className="lg:flex lg:items-start lg:gap-6">
      <div className="min-w-0 flex-1 space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Mã đơn hàng
          </p>
          <p className="mt-1 text-2xl font-bold text-blue-700">#{order.id}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {info.map(({ icon: Icon, label, text, sub }) => (
              <div key={label} className="rounded-xl bg-indigo-50 p-4">
                <p className="flex items-center gap-2 text-xs text-slate-600">
                  <Icon size={16} className="shrink-0" />
                  {label}
                </p>
                <p className="mt-2 font-semibold text-slate-900">{text}</p>
                {sub && <p className="mt-1 text-xs text-slate-600">{sub}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Sản phẩm trong đơn hàng ({items.length} món)
          </h2>
          <ul className="mt-4">
            {items.map(({ id, title, thumbnail, price, quantity }) => (
              <li
                key={id}
                className="flex items-center justify-between gap-4 border-t border-slate-100 py-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="h-20 w-20 shrink-0 rounded-xl bg-slate-100 object-contain"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Số lượng: {quantity}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-blue-700">
                    {formatPrice(price * quantity)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatPrice(price)} / món
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="mt-6 w-full rounded-2xl bg-white p-6 shadow-sm lg:mt-0 lg:w-96 lg:shrink-0">
        <h2 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
          Biên lai thanh toán
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-slate-600">Tạm tính ({items.length} món):</dt>
            <dd className="font-bold text-slate-900">
              {formatPrice(subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-600">Giảm giá:</dt>
            <dd className="font-bold text-green-700">
              -{formatPrice(discount)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-600">Phí vận chuyển:</dt>
            <dd
              className={`font-bold ${
                shippingFee === 0 ? "text-green-700" : "text-slate-900"
              }`}
            >
              {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="font-bold text-slate-900">Tổng thanh toán:</p>
          <p className="text-2xl font-bold text-blue-700">
            {formatPrice(total)}
          </p>
        </div>
      </aside>
    </div>
  );
}
