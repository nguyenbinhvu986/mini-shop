import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type QuantityControlProps = {
  quantity: number;
  message: string | null;
  onDecrease: () => void;
  onIncrease: () => void;
  onCommit: (value: number) => number;
};

export default function QuantityControl({
  quantity,
  message,
  onDecrease,
  onIncrease,
  onCommit,
}: QuantityControlProps) {
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
