"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useShop } from "../../../components/context/ShopContext";

export default function CartIcon() {
  const { cart } = useShop();

  return (
    <Link href="/cart" className="relative" aria-label="Giỏ hàng">
      <ShoppingCart size={24} />
      {cart.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-700 px-1 text-xs font-bold text-white">
          {cart.length}
        </span>
      )}
    </Link>
  );
}
