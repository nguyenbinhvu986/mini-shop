import { notFound } from "next/navigation";
import { RefreshCw, ShieldCheck, Star, Truck, ChevronLeft } from "lucide-react";
import { getProduct } from "../../../components/Hooks/Fetch";
import ProductActions from "../../../components/Products[id]/ProductActions";
import Link from "next/link";
export const instant = false;
const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    sku,
    availabilityStatus,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    reviews,
    thumbnail,
  } = product;

  const salePrice = price * (1 - discountPercentage / 100);
  const saved = price - salePrice;
  const hasDiscount = formatPrice(salePrice) !== formatPrice(price);
  const inStock = stock > 0;
  const lowStock = availabilityStatus === "Low Stock";

  const infos = [
    { icon: Truck, label: "Vận chuyển", text: shippingInformation },
    { icon: RefreshCw, label: "Đổi trả", text: returnPolicy },
    { icon: ShieldCheck, label: "Bảo hành", text: warrantyInformation },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="border-t border-slate-100 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700"
        >
          <ChevronLeft size={16} />
          Quay lại trang chủ
        </Link>
      </div>
      <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm lg:grid-cols-2">
        <div>
          <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 h-full w-full object-contain"
            />
            {hasDiscount && (
              <span className="absolute left-4 top-4 rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                -{Math.round(discountPercentage)}%
              </span>
            )}
          </div>
          <div className="mt-6">
            <h2 className="font-bold text-slate-900">Mô tả sản phẩm</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {brand && (
              <span className="rounded-md bg-indigo-100 px-3 py-1 font-bold uppercase text-blue-700">
                {brand}
              </span>
            )}
            <span className="text-slate-500">Mã SP: {sku}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">{title}</h1>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm">
            <span className="font-bold text-amber-800">{rating}</span>
            <span className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(rating)
                      ? "fill-amber-500 text-amber-500"
                      : "text-amber-500"
                  }
                />
              ))}
            </span>
            <span className="text-slate-600">({reviews.length} đánh giá)</span>
          </div>

          <div className="mt-5 rounded-2xl bg-indigo-50 p-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-bold text-blue-700">
                {formatPrice(salePrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-slate-500 line-through">
                    {formatPrice(price)}
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    Tiết kiệm {formatPrice(saved)}
                  </span>
                </>
              )}
            </div>
            <p
              className={`mt-3 text-sm font-semibold ${
                !inStock
                  ? "text-red-600"
                  : lowStock
                    ? "text-amber-700"
                    : "text-green-700"
              }`}
            >
              {!inStock
                ? "Hết hàng"
                : `Còn hàng (Còn ${stock} sản phẩm trong kho)`}
            </p>
          </div>

          <div className="mt-6">
            <ProductActions
              item={{
                id: product.id,
                title,
                thumbnail,
                price: salePrice,
                minQuantity: 1,
                stock,
                warranty: warrantyInformation,
                returnPolicy,
              }}
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {infos.map(({ icon: Icon, label, text }) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4">
                <Icon size={20} className="text-green-700" />
                <p className="mt-2 text-sm font-bold text-slate-900">{label}</p>
                <p className="text-xs text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
