import { CartItem, useShop } from "../../../components/context/ShopContext";

export function useCartSelection(cart: CartItem[]) {
  const { selected, setSelected } = useShop();

  const chosen = cart.filter(({ id }) => selected.includes(id));
  const allSelected = cart.length > 0 && chosen.length === cart.length;
  const total = chosen.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );

  const toggle = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

  const unselect = (id: number) =>
    setSelected((prev) => prev.filter((item) => item !== id));

  const toggleAll = () =>
    setSelected(allSelected ? [] : cart.map(({ id }) => id));

  return { selected, toggle, unselect, allSelected, toggleAll, chosen, total };
}
