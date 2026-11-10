"use client";

import { ChevronDown, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "./Hooks/useDebounce";
import { Sort, useShop } from "./context/ShopContext";
import { Product } from "../types/products/types-products";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./skeletonLoading";

const PAGE_SIZE = 12;

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "price-asc", label: "Giá tăng dần" },
  { value: "price-desc", label: "Giá giảm dần" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

const salePrice = ({ price, discountPercentage }: Product) =>
  price * (1 - discountPercentage / 100);

const SORTERS: Record<Sort, (a: Product, b: Product) => number> = {
  "price-asc": (a, b) => salePrice(a) - salePrice(b),
  "price-desc": (a, b) => salePrice(b) - salePrice(a),
  rating: (a, b) => b.rating - a.rating,
};

export default function ProductList({ products }: { products: Product[] }) {
  const { filters, sort, setSort, page, setPage } = useShop();
  const query = useSearchParams().get("q") ?? "";
  const delayedQuery = useDebounce(query, 200);
  const delayedFilters = useDebounce(filters, 200);
  const pending = delayedQuery !== query || delayedFilters !== filters;

  const keyword = delayedQuery.trim();
  const lowerKeyword = keyword.toLowerCase();
  const { categories, maxPrice, minRating } = delayedFilters;

  const results = products
    .filter(
      ({ title, category, price, rating }) =>
        (!lowerKeyword ||
          title.toLowerCase().includes(lowerKeyword) ||
          category.replace(/-/g, " ").includes(lowerKeyword)) &&
        (!categories.length || categories.includes(category)) &&
        (maxPrice === null || price <= maxPrice) &&
        (minRating === null || rating >= minRating),
    )
    .sort(SORTERS[sort]);

  const totalPages = Math.max(Math.ceil(results.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const items = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <div className="flex items-center justify-end gap-2 text-sm">
        <label htmlFor="sort" className="text-slate-600">
          Sắp xếp:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={({ target }) => setSort(target.value as Sort)}
            className="appearance-none rounded-lg bg-white py-2 pl-3 pr-9 font-semibold text-slate-800 shadow-sm outline-none"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
          />
        </div>
      </div>
      {pending ? (
        <ProductSkeleton />
      ) : (
        <div
          key={currentPage}
          className="flex-1 p-1 md:max-h-[784px] md:overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm">
              <SearchX size={48} className="text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-sm text-slate-600">
                {keyword
                  ? `Không có sản phẩm hay danh mục nào khớp với “${keyword}”.`
                  : "Không có sản phẩm nào phù hợp với bộ lọc hiện tại."}
              </p>
            </div>
          ) : (
            <div className="grid content-start gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      )}
      {results.length > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={results.length}
          onChange={setPage}
        />
      )}
    </>
  );
}
