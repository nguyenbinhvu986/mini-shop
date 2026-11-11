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

export type CheckoutSectionProps = {
  values: CheckoutValues;
  errors: CheckoutErrors;
  onChange: <K extends keyof CheckoutValues>(
    key: K,
    value: CheckoutValues[K],
  ) => void;
};

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

export const LOCATIONS: Record<string, string[]> = {
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
