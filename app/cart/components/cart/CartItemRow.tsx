import { CartItem } from "../../../components/context/ShopContext";
import QuantityControl from "../../QuantityControl";
import { CART_COLUMNS, formatPrice } from "./CartHelpers";
import { Trash } from "lucide-react";

type CartItemRowProps = {
  item: CartItem;
  selected: boolean;
  message: string | null;
  onToggle: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  onCommit: (value: number) => number;
  onRemove: () => void;
};

export default function CartItemRow({
  item,
  selected,
  message,
  onToggle,
  onDecrease,
  onIncrease,
  onCommit,
  onRemove,
}: CartItemRowProps) {
  const { title, thumbnail, price, quantity } = item;

  const control = (
    <QuantityControl
      quantity={quantity}
      message={message}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
      onCommit={onCommit}
    />
  );

  return (
    <li
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-t border-slate-100 p-4 md:gap-4 ${CART_COLUMNS}`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        className="h-5 w-5 accent-blue-700"
      />
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={thumbnail}
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
        onClick={onRemove}
        className="flex h-full w-full items-center justify-center text-slate-500 hover:text-red-600"
      >
        <Trash size={16} />
      </button>
    </li>
  );
}
