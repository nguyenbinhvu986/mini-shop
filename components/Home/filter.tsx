"use client";

import { useState } from "react";
import { SlidersHorizontal, Star } from "lucide-react";
import { useShop } from "../context/ShopContext";

type FilterProps = {
  categories: { slug: string; count: number }[];
  minPrice: number;
  maxPrice: number;
};

const RATING_OPTIONS = [
  { stars: 5, min: 4.5, label: "Từ 5 sao" },
  { stars: 4, min: 4, label: "Từ 4 sao trở lên" },
  { stars: 3, min: 3, label: "Từ 3 sao trở lên" },
];

const toLabel = (slug: string) =>
  slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

const format = (value: number) => `$${value.toLocaleString("en-US")}`;

export default function Filter({
  categories,
  minPrice,
  maxPrice,
}: FilterProps) {
  const { filters, setFilters } = useShop();
  const [selected, setSelected] = useState<string[]>(filters.categories);
  const [price, setPrice] = useState(filters.maxPrice ?? maxPrice);
  const [priceText, setPriceText] = useState(String(price));
  const [rating, setRating] = useState<number | null>(filters.minRating);

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug],
    );

  const commitPrice = () => {
    const n = Number(priceText);
    const next =
      priceText === "" || Number.isNaN(n)
        ? price
        : Math.min(Math.max(Math.round(n), minPrice), maxPrice);
    setPrice(next);
    setPriceText(String(next));
  };

  const apply = (
    nextSelected: string[],
    nextPrice: number,
    nextRating: number | null,
  ) =>
    setFilters({
      categories: nextSelected,
      maxPrice: nextPrice < maxPrice ? nextPrice : null,
      minRating: nextRating,
    });

  const reset = () => {
    setSelected([]);
    setPrice(maxPrice);
    setPriceText(String(maxPrice));
    setRating(null);
    apply([], maxPrice, null);
  };

  return (
    <aside className="flex w-full flex-col rounded-2xl bg-white p-5 shadow-sm lg:w-72 lg:shrink-0 lg:self-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <SlidersHorizontal size={22} className="text-blue-700" />
          <h2>Bộ lọc tìm kiếm</h2>
        </div>
        <button onClick={reset} className="text-xs font-bold text-blue-700">
          Đặt lại
        </button>
      </div>

      <h3 className="mt-6 font-bold text-slate-900">Danh mục sản phẩm</h3>
      <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
        {categories.map(({ slug, count }) => (
          <li key={slug}>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={selected.includes(slug)}
                onChange={() => toggle(slug)}
                className="h-5 w-5 accent-blue-700"
              />
              <span>{toLabel(slug)}</span>
              <span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-slate-600">
                {count}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <hr className="my-5 border-slate-200" />

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-slate-900">Khoảng giá (USD)</h3>
        <span className="text-right text-xs font-bold text-blue-700">
          Tối đa {format(price)}
        </span>
      </div>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={1}
        value={price}
        onChange={({ target }) => {
          setPrice(Number(target.value));
          setPriceText(target.value);
        }}
        className="mt-3 w-full accent-blue-700"
      />
      <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <label>
          Từ
          <input
            readOnly
            value={format(minPrice)}
            className="mt-1 w-full rounded-lg bg-indigo-50 px-3 py-2.5 text-center text-sm text-slate-700 outline-none"
          />
        </label>
        <label>
          Đến
          <input
            type="text"
            inputMode="numeric"
            value={`$${priceText}`}
            onChange={({ target }) =>
              setPriceText(target.value.replace(/\D/g, ""))
            }
            onBlur={commitPrice}
            onKeyDown={(e) => e.key === "Enter" && commitPrice()}
            className="mt-1 w-full rounded-lg bg-indigo-50 px-3 py-2.5 text-center text-sm text-slate-700 outline-none"
          />
        </label>
      </div>

      <hr className="my-5 border-slate-200" />

      <h3 className="font-bold text-slate-900">Đánh giá khách hàng</h3>
      <ul className="mt-3 space-y-2">
        {RATING_OPTIONS.map(({ stars, min, label }) => (
          <li key={min}>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
              <input
                type="radio"
                name="rating"
                checked={rating === min}
                onChange={() => setRating(min)}
                className="h-5 w-5 accent-blue-700"
              />
              <span className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < stars
                        ? "fill-amber-500 text-amber-500"
                        : "text-amber-500"
                    }
                  />
                ))}
              </span>
              <span>{label}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => apply(selected, price, rating)}
          className="w-full rounded-xl bg-blue-700 py-3 font-bold text-white"
        >
          Áp dụng bộ lọc
        </button>
        <button
          onClick={reset}
          className="w-full rounded-xl bg-indigo-50 py-3 font-semibold text-slate-700"
        >
          Xóa tất cả bộ lọc
        </button>
      </div>
    </aside>
  );
}
