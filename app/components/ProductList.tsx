"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "./Hooks/useDebounce";
import { useShop } from "./context/ShopContext";
import { Product } from "../types/products/types-products";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./skeletonLoading";

const PAGE_SIZE = 12;

export default function ProductList({ products }: { products: Product[] }) {
  const { filters, page, setPage } = useShop();
  const query = useSearchParams().get("q") ?? "";
  const delayedQuery = useDebounce(query, 200);
  const delayedFilters = useDebounce(filters, 200);
  const pending = delayedQuery !== query || delayedFilters !== filters;

  const keyword = delayedQuery.trim();
  const lowerKeyword = keyword.toLowerCase();
  const { categories, maxPrice, minRating } = delayedFilters;

  const results = products.filter(
    ({ title, category, price, rating }) =>
      (!lowerKeyword ||
        title.toLowerCase().includes(lowerKeyword) ||
        category.replace(/-/g, " ").includes(lowerKeyword)) &&
      (!categories.length || categories.includes(category)) &&
      (maxPrice === null || price <= maxPrice) &&
      (minRating === null || rating >= minRating),
  );

  const totalPages = Math.max(Math.ceil(results.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const items = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
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
