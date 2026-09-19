import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./catalog";
import fallbackImage from "../assets/product-phone.jpg";

export type Store = {
  id: string;
  owner_id: string;
  name: string;
  owner_name: string | null;
  phone: string | null;
  city: string;
  category: string | null;
  description: string | null;
  verified: boolean;
  rating: number;
};

export type DbProduct = {
  id: string;
  store_id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  old_price: number | null;
  city: string;
  image_url: string | null;
  delivery: string | null;
  stock: number;
  status: string;
};

/** Map a stored listing (plus its store) into the shared shop product shape. */
export function toProduct(row: DbProduct & { stores?: { name: string; verified: boolean } | null }): Product {
  return {
    storeId: row.store_id,
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    ...(row.old_price ? { oldPrice: row.old_price } : {}),
    rating: 5,
    reviews: 0,
    seller: row.stores?.name ?? "JustBay seller",
    city: row.city,
    image: row.image_url || fallbackImage,
    delivery: row.delivery || "Delivery in 2–4 days",
    badge: "NEW",
  };
}

export async function fetchLiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, stores(name, verified)")
    .eq("status", "active")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as unknown as Array<DbProduct & { stores: { name: string; verified: boolean } | null }>).map(toProduct);
}

export async function fetchMyStore(userId: string): Promise<Store | null> {
  const { data } = await supabase.from("stores").select("*").eq("owner_id", userId).maybeSingle();
  return (data as Store | null) ?? null;
}

export async function fetchMyProducts(storeId: string): Promise<DbProduct[]> {
  const { data } = await supabase.from("products").select("*").eq("store_id", storeId).order("created_at", { ascending: false });
  return (data as DbProduct[] | null) ?? [];
}

export type SellerOrderRow = {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  status: string;
  orders: { reference: string; full_name: string; city: string; payment_status: string; created_at: string } | null;
};

export async function fetchSellerOrders(storeId: string): Promise<SellerOrderRow[]> {
  const { data } = await supabase
    .from("order_items")
    .select("id, name, quantity, unit_price, status, orders(reference, full_name, city, payment_status, created_at)")
    .eq("store_id", storeId);
  return (data as unknown as SellerOrderRow[] | null) ?? [];
}

export type MyOrder = {
  id: string;
  reference: string;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
  order_items: Array<{ name: string; quantity: number; unit_price: number }>;
};

export async function fetchMyOrders(userId: string): Promise<MyOrder[]> {
  const { data } = await supabase
    .from("orders")
    .select("id, reference, total, status, payment_status, payment_method, created_at, order_items(name, quantity, unit_price)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as unknown as MyOrder[] | null) ?? [];
}

export async function fetchOrderByReference(reference: string): Promise<MyOrder | null> {
  const { data } = await supabase
    .from("orders")
    .select("id, reference, total, status, payment_status, payment_method, created_at, order_items(name, quantity, unit_price)")
    .eq("reference", reference)
    .maybeSingle();
  return (data as unknown as MyOrder | null) ?? null;
}
