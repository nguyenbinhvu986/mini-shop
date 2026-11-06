"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Product } from "../../types/products/types-products";

type Filters = {
  categories: string[];
  maxPrice: number | null;
  minRating: number | null;
};

export type CartItem = Pick<
  Product,
  "id" | "title" | "thumbnail" | "returnPolicy"
> & {
  price: number;
  quantity: number;
  minQuantity: number;
  stock: number;
  warranty: string;
};

type ShopContextType = {
  filters: Filters;
  setFilters: (value: Filters) => void;
  page: number;
  setPage: (value: number) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersValue] = useState<Filters>({
    categories: [],
    maxPrice: null,
    minRating: null,
  });
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const addToCart = (item: CartItem) =>
    setCart((prev) =>
      prev.some(({ id }) => id === item.id) ? prev : [...prev, item],
    );

  const removeFromCart = (id: CartItem["id"]) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id: CartItem["id"], quantity: number) =>
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

  const setFilters = (value: Filters) => {
    setFiltersValue(value);
    setPage(1);
  };

  return (
    <ShopContext.Provider
      value={{
        filters,
        setFilters,
        page,
        setPage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        selected,
        setSelected,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
};
