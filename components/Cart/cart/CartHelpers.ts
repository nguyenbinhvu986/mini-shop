export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const MIN_MESSAGE = "Đây là số lượng tối thiểu để mua";

export const stockMessage = (stock: number) => `Số lượng đang có là ${stock}`;

export const CART_COLUMNS =
  "md:grid-cols-[24px_minmax(0,1fr)_120px_160px_80px]";
