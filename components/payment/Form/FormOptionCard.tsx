import { ReactNode } from "react";
export function OptionCard({
  name,
  checked,
  onSelect,
  children,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${
        checked
          ? "border-blue-700 bg-indigo-50"
          : "border-transparent bg-slate-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="mt-1 h-5 w-5 shrink-0 accent-blue-700"
      />
      <div className="min-w-0 flex-1">{children}</div>
    </label>
  );
}
