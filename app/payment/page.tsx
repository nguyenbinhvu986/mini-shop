"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Order, useShop } from "../components/context/ShopContext";
import { useLocalStorage } from "../components/Hooks/useLocalStorage";
import { calcOrder } from "./components/Order/SaleCode";
import CheckoutForm from "./components/Form/CheckoutForm";
import {
  CheckoutErrors,
  CheckoutValues,
  EMPTY_CHECKOUT,
  validateCheckout,
} from "./components/Form/CheckoutSchema";
import EmptyCheckout from "./components/Order/EmptyCheckout";
import OrderItemsSection from "./components/Order/OrderItemsSection";
import OrderSuccess from "./components/Order/OrderSuccess";
import OrderSummary from "./components/Order/OrderSummary";

const createOrderCode = () =>
  `NOVA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

export default function PaymentPage() {
  const router = useRouter();
  const { ready, cart, selected, setSelected, removeFromCart, addOrder } =
    useShop();

  const [values, setValues] = useLocalStorage<CheckoutValues>(
    "shop-checkout",
    EMPTY_CHECKOUT,
  );
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [placed, setPlaced] = useState<Order | null>(null);
  const [orderCode, setOrderCode] = useState(createOrderCode);

  const items = cart.filter(({ id }) => selected.includes(id));
  const { subtotal, discount, shippingFee, total } = calcOrder(items);
  const hasErrors = Object.values(errors).some(Boolean);

  useEffect(() => {
    if (items.length > 0) setPlaced(null);
  }, [items.length]);

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

    const { name, phone, address, district, province, payment } = values;
    const order: Order = {
      id: orderCode,
      items,
      subtotal,
      discount,
      shippingFee,
      total,
      customer: { name, phone, address, district, province, payment },
      placedAt: new Date().toISOString(),
    };

    setPlaced(order);
    addOrder(order);
    items.forEach(({ id }) => removeFromCart(id));
    setSelected([]);
    setOrderCode(createOrderCode());
  };

  if (!ready) return null;

  if (placed) return <OrderSuccess order={placed} />;

  if (items.length === 0) return <EmptyCheckout />;

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
          <OrderItemsSection items={items} orderCode={orderCode} />
          <CheckoutForm
            values={values}
            errors={errors}
            onChange={handleChange}
          />
        </div>
        <OrderSummary
          count={items.length}
          subtotal={subtotal}
          discount={discount}
          shippingFee={shippingFee}
          total={total}
          hasErrors={hasErrors}
          onPlaceOrder={placeOrder}
        />
      </div>
    </div>
  );
}
