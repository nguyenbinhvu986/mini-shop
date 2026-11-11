"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../../types/products/types-products";
import { useShop } from "../context/ShopContext";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export default function ProductCard({
  id,
  title,
  thumbnail,
  rating,
  price,
  discountPercentage,
  stock,
  availabilityStatus,
  warrantyInformation,
  returnPolicy,
}: Product) {
  const { addToCart } = useShop();
  const salePrice = price * (1 - discountPercentage / 100);
  const hasDiscount = formatPrice(salePrice) !== formatPrice(price);
  const inStock = stock > 0;
  const lowStock = availabilityStatus === "Low Stock";

  return (
    <article className="relative flex h-[380px] flex-col rounded-2xl bg-white p-3 shadow-sm">
      <div className="relative h-44 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="truncate font-bold text-slate-900">{title}</h3>
        <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-800">
          <Star size={16} className="fill-amber-700 text-amber-700" />
          {rating}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-blue-700">
            {formatPrice(salePrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <p
          className={`mt-1 text-xs font-semibold ${
            !inStock
              ? "text-red-600"
              : lowStock
                ? "text-amber-700"
                : "text-green-700"
          }`}
        >
          {!inStock
            ? "Hết hàng"
            : lowStock
              ? `Chỉ còn ${stock} sản phẩm`
              : `Còn ${stock} sản phẩm`}
        </p>
        <div className="mt-auto flex gap-2 pt-3">
          <button
            onClick={() =>
              addToCart({
                id,
                title,
                thumbnail,
                price: salePrice,
                quantity: 1,
                minQuantity: 1,
                stock,
                warranty: warrantyInformation,
                returnPolicy,
              })
            }
            disabled={!inStock}
            className="relative z-10 flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={16} />
            Thêm giỏ
          </button>
          <Link
            href={`/products/${id}`}
            className="flex-1 rounded-lg bg-indigo-50 py-2.5 text-center text-sm font-semibold text-slate-800 after:absolute after:inset-0 after:rounded-2xl"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
