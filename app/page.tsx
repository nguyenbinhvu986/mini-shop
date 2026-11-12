import Filter from "../components/Home/filter";
import ProductList from "../components/Home/ProductList";
import { getProducts } from "../components/Hooks/Fetch";
import { Suspense } from "react";
import ProductSkeleton from "../components/Home/skeletonLoading";

export default async function Home() {
  const products = await getProducts();
  const prices = products.map(({ price }) => price);

  const counts: Record<string, number> = {};
  products.forEach(({ category }) => {
    counts[category] = (counts[category] ?? 0) + 1;
  });
  const categories = Object.entries(counts).map(([slug, count]) => ({
    slug,
    count,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 lg:flex lg:gap-6">
      <Filter
        categories={categories}
        minPrice={Math.floor(Math.min(...prices))}
        maxPrice={Math.ceil(Math.max(...prices))}
      />
      <section className="mt-6 flex min-w-0 flex-1 flex-col gap-6 lg:mt-0">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList products={products} />
        </Suspense>
      </section>
    </div>
  );
}
