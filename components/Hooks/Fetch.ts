import { Product, ProductsResponse } from "../../types/products/types-products";

export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=0", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
  const { products }: ProductsResponse = await res.json();
  return products;
};

export const getProduct = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Không tải được sản phẩm");
  const product: Product = await res.json();
  return product;
};
