"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Headphones,
  Lock,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useShop } from "../components/context/ShopContext";
import PolicyBadges from "./PolicyBadge";
import CheckoutForm, {
  CheckoutErrors,
  CheckoutValues,
  EMPTY_CHECKOUT,
  SHIPPING_FEES,
  validateCheckout,
} from "./CheckoutForm";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export default function PaymentPage() {
  const router = useRouter();
  const { cart, selected, setSelected, removeFromCart } = useShop();

  const [values, setValues] = useState<CheckoutValues>(EMPTY_CHECKOUT);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placed, setPlaced] = useState<{ count: number; total: number } | null>(
    null,
  );

  const items = cart.filter(({ id }) => selected.includes(id));
  const subtotal = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );
  const shippingFee = SHIPPING_FEES[values.shipping];
  const total = subtotal + shippingFee;
  const hasErrors = Object.values(errors).some(Boolean);

  const goBack = () =>
    window.history.length > 1 ? router.back() : router.push("/cart");

  const handleChange = <K extends keyof CheckoutValues>(
    key: K,
    value: CheckoutValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const placeOrder = () => {
    const found = validateCheckout(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPlaced({ count: items.length, total });
    items.forEach(({ id }) => removeFromCart(id));
    setSelected([]);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Check size={32} />
          </span>
          <h1 className="text-lg font-bold text-slate-900">
            Đặt hàng thành công
          </h1>
          <p className="text-sm text-slate-600">
            {placed.count} sản phẩm · Tổng thanh toán{" "}
            <b className="text-slate-900">{formatPrice(placed.total)}</b>
          </p>
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

  if (items.length === 0) {
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={goBack}
          aria-label="Quay lại"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Thanh toán</h1>
      </div>

      <div className="lg:flex lg:items-start lg:gap-6">
        <div className="min-w-0 flex-1 space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">
                Đơn hàng của bạn
              </h2>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {items.length} món
              </span>
            </div>
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
                      <PolicyBadges
                        warranty={warranty}
                        returnPolicy={returnPolicy}
                      />
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

          <CheckoutForm
            values={values}
            errors={errors}
            onChange={handleChange}
          />
        </div>

        <aside className="mt-6 w-full rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:mt-0 lg:w-96 lg:shrink-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Tóm tắt đơn hàng
            </h2>
            <span className="text-xs text-slate-500">
              {items.length} sản phẩm
            </span>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-600">Tạm tính:</dt>
              <dd className="font-bold text-slate-900">
                {formatPrice(subtotal)}
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
            <div>
              <p className="font-bold text-slate-900">Tổng thanh toán:</p>
              <p className="text-xs text-slate-500">
                (Đã bao gồm thuế GTGT VAT)
              </p>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {formatPrice(total)}
            </p>
          </div>

          <button
            onClick={placeOrder}
            className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-4 py-4 text-center text-sm font-bold text-white"
          >
            Đặt hàng ngay (Thanh toán mô phỏng)
            <ArrowRight size={18} className="shrink-0" />
          </button>
          {hasErrors && (
            <p className="mt-2 text-center text-xs text-red-600">
              Vui lòng kiểm tra lại thông tin nhận hàng bên trái.
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-green-800">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0" />
              Bảo hành chính hãng
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw size={16} className="shrink-0" />
              Đổi trả theo chính sách sản phẩm
            </span>
            <span className="flex items-center gap-2">
              <Headphones size={16} className="shrink-0" />
              Hỗ trợ hotline: 1900 6868
            </span>
            <span className="flex items-center gap-2">
              <Lock size={16} className="shrink-0" />
              Mã hóa thanh toán an toàn
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
