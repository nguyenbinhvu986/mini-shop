import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  onChange: (page: number) => void;
};

const getPages = (page: number, totalPages: number) => {
  const pages = [1, page - 1, page, page + 1, totalPages]
    .filter((n, i, arr) => n >= 1 && n <= totalPages && arr.indexOf(n) === i)
    .sort((a, b) => a - b);
  return pages.flatMap((n, i) =>
    i > 0 && n - pages[i - 1] > 1 ? ["...", n] : [n],
  );
};

const base =
  "flex h-10 min-w-10 items-center justify-center gap-1 rounded-lg px-3 text-sm font-semibold";

export default function Pagination({
  page,
  totalPages,
  totalItems,
  onChange,
}: PaginationProps) {
  return (
    <nav
      aria-label="Phân trang"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm"
    >
      <p className="text-sm text-slate-600">
        Trang <b className="text-slate-900">{page}</b> trên{" "}
        <b className="text-slate-900">{totalPages}</b> (Tổng {totalItems} mục)
      </p>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <button
            onClick={() => onChange(page - 1)}
            className={`${base} bg-indigo-50 text-slate-700`}
          >
            <ChevronLeft size={16} />
            Trước
          </button>
        )}
        {getPages(page, totalPages).map((n, i) =>
          n === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-slate-500">
              ...
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onChange(n as number)}
              aria-current={n === page ? "page" : undefined}
              className={`${base} ${n === page ? "bg-blue-700 text-white" : "bg-indigo-50 text-slate-700"}`}
            >
              {n}
            </button>
          ),
        )}
        {page < totalPages && (
          <button
            onClick={() => onChange(page + 1)}
            className={`${base} bg-indigo-50 text-slate-700`}
          >
            Sau
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </nav>
  );
}
