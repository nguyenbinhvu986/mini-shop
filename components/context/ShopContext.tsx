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
import { useLocalStorage } from "../Hooks/useLocalStorage";

type Filters = {
  categories: string[];
  maxPrice: number | null;
  minRating: number | null;
};

export type Sort = "price-asc" | "price-desc" | "rating";

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

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    district: string;
    province: string;
    payment: "qr" | "card" | "cod";
  };
  placedAt: string;
};

type ShopContextType = {
  ready: boolean;
  filters: Filters;
  setFilters: (value: Filters) => void;
  sort: Sort;
  setSort: (value: Sort) => void;
  page: number;
  setPage: (value: number) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  orders: Order[];
  addOrder: (order: Order) => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersValue] = useState<Filters>({
    categories: [],
    maxPrice: null,
    minRating: null,
  });
  const [sort, setSortValue] = useState<Sort>("price-asc");
  const [page, setPage] = useState(1);
  const [cart, setCart, ready] = useLocalStorage<CartItem[]>("shop-cart", []);
  const [selected, setSelected] = useLocalStorage<number[]>(
    "shop-selected",
    [],
  );
  const [orders, setOrders] = useLocalStorage<Order[]>("shop-orders", []);

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

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  const setFilters = (value: Filters) => {
    setFiltersValue(value);
    setPage(1);
  };

  const setSort = (value: Sort) => {
    setSortValue(value);
    setPage(1);
  };

  return (
    <ShopContext.Provider
      value={{
        ready,
        filters,
        setFilters,
        sort,
        setSort,
        page,
        setPage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        selected,
        setSelected,
        orders,
        addOrder,
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
