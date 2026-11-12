import { useRouter } from "next/navigation";
import { formatPrice } from "./CartHelpers";
import { Tag } from "lucide-react";

type CartSummaryBarProps = {
  totalCount: number;
  selectedCount: number;
  allSelected: boolean;
  total: number;
  onToggleAll: () => void;
};

export default function CartSummaryBar({
  totalCount,
  selectedCount,
  allSelected,
  total,
  onToggleAll,
}: CartSummaryBarProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="fixed inset-x-0 bottom-20 z-10 mx-auto flex max-w-7xl items-center gap-2 bg-green-50 px-6 py-2 text-sm font-semibold text-green-800">
          <Tag size={16} className="shrink-0" />
          Giảm 10%, tối đa $20 khi thanh toán
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="h-5 w-5 accent-blue-700"
          />
          Chọn tất cả ({totalCount})
        </label>
        <div className="flex items-center gap-4">
          <p className="text-right text-sm text-slate-700">
            Tổng cộng ({selectedCount} sản phẩm):{" "}
            <span className="text-lg font-bold text-blue-700">
              {formatPrice(total)}
            </span>
          </p>
          <button
            onClick={() => router.push("/payment")}
            disabled={selectedCount === 0}
            className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
