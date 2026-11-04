import { ProductsResponse } from "../../types/products/types-products";

export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=0", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
  const { products }: ProductsResponse = await res.json();
  return products;
};
