import { ReactNode } from "react";
import { Banknote, CreditCard, Lock, QrCode, Truck } from "lucide-react";

export type CheckoutValues = {
  name: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  address: string;
  note: string;
  payment: "qr" | "card" | "cod";
};

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export const EMPTY_CHECKOUT: CheckoutValues = {
  name: "",
  phone: "",
  email: "",
  province: "",
  district: "",
  address: "",
  note: "",
  payment: "qr",
};

const LOCATIONS: Record<string, string[]> = {
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Thủ Đức"],
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Cầu Giấy", "Đống Đa"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà"],
};

export function validateCheckout(v: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!v.name.trim()) errors.name = "Vui lòng nhập họ và tên";
  if (!/^0\d{9}$/.test(v.phone.trim()))
    errors.phone = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
    errors.email = "Email chưa hợp lệ";
  if (!v.province) errors.province = "Vui lòng chọn tỉnh / thành phố";
  if (!v.district) errors.district = "Vui lòng chọn quận / huyện";
  if (!v.address.trim()) errors.address = "Vui lòng nhập địa chỉ cụ thể";
  return errors;
}

const inputClass =
  "w-full rounded-xl bg-indigo-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 disabled:opacity-60";

function Section({
  title,
  icon,
  aside,
  children,
}: {
  title: string;
  icon?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          {icon}
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      {required && <span className="text-red-600"> *</span>}
      <span className="mt-1.5 block font-normal">{children}</span>
      {error && (
        <span className="mt-1 block text-xs font-normal text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function OptionCard({
  name,
  checked,
  onSelect,
  children,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${
        checked
          ? "border-blue-700 bg-indigo-50"
          : "border-transparent bg-slate-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="mt-1 h-5 w-5 shrink-0 accent-blue-700"
      />
      <div className="min-w-0 flex-1">{children}</div>
    </label>
  );
}

type CheckoutFormProps = {
  values: CheckoutValues;
  errors: CheckoutErrors;
  onChange: <K extends keyof CheckoutValues>(
    key: K,
    value: CheckoutValues[K],
  ) => void;
};

export default function CheckoutForm({
  values,
  errors,
  onChange,
}: CheckoutFormProps) {
  const districts = LOCATIONS[values.province] ?? [];

  return (
    <>
      <Section
        title="Thông tin nhận hàng"
        icon={<Truck size={22} className="text-blue-700" />}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Họ và tên người nhận" required error={errors.name}>
            <input
              value={values.name}
              onChange={({ target }) => onChange("name", target.value)}
              placeholder="Nguyễn Văn A"
              className={inputClass}
            />
          </Field>
          <Field label="Số điện thoại di động" required error={errors.phone}>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={values.phone}
              onChange={({ target }) =>
                onChange("phone", target.value.replace(/\D/g, ""))
              }
              placeholder="0912345678"
              className={inputClass}
            />
          </Field>
          <div className="md:col-span-2">
            <Field
              label="Email nhận hóa đơn điện tử VAT"
              required
              error={errors.email}
            >
              <input
                type="email"
                value={values.email}
                onChange={({ target }) => onChange("email", target.value)}
                placeholder="ten@example.com"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Tỉnh / Thành phố" required error={errors.province}>
            <select
              value={values.province}
              onChange={({ target }) => {
                onChange("province", target.value);
                onChange("district", "");
              }}
              className={inputClass}
            >
              <option value="">Chọn tỉnh / thành phố</option>
              {Object.keys(LOCATIONS).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Quận / Huyện" required error={errors.district}>
            <select
              value={values.district}
              onChange={({ target }) => onChange("district", target.value)}
              disabled={!values.province}
              className={inputClass}
            >
              <option value="">Chọn quận / huyện</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field
              label="Địa chỉ cụ thể (Số nhà, tên toà nhà, tên đường)"
              required
              error={errors.address}
            >
              <input
                value={values.address}
                onChange={({ target }) => onChange("address", target.value)}
                placeholder="Số 88 Mạc Đĩnh Chi, Phường Đa Kao"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Ghi chú đơn hàng (Tùy chọn)">
              <textarea
                rows={3}
                value={values.note}
                onChange={({ target }) => onChange("note", target.value)}
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến 15 phút..."
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>
        </div>
      </Section>
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
    </>
  );
}
