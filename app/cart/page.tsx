"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { CartItem, useShop } from "../components/context/ShopContext";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const MIN_MESSAGE = "Đây là số lượng tối thiểu để mua";
const stockMessage = (stock: number) => `Số lượng đang có là ${stock}`;

const columns = "md:grid-cols-[minmax(0,1fr)_120px_160px_80px]";

function QuantityControl({
  quantity,
  message,
  onDecrease,
  onIncrease,
  onCommit,
}: {
  quantity: number;
  message: string | null;
  onDecrease: () => void;
  onIncrease: () => void;
  onCommit: (value: number) => number;
}) {
  const [text, setText] = useState(String(quantity));
  const [prevQuantity, setPrevQuantity] = useState(quantity);

  if (quantity !== prevQuantity) {
    setPrevQuantity(quantity);
    setText(String(quantity));
  }

  const commit = () => {
    const n = Math.round(Number(text));
    if (text === "" || Number.isNaN(n) || n === quantity) {
      setText(String(quantity));
      return;
    }
    setText(String(onCommit(n)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center overflow-hidden rounded-md border border-slate-200 text-slate-700">
        <button
          onClick={onDecrease}
          aria-label="Giảm số lượng"
          className="flex h-8 w-8 items-center justify-center hover:bg-slate-50"
        >
          <Minus size={14} />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={({ target }) => setText(target.value.replace(/\D/g, ""))}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          aria-label="Số lượng"
          className="h-8 w-14 border-x border-slate-200 text-center text-sm text-slate-900 outline-none"
        />
        <button
          onClick={onIncrease}
          aria-label="Tăng số lượng"
          className="flex h-8 w-8 items-center justify-center hover:bg-slate-50"
        >
          <Plus size={14} />
        </button>
      </div>
      {message && (
        <p className="mt-1 text-center text-xs text-red-600">{message}</p>
      )}
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const [warn, setWarn] = useState<{
    id: CartItem["id"];
    message: string;
  } | null>(null);

  const decrease = ({ id, quantity, minQuantity }: CartItem) => {
    if (quantity <= minQuantity) {
      setWarn({ id, message: MIN_MESSAGE });
      return;
    }
    setWarn(null);
    updateQuantity(id, quantity - 1);
  };

  const increase = ({ id, quantity, stock }: CartItem) => {
    if (quantity >= stock) {
      setWarn({ id, message: stockMessage(stock) });
      return;
    }
    setWarn(null);
    updateQuantity(id, quantity + 1);
  };

  const commit = ({ id, minQuantity, stock }: CartItem, value: number) => {
    if (value < minQuantity) {
      setWarn({ id, message: MIN_MESSAGE });
      updateQuantity(id, minQuantity);
      return minQuantity;
    }
    if (value > stock) {
      setWarn({ id, message: stockMessage(stock) });
      updateQuantity(id, stock);
      return stock;
    }
    setWarn(null);
    updateQuantity(id, value);
    return value;
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
          <ShoppingCart size={48} className="text-slate-400" />
          <h1 className="text-lg font-bold text-slate-900">
            Giỏ hàng của bạn đang trống
          </h1>
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <h1 className="mb-4 text-xl font-bold text-slate-900">
        Giỏ hàng ({cart.length})
      </h1>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div
          className={`hidden gap-4 p-4 text-center text-sm text-slate-500 md:grid ${columns}`}
        >
          <span className="text-left">Sản phẩm</span>
          <span>Đơn giá</span>
          <span>Số lượng</span>
          <span>Thao tác</span>
        </div>
        <ul>
          {cart.map((item) => {
            const { id, title, thumbnail, price, quantity } = item;
            const control = (
              <QuantityControl
                quantity={quantity}
                message={warn && warn.id === id ? warn.message : null}
                onDecrease={() => decrease(item)}
                onIncrease={() => increase(item)}
                onCommit={(value) => commit(item, value)}
              />
            );

            return (
              <li
                key={id}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-slate-100 p-4 md:gap-4 ${columns}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="h-20 w-20 shrink-0 rounded-lg bg-slate-100 object-contain"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 md:hidden">
                      {formatPrice(price)}
                    </p>
                    <div className="mt-2 md:hidden">{control}</div>
                  </div>
                </div>
                <p className="hidden text-center text-sm font-semibold text-slate-900 md:block">
                  {formatPrice(price)}
                </p>
                <div className="hidden justify-center md:flex">{control}</div>
                <button
                  onClick={() => removeFromCart(id)}
                  className="text-sm font-semibold text-red-600"
                >
                  Xóa
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
