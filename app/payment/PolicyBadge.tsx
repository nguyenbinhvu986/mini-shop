import { ReactNode } from "react";
import { RefreshCw, ShieldCheck } from "lucide-react";

type Tone = "red" | "yellow" | "green";

const TONE_CLASS: Record<Tone, string> = {
  red: "border-red-300 bg-red-50 text-red-700",
  yellow: "border-amber-300 bg-amber-50 text-amber-800",
  green: "border-green-300 bg-green-50 text-green-800",
};

const firstNumber = (text: string) => Number(text.match(/\d+/)?.[0] ?? 0);

// "1 year warranty", "6 months warranty", "1 week warranty", "Lifetime warranty", "No warranty"
function parseWarranty(text = ""): { months: number; label: string } {
  const t = text.toLowerCase();
  const n = firstNumber(t);
  if (t.includes("lifetime"))
    return { months: Infinity, label: "Bảo hành trọn đời" };
  if (t.includes("year")) return { months: n * 12, label: `Bảo hành ${n} năm` };
  if (t.includes("month")) return { months: n, label: `Bảo hành ${n} tháng` };
  if (t.includes("week")) return { months: n / 4, label: `Bảo hành ${n} tuần` };
  return { months: 0, label: "Không bảo hành" };
}
function parseReturn(text = ""): { days: number; label: string } {
  const days = firstNumber(text);
  return days > 0
    ? { days, label: `Đổi trả trong ${days} ngày` }
    : { days: 0, label: "Không đổi trả" };
}
const warrantyTone = (months: number): Tone =>
  months >= 12 ? "green" : months >= 1 ? "yellow" : "red";
const returnTone = (days: number): Tone =>
  days >= 30 ? "green" : days >= 7 ? "yellow" : "red";

function Badge({
  tone,
  icon,
  label,
}: {
  tone: Tone;
  icon: ReactNode;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold ${TONE_CLASS[tone]}`}
    >
      {icon}
      {label}
    </span>
  );
}

export default function PolicyBadges({
  warranty,
  returnPolicy,
}: {
  warranty: string;
  returnPolicy: string;
}) {
  const w = parseWarranty(warranty);
  const r = parseReturn(returnPolicy);

  return (
    <div className="mt-2 flex flex-wrap justify-start gap-2 md:justify-end">
      <Badge
        tone={warrantyTone(w.months)}
        icon={<ShieldCheck size={14} />}
        label={w.label}
      />
      <Badge
        tone={returnTone(r.days)}
        icon={<RefreshCw size={14} />}
        label={r.label}
      />
    </div>
  );
}
