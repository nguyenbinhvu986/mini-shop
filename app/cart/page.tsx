"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useShop } from "../components/context/ShopContext";
import CartItemRow from "./components/cart/CartItemRow";
import CartSummaryBar from "./components/cart/Cartsummarybar";
import EmptyCart from "./components/cart/EmptyCart";
import { CART_COLUMNS } from "./components/cart/CartHelpers";
import { useCartQuantity } from "./components/Hooks/UseCartQuantity";
import { useCartSelection } from "./components/Hooks/UseCartSelection";

export default function CartPage() {
  const router = useRouter();
  const { ready, cart, removeFromCart } = useShop();
  const { selected, toggle, unselect, allSelected, toggleAll, chosen, total } =
    useCartSelection(cart);
  const { warn, decrease, increase, commit } = useCartQuantity();

  const goBack = () =>
    window.history.length > 1 ? router.back() : router.push("/");

  if (!ready) return null;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 pb-28">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={goBack}
          aria-label="Quay lại"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">
          Giỏ hàng ({cart.length})
        </h1>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div
          className={`hidden gap-4 p-4 text-center text-sm text-slate-500 md:grid ${CART_COLUMNS}`}
        >
          <span />
          <span className="text-left">Sản phẩm</span>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thao tác</span>
        </div>
        <ul>
          {cart.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              message={warn && warn.id === item.id ? warn.message : null}
              onToggle={() => toggle(item.id)}
              onDecrease={() => decrease(item)}
              onIncrease={() => increase(item)}
              onCommit={(value) => commit(item, value)}
              onRemove={() => {
                unselect(item.id);
                removeFromCart(item.id);
              }}
            />
          ))}
        </ul>
      </div>
      <CartSummaryBar
        totalCount={cart.length}
        selectedCount={chosen.length}
        allSelected={allSelected}
        total={total}
        onToggleAll={toggleAll}
      />
    </div>
  );
}
