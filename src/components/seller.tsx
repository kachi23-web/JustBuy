import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Box, ImagePlus, LayoutDashboard, Package, Plus, Store, Trash2, TrendingUp, Truck, Wallet } from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { categories, formatNaira } from "../lib/catalog";
import { useShop } from "../lib/shop-context";
import { useAuth } from "../lib/auth";
import { fetchMyProducts, fetchMyStore, fetchSellerOrders, type DbProduct, type SellerOrderRow, type Store as SellerStore } from "../lib/db";
import { supabase } from "@/integrations/supabase/client";
import fallbackImage from "../assets/product-phone.jpg";

const wrap = "mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 md:py-16";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-brand-foreground transition hover:bg-brand/85 active:scale-[.98] disabled:opacity-60";
const secondary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-bold transition hover:bg-surface-muted active:scale-[.98]";
const field = "h-13 w-full rounded-2xl border border-transparent bg-surface-muted px-4 outline-none focus:border-brand-strong";

function Field({ label, name, placeholder, type = "text", required = true, defaultValue }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean; defaultValue?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className={field} /></label>;
}
function Select({ label, name, options, defaultValue }: { label: string; name: string; options: string[]; defaultValue?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><select name={name} defaultValue={defaultValue} className={field}>{options.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

const cities = ["Awka", "Onitsha", "Enugu", "Owerri", "Aba", "Abakaliki"];

/** Loads the signed-in user's store once the session is known. */
function useSellerStore() {
  const { user, loading } = useAuth();
  const [store, setStore] = useState<SellerStore | null>(null);
  const [busy, setBusy] = useState(true);
  const reload = useCallback(async () => {
    if (!user) { setStore(null); setBusy(false); return; }
    setStore(await fetchMyStore(user.id));
    setBusy(false);
  }, [user]);
  useEffect(() => { if (!loading) void reload(); }, [loading, reload]);
  return { store, loading: loading || busy, reload, user };
}

export function SellerRegisterPage() {
  const navigate = useNavigate();
  const { user, store, loading } = useSellerStore();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (store) void navigate({ to: "/seller/dashboard" }); }, [store, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      let ownerId = user?.id;
      if (!ownerId) {
        const { data: signUp, error: signUpError } = await supabase.auth.signUp({
          email: String(data.get("email") ?? ""),
          password: String(data.get("password") ?? ""),
          options: { emailRedirectTo: `${window.location.origin}/seller/dashboard`, data: { full_name: String(data.get("owner") ?? "") } },
        });
        if (signUpError) throw signUpError;
        ownerId = signUp.user?.id;
        if (!signUp.session) { setError("Check your inbox to confirm your email, then sign in to finish opening your store."); setBusy(false); return; }
      }
      const { error: storeError } = await supabase.from("stores").insert({
        owner_id: ownerId!,
        name: String(data.get("store") ?? "My Store"),
        owner_name: String(data.get("owner") ?? ""),
        phone: String(data.get("phone") ?? ""),
        city: String(data.get("city") ?? "Awka"),
        category: String(data.get("category") ?? categories[0]),
      });
      if (storeError) throw storeError;
      void navigate({ to: "/seller/dashboard" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  };

  return <div className={wrap}>
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
      <div className="self-center">
        <p className="text-xs font-bold uppercase text-brand-strong">Sell on JustBay</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Put your shop in front of Eastern Nigeria.</h1>
        <p className="mt-5 max-w-lg text-muted-foreground">Open a store, publish your products and start receiving orders from buyers in Awka, Onitsha, Enugu, Owerri and Aba.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[[Store, "Free store page"], [BadgeCheck, "Verified badge"], [Truck, "Local delivery"]].map(([Icon, label]) => {
            const I = Icon as typeof Store;
            return <div key={String(label)} className="rounded-[1.5rem] bg-surface p-5"><I className="mb-6 size-5 text-brand-strong" /><b className="text-sm">{String(label)}</b></div>;
          })}
        </div>
      </div>
      <form onSubmit={submit} className="rounded-[2rem] bg-surface p-6 md:p-9">
        <h2 className="font-display text-2xl font-bold">Create your seller account</h2>
        <p className="mt-2 text-sm text-muted-foreground">{user ? "Add your store details to start selling." : "Your store, products and orders are saved to your account."}</p>
        <div className="mt-7 space-y-4">
          <Field label="Store name" name="store" placeholder="Kamsi Mobile Hub" />
          <Field label="Your name" name="owner" placeholder="Chinedu Okafor" />
          {!user && <Field label="Email" name="email" type="email" placeholder="you@email.com" />}
          {!user && <Field label="Password" name="password" type="password" placeholder="At least 6 characters" />}
          <Field label="Phone number" name="phone" placeholder="0800 000 0000" />
          <Select label="City" name="city" options={cities} />
          <Select label="Main category" name="category" options={categories} />
        </div>
        {error && <p className="mt-4 text-sm font-semibold text-error">{error}</p>}
        <button disabled={busy || loading} className={`${primary} mt-7 w-full`}>{busy ? "Opening your store…" : "Open my store"} <ArrowRight className="size-4" /></button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Already selling? <Link to="/login" className="font-bold underline">Sign in</Link></p>
      </form>
    </div>
  </div>;
}

function SellerShell({ title, storeName, action, children }: { title: string; storeName?: string | undefined; action?: ReactNode; children: ReactNode }) {
  const nav = [[LayoutDashboard, "Dashboard", "/seller/dashboard"], [Plus, "Add product", "/seller/products/new"], [Package, "Orders", "/seller/orders"]] as const;
  return <div className={wrap}>
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0"><p className="text-xs font-bold uppercase text-brand-strong">{storeName ?? "JustBay seller"}</p><h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{title}</h1></div>
      {action}
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="h-fit rounded-[1.5rem] bg-surface p-3">
        {nav.map(([Icon, label, to]) => <Link key={to} to={to} activeProps={{ className: "bg-surface-muted" }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-surface-muted"><Icon className="size-4" />{label}</Link>)}
        <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-surface-muted"><Store className="size-4" />View storefront</Link>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  </div>;
}

function NoStoreNotice({ signedIn }: { signedIn: boolean }) {
  return <div className="rounded-[2rem] bg-surface p-10 text-center">
    <Store className="mx-auto size-8 text-muted-foreground" />
    <h2 className="mt-4 font-display text-xl font-bold">{signedIn ? "You haven't opened a store yet" : "Sign in to manage your store"}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{signedIn ? "Set up your store to publish products and receive orders." : "Your store, products and orders are saved to your JustBay account."}</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Link to="/sell" className={primary}>Open my store</Link>
      {!signedIn && <Link to="/login" className={secondary}>Sign in</Link>}
    </div>
  </div>;
}

export function SellerDashboardPage() {
  const { store, loading, user } = useSellerStore();
  const { refreshCatalog } = useShop();
  const [items, setItems] = useState<DbProduct[]>([]);
  const [orders, setOrders] = useState<SellerOrderRow[]>([]);

  const load = useCallback(async (storeId: string) => {
    const [productRows, orderRows] = await Promise.all([fetchMyProducts(storeId), fetchSellerOrders(storeId)]);
    setItems(productRows); setOrders(orderRows);
  }, []);
  useEffect(() => { if (store) void load(store.id); }, [store, load]);

  const remove = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setItems((current) => current.filter((item) => item.id !== id));
    void refreshCatalog();
  };

  const earnings = orders.filter((row) => row.orders?.payment_status === "paid").reduce((sum, row) => sum + row.unit_price * row.quantity, 0);
  const stats: Array<[typeof Wallet, string, string]> = [
    [Wallet, formatNaira(earnings), "Paid earnings"],
    [Package, String(orders.length), "Orders received"],
    [Box, String(items.length), "Live listings"],
    [TrendingUp, store ? store.rating.toFixed(1) : "—", "Store rating"],
  ];

  if (loading) return <SellerShell title="Store dashboard"><p className="text-sm text-muted-foreground">Loading your store…</p></SellerShell>;
  if (!store) return <SellerShell title="Store dashboard"><NoStoreNotice signedIn={Boolean(user)} /></SellerShell>;

  return <SellerShell title="Store dashboard" storeName={store.name} action={<Link to="/seller/products/new" className={primary}><Plus className="size-4" /> Add product</Link>}>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([Icon, value, label]) => <div key={label} className="rounded-[1.5rem] bg-surface p-6"><Icon className="size-5 text-brand-strong" /><p className="mt-6 font-display text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>)}
    </div>
    <h2 className="mb-4 mt-10 font-display text-2xl font-bold">Your listings</h2>
    {items.length ? <div className="space-y-3">{items.map((product) => <article key={product.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 rounded-[1.5rem] bg-surface p-4">
      <img src={product.image_url || fallbackImage} alt={product.name} width={128} height={128} className="aspect-square rounded-2xl object-cover" />
      <div className="min-w-0"><Link to="/product/$id" params={{ id: product.id }} className="truncate font-display font-bold">{product.name}</Link><p className="text-xs text-muted-foreground">{product.category} · {product.city} · {formatNaira(product.price)} · {product.stock} in stock</p></div>
      <button onClick={() => void remove(product.id)} aria-label={`Remove ${product.name}`} className="grid size-11 place-items-center rounded-full border border-border"><Trash2 className="size-4" /></button>
    </article>)}</div> : <div className="rounded-[2rem] bg-surface p-10 text-center"><Box className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-4 font-display text-xl font-bold">No products yet</h3><p className="mt-2 text-sm text-muted-foreground">Add your first product and it appears in the shop straight away.</p><Link to="/seller/products/new" className={`${primary} mt-6`}>Add your first product</Link></div>}
    <h2 className="mb-4 mt-10 font-display text-2xl font-bold">Recent orders</h2>
    <OrdersTable rows={orders.slice(0, 3)} />
  </SellerShell>;
}

export function AddProductPage() {
  const { store, loading, user } = useSellerStore();
  const { refreshCatalog } = useShop();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>(fallbackImage);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!store) return;
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    const price = Number(data.get("price") ?? 0);
    const oldPrice = Number(data.get("oldPrice") ?? 0);
    const imageLink = String(data.get("image") ?? "").trim();
    const { error: insertError } = await supabase.from("products").insert({
      store_id: store.id,
      name: String(data.get("name") ?? "New product"),
      category: String(data.get("category") ?? categories[0]),
      description: String(data.get("description") ?? ""),
      price,
      old_price: oldPrice > price ? oldPrice : null,
      city: String(data.get("city") ?? store.city),
      image_url: imageLink || null,
      delivery: String(data.get("delivery") ?? "Delivery in 2–4 days"),
      stock: Number(data.get("stock") ?? 1),
    });
    setBusy(false);
    if (insertError) { setError(insertError.message); return; }
    await refreshCatalog();
    void navigate({ to: "/seller/dashboard" });
  };

  if (loading) return <SellerShell title="Add a product"><p className="text-sm text-muted-foreground">Loading your store…</p></SellerShell>;
  if (!store) return <SellerShell title="Add a product"><NoStoreNotice signedIn={Boolean(user)} /></SellerShell>;

  return <SellerShell title="Add a product" storeName={store.name}>
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5 rounded-[2rem] bg-surface p-5 md:p-8">
        <Field label="Product name" name="name" placeholder="Ora X 5G Smartphone" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" name="category" options={categories} />
          <Select label="City" name="city" options={cities} defaultValue={store.city} />
          <Field label="Price (₦)" name="price" type="number" placeholder="45000" />
          <Field label="Old price (₦, optional)" name="oldPrice" type="number" placeholder="56000" required={false} />
          <Field label="Units in stock" name="stock" type="number" defaultValue="10" />
          <Field label="Delivery estimate" name="delivery" placeholder="Delivery by Friday" />
        </div>
        <Field label="Image link (optional)" name="image" placeholder="https://…" required={false} />
        <label className="block"><span className="mb-2 block text-sm font-semibold">Description</span><textarea name="description" className="min-h-28 w-full rounded-2xl bg-surface-muted p-4 outline-none" placeholder="Tell buyers what makes this product worth it." /></label>
        {error && <p className="text-sm font-semibold text-error">{error}</p>}
      </div>
      <aside className="h-fit space-y-4 rounded-[2rem] bg-surface p-5 md:p-7">
        <h2 className="font-display text-xl font-bold">Product photo</h2>
        <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-surface-muted"><img src={preview} alt="Product preview" className="h-full w-full object-cover" /></div>
        <label className={`${secondary} w-full cursor-pointer`}><ImagePlus className="size-4" /> Preview a photo
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
        </label>
        <p className="text-xs text-muted-foreground">Paste an image link to publish the photo with your listing.</p>
        <button disabled={busy} className={`${primary} w-full`}>{busy ? "Publishing…" : "Publish product"} <ArrowRight className="size-4" /></button>
      </aside>
    </form>
  </SellerShell>;
}

const statusOptions = ["Processing", "Ready for pickup", "Out for delivery", "Delivered"];

function OrdersTable({ rows, onStatus }: { rows: SellerOrderRow[]; onStatus?: (id: string, status: string) => void }) {
  if (!rows.length) return <div className="rounded-[2rem] bg-surface p-10 text-center"><Package className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-4 font-display text-xl font-bold">No orders yet</h3><p className="mt-2 text-sm text-muted-foreground">Orders from buyers will show up here as soon as they check out.</p></div>;
  return <div className="space-y-3">{rows.map((row) => <article key={row.id} className="grid gap-3 rounded-[1.5rem] bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
    <div className="min-w-0"><p className="text-xs text-muted-foreground">Order {row.orders?.reference ?? "—"} · {row.orders?.full_name ?? "Buyer"} · {row.orders?.city ?? ""}</p><b className="mt-1 block truncate font-display">{row.name} × {row.quantity}</b><p className="mt-1 text-sm">{formatNaira(row.unit_price * row.quantity)} · Payment {row.orders?.payment_status ?? "pending"}</p></div>
    {onStatus
      ? <label className="justify-self-start"><span className="sr-only">Order status</span><select value={row.status} onChange={(event) => onStatus(row.id, event.target.value)} className="h-11 rounded-full bg-surface-muted px-4 text-xs font-bold">{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
      : <span className={`justify-self-start rounded-full px-4 py-1.5 text-xs font-bold ${row.status === "Delivered" ? "bg-surface-muted text-muted-foreground" : row.status === "Processing" ? "bg-brand/25" : "bg-accent/15 text-accent"}`}>{row.status}</span>}
  </article>)}</div>;
}

export function SellerOrdersPage() {
  const { store, loading, user } = useSellerStore();
  const [rows, setRows] = useState<SellerOrderRow[]>([]);
  useEffect(() => { if (store) void fetchSellerOrders(store.id).then(setRows); }, [store]);

  const setStatus = async (id: string, status: string) => {
    setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
    await supabase.from("order_items").update({ status }).eq("id", id);
  };

  if (loading) return <SellerShell title="Orders"><p className="text-sm text-muted-foreground">Loading your orders…</p></SellerShell>;
  if (!store) return <SellerShell title="Orders"><NoStoreNotice signedIn={Boolean(user)} /></SellerShell>;

  const counts = statusOptions.map((status) => [String(rows.filter((row) => row.status === status).length), status] as const);
  return <SellerShell title="Orders" storeName={store.name}>
    <div className="mb-6 grid gap-3 sm:grid-cols-4">{counts.map(([value, label]) => <div key={label} className="rounded-[1.5rem] bg-surface p-5"><p className="font-display text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>)}</div>
    <OrdersTable rows={rows} onStatus={(id, status) => void setStatus(id, status)} />
  </SellerShell>;
}
