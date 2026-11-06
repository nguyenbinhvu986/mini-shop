import { useState } from "react";
import { CartItem, useShop } from "../../../components/context/ShopContext";
import { MIN_MESSAGE, stockMessage } from "../cart/CartHelpers";

export function useCartQuantity() {
  const { updateQuantity } = useShop();
  const [warn, setWarn] = useState<{
    id: CartItem["id"];
    message: string;
  } | null>(null);

  const decrease = ({ id, quantity, minQuantity }: CartItem) => {
    if (quantity <= minQuantity) {
      setWarn({ id, message: MIN_MESSAGE });
      return;
    }
    setWarn(null);
    updateQuantity(id, quantity - 1);
  };

  const increase = ({ id, quantity, stock }: CartItem) => {
    if (quantity >= stock) {
      setWarn({ id, message: stockMessage(stock) });
      return;
    }
    setWarn(null);
    updateQuantity(id, quantity + 1);
  };

  const commit = ({ id, minQuantity, stock }: CartItem, value: number) => {
    if (value < minQuantity) {
      setWarn({ id, message: MIN_MESSAGE });
      updateQuantity(id, minQuantity);
      return minQuantity;
    }
    if (value > stock) {
      setWarn({ id, message: stockMessage(stock) });
      updateQuantity(id, stock);
      return stock;
    }
    setWarn(null);
    updateQuantity(id, value);
    return value;
  };

  return { warn, decrease, increase, commit };
}
