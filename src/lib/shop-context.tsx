import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ShopState = {
  cart: Record<string, number>;
  wishlist: string[];
  addToCart: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
};

const ShopContext = createContext<ShopState | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({ "airwave-headphones": 1 });
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("justbay-shop");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { cart?: Record<string, number>; wishlist?: string[] };
      if (parsed.cart) setCart(parsed.cart);
      if (parsed.wishlist) setWishlist(parsed.wishlist);
    } catch { /* Ignore malformed demo state. */ }
  }, []);

  useEffect(() => { sessionStorage.setItem("justbay-shop", JSON.stringify({ cart, wishlist })); }, [cart, wishlist]);

  const value = useMemo<ShopState>(() => ({
    cart,
    wishlist,
    addToCart: (id, quantity = 1) => setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + quantity })),
    updateQuantity: (id, quantity) => setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id]; else next[id] = quantity;
      return next;
    }),
    toggleWishlist: (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    cartCount: Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
  }), [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}