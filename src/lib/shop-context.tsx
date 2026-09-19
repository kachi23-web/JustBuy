import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as demoProducts, type Product } from "./catalog";
import { fetchLiveProducts } from "./db";

export type SellerProfile = { store: string; owner: string; phone: string; city: string; category: string };

type ShopState = {
  cart: Record<string, number>;
  wishlist: string[];
  listings: Product[];
  seller: SellerProfile | null;
  addToCart: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  registerSeller: (profile: SellerProfile) => void;
  addListing: (product: Product) => void;
  removeListing: (id: string) => void;
  cartCount: number;
  liveProducts: Product[];
  refreshCatalog: () => Promise<void>;
  clearCart: () => void;
};

const ShopContext = createContext<ShopState | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({ "airwave-headphones": 1 });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [listings, setListings] = useState<Product[]>([]);
  const [seller, setSeller] = useState<SellerProfile | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("justbay-shop");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { cart?: Record<string, number>; wishlist?: string[]; listings?: Product[]; seller?: SellerProfile | null };
      if (parsed.cart) setCart(parsed.cart);
      if (parsed.wishlist) setWishlist(parsed.wishlist);
      if (parsed.listings) setListings(parsed.listings);
      if (parsed.seller) setSeller(parsed.seller);
    } catch { /* Ignore malformed demo state. */ }
  }, []);

  useEffect(() => { sessionStorage.setItem("justbay-shop", JSON.stringify({ cart, wishlist, listings, seller })); }, [cart, wishlist, listings, seller]);

  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const refreshCatalog = useCallback(async () => { setLiveProducts(await fetchLiveProducts()); }, []);
  useEffect(() => { void refreshCatalog(); }, [refreshCatalog]);

  const value = useMemo<ShopState>(() => ({
    cart,
    wishlist,
    listings,
    seller,
    addToCart: (id, quantity = 1) => setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + quantity })),
    updateQuantity: (id, quantity) => setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[id]; else next[id] = quantity;
      return next;
    }),
    toggleWishlist: (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    registerSeller: (profile) => setSeller(profile),
    addListing: (product) => setListings((current) => [product, ...current]),
    removeListing: (id) => setListings((current) => current.filter((item) => item.id !== id)),
    cartCount: Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
    liveProducts,
    refreshCatalog,
    clearCart: () => setCart({}),
  }), [cart, wishlist, listings, seller, liveProducts, refreshCatalog]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}

/** Real seller listings from the database, shown alongside the sample catalogue. */
export function useCatalog(): Product[] {
  const { listings, liveProducts } = useShop();
  return useMemo(() => [...liveProducts, ...listings, ...demoProducts], [liveProducts, listings]);
}
