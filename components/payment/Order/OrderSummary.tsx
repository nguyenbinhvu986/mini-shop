import {
  ArrowRight,
  Headphones,
  Lock,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { formatPrice, PROMO_CODE, PROMO_MAX, PROMO_RATE } from "./SaleCode";

type OrderSummaryProps = {
  count: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  hasErrors: boolean;
  onPlaceOrder: () => void;
};

export default function OrderSummary({
  count,
  subtotal,
  discount,
  shippingFee,
  total,
  hasErrors,
  onPlaceOrder,
}: OrderSummaryProps) {
  return (
    <aside className="mt-6 w-full rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:mt-0 lg:w-96 lg:shrink-0">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-lg font-bold text-slate-900">Tóm tắt đơn hàng</h2>
        <span className="text-xs text-slate-500">{count} sản phẩm</span>
      </div>

      <p className="mt-4 text-xs font-semibold text-green-700">
        Đã tự động áp dụng mã {PROMO_CODE}: giảm {PROMO_RATE * 100}% tiền hàng,
        tối đa {formatPrice(PROMO_MAX)}
      </p>

      <dl className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Tạm tính:</dt>
          <dd className="font-bold text-slate-900">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-600">Giảm giá:</dt>
          <dd className="font-bold text-green-700">-{formatPrice(discount)}</dd>
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
          <p className="text-xs text-slate-500">(Đã bao gồm thuế GTGT VAT)</p>
        </div>
        <p className="text-2xl font-bold text-blue-700">{formatPrice(total)}</p>
      </div>

      <button
        onClick={onPlaceOrder}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-4 py-4 text-center text-sm font-bold text-white"
      >
        Đặt hàng ngay
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
  );
}
