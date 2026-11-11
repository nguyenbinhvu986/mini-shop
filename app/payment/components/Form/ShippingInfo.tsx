import { Truck } from "lucide-react";
import { CheckoutSectionProps, LOCATIONS } from "./CheckoutSchema";
import { Field, inputClass, Section } from "./FormParts";

export default function ShippingInfoSection({
  values,
  errors,
  onChange,
}: CheckoutSectionProps) {
  const districts = LOCATIONS[values.province] ?? [];

  return (
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
  );
}
