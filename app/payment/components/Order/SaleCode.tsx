import { CartItem } from "../../../components/context/ShopContext";

export const PROMO_CODE = "JUNIOR10";
export const PROMO_RATE = 0.1;
export const PROMO_MAX = 20;
const SHIPPING_FEE = 5;
const FREE_SHIPPING_FROM = 100;

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export const calcOrder = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );
  const discount = Math.min(subtotal * PROMO_RATE, PROMO_MAX);
  const shippingFee = subtotal < FREE_SHIPPING_FROM ? SHIPPING_FEE : 0;

  return {
    subtotal,
    discount,
    shippingFee,
    total: subtotal - discount + shippingFee,
  };
};
