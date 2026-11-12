"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { CartItem, useShop } from "../context/ShopContext";

export default function ProductActions({
  item,
}: {
  item: Omit<CartItem, "quantity">;
}) {
  const router = useRouter();
  const { addToCart, updateQuantity, setSelected } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { id, stock } = item;
  const inStock = stock > 0;

  const changeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(value, 1), stock));
    setAdded(false);
  };

  const put = () => {
    addToCart({ ...item, quantity });
    updateQuantity(id, quantity);
  };

  const handleAdd = () => {
    put();
    setAdded(true);
  };

  const handleBuy = () => {
    put();
    setSelected([id]);
    router.push("/cart");
  };

  return (
    <div>
      <p className="text-sm font-bold text-slate-800">Số lượng:</p>
      <div className="mt-2 inline-flex items-center rounded-xl bg-indigo-50 text-slate-700">
        <button
          onClick={() => changeQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Giảm số lượng"
          className="flex h-11 w-11 items-center justify-center disabled:opacity-40"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-semibold text-slate-900">
          {quantity}
        </span>
        <button
          onClick={() => changeQuantity(quantity + 1)}
          disabled={quantity >= stock}
          aria-label="Tăng số lượng"
          className="flex h-11 w-11 items-center justify-center disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-100 py-4 font-bold text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={18} />
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={handleBuy}
          disabled={!inStock}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Zap size={18} />
          Mua ngay
        </button>
      </div>
      {added && (
        <p className="mt-3 text-sm font-semibold text-green-700">
          Đã thêm vào giỏ hàng.{" "}
          <Link href="/cart" className="underline">
            Xem giỏ hàng
          </Link>
        </p>
      )}
    </div>
  );
}
