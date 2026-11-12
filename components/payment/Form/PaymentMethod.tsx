import { Banknote, CreditCard, Lock, QrCode } from "lucide-react";
import { CheckoutSectionProps } from "./CheckoutSchema";
import { Section } from "./FormSection";
import { OptionCard } from "./FormOptionCard";

export default function PaymentMethodSection({
  values,
  onChange,
}: CheckoutSectionProps) {
  return (
    <Section
      title="Phương thức thanh toán"
      aside={
        <span className="flex items-center gap-1 text-xs font-bold text-green-700">
          <Lock size={14} />
          Bảo mật chuẩn PCI DSS
        </span>
      }
    >
      <div className="space-y-3">
        <OptionCard
          name="payment"
          checked={values.payment === "qr"}
          onSelect={() => onChange("payment", "qr")}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-blue-700">
              <QrCode size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">
                Chuyển khoản VietQR / MoMo / VNPay
              </p>
              <p className="text-xs text-slate-600">
                Tạo mã QR thử, quét thanh toán qua mọi app ngân hàng
              </p>
            </div>
            <span className="shrink-0 rounded bg-green-200 px-2 py-1 text-xs font-bold text-green-800">
              Khuyên dùng
            </span>
          </div>
        </OptionCard>
        <OptionCard
          name="payment"
          checked={values.payment === "card"}
          onSelect={() => onChange("payment", "card")}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-blue-700">
              <CreditCard size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">
                Thẻ quốc tế (Visa, Mastercard, JCB)
              </p>
              <p className="text-xs text-slate-600">
                Cổng thanh toán mã hóa an toàn, không lưu thông tin thẻ
              </p>
            </div>
            <span className="hidden shrink-0 gap-1 sm:flex">
              <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-bold text-slate-600">
                VISA
              </span>
              <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-bold text-slate-600">
                MC
              </span>
            </span>
          </div>
        </OptionCard>
        <OptionCard
          name="payment"
          checked={values.payment === "cod"}
          onSelect={() => onChange("payment", "cod")}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-blue-700">
              <Banknote size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">
                Thanh toán khi nhận hàng (COD)
              </p>
              <p className="text-xs text-slate-600">
                Kiểm tra kiện hàng trước khi thanh toán tiền mặt cho shipper
              </p>
            </div>
          </div>
        </OptionCard>
      </div>
    </Section>
  );
}
