import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Box, ImagePlus, LayoutDashboard, Package, Plus, Store, Trash2, TrendingUp, Truck, Wallet } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { categories, formatNaira } from "../lib/catalog";
import { useShop } from "../lib/shop-context";
import fallbackImage from "../assets/product-phone.jpg";

const wrap = "mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 md:py-16";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-brand-foreground transition hover:bg-brand/85 active:scale-[.98]";
const secondary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-bold transition hover:bg-surface-muted active:scale-[.98]";
const field = "h-13 w-full rounded-2xl border border-transparent bg-surface-muted px-4 outline-none focus:border-brand-strong";

function Field({ label, name, placeholder, type = "text", required = true, defaultValue }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean; defaultValue?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><input name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder} className={field} /></label>;
}
function Select({ label, name, options, defaultValue }: { label: string; name: string; options: string[]; defaultValue?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span><select name={name} defaultValue={defaultValue} className={field}>{options.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

const cities = ["Awka", "Onitsha", "Enugu", "Owerri", "Aba", "Abakaliki"];

export function SellerRegisterPage() {
  const { registerSeller } = useShop();
  const navigate = useNavigate();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    registerSeller({
      store: String(data.get("store") ?? "My Store"),
      owner: String(data.get("owner") ?? ""),
      phone: String(data.get("phone") ?? ""),
      city: String(data.get("city") ?? "Awka"),
      category: String(data.get("category") ?? categories[0]),
    });
    void navigate({ to: "/seller/dashboard" });
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
        <p className="mt-2 text-sm text-muted-foreground">Demo registration — details stay in this browser session.</p>
        <div className="mt-7 space-y-4">
          <Field label="Store name" name="store" placeholder="Kamsi Mobile Hub" />
          <Field label="Your name" name="owner" placeholder="Chinedu Okafor" />
          <Field label="Phone number" name="phone" placeholder="0800 000 0000" />
          <Select label="City" name="city" options={cities} />
          <Select label="Main category" name="category" options={categories} />
        </div>
        <button className={`${primary} mt-7 w-full`}>Open my store <ArrowRight className="size-4" /></button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Already selling? <Link to="/seller/dashboard" className="font-bold underline">Go to dashboard</Link></p>
      </form>
    </div>
  </div>;
}

function SellerShell({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  const { seller } = useShop();
  const nav = [[LayoutDashboard, "Dashboard", "/seller/dashboard"], [Plus, "Add product", "/seller/products/new"], [Package, "Orders", "/seller/orders"]] as const;
  return <div className={wrap}>
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0"><p className="text-xs font-bold uppercase text-brand-strong">{seller ? seller.store : "JustBay seller"}</p><h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{title}</h1></div>
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

const demoOrders = [
  { id: "JB-24118", buyer: "Ifeoma Chukwu", item: "Golden Harvest Parboiled Rice 10kg", city: "Awka", total: 32500, status: "Processing" },
  { id: "JB-24115", buyer: "Obinna Eze", item: "18\" Rechargeable Standing Fan", city: "Owerri", total: 68500, status: "Out for delivery" },
  { id: "JB-24109", buyer: "Emeka Obi", item: "ZenBook Slim Core i5 Laptop", city: "Onitsha", total: 745000, status: "Processing" },
  { id: "JB-24104", buyer: "Uchenna Nnaji", item: "Aba Leather Tote Handbag", city: "Aba", total: 27500, status: "Delivered" },
  { id: "JB-24091", buyer: "Chinedu Okafor", item: "Airwave Pro Headphones", city: "Awka", total: 45000, status: "Processing" },
  { id: "JB-24088", buyer: "Adaeze Nwosu", item: "Daily Glow Skincare Set", city: "Enugu", total: 24500, status: "Out for delivery" },
  { id: "JB-24080", buyer: "Emeka Obi", item: "Everyday Court Sneakers", city: "Onitsha", total: 38500, status: "Delivered" },
];

export function SellerDashboardPage() {
  const { listings, removeListing, seller } = useShop();
  const stats: Array<[typeof Wallet, string, string]> = [
    [Wallet, formatNaira(486300), "Earnings this week"],
    [Package, String(demoOrders.length), "Orders received"],
    [Box, String(listings.length), "Live listings"],
    [TrendingUp, "4.8", "Store rating"],
  ];
  return <SellerShell title="Store dashboard" action={<Link to="/seller/products/new" className={primary}><Plus className="size-4" /> Add product</Link>}>
    {!seller && <div className="mb-6 rounded-[1.5rem] border border-border bg-surface p-5 text-sm">You haven't set up a store yet. <Link to="/sell" className="font-bold underline">Register as a seller</Link> to personalise this dashboard.</div>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([Icon, value, label]) => <div key={label} className="rounded-[1.5rem] bg-surface p-6"><Icon className="size-5 text-brand-strong" /><p className="mt-6 font-display text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>)}
    </div>
    <h2 className="mb-4 mt-10 font-display text-2xl font-bold">Your listings</h2>
    {listings.length ? <div className="space-y-3">{listings.map((product) => <article key={product.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 rounded-[1.5rem] bg-surface p-4">
      <img src={product.image} alt={product.name} width={128} height={128} className="aspect-square rounded-2xl object-cover" />
      <div className="min-w-0"><Link to="/product/$id" params={{ id: product.id }} className="truncate font-display font-bold">{product.name}</Link><p className="text-xs text-muted-foreground">{product.category} · {product.city} · {formatNaira(product.price)}</p></div>
      <button onClick={() => removeListing(product.id)} aria-label={`Remove ${product.name}`} className="grid size-11 place-items-center rounded-full border border-border"><Trash2 className="size-4" /></button>
    </article>)}</div> : <div className="rounded-[2rem] bg-surface p-10 text-center"><Box className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-4 font-display text-xl font-bold">No products yet</h3><p className="mt-2 text-sm text-muted-foreground">Add your first product and it appears in the shop straight away.</p><Link to="/seller/products/new" className={`${primary} mt-6`}>Add your first product</Link></div>}
    <h2 className="mb-4 mt-10 font-display text-2xl font-bold">Recent orders</h2>
    <OrdersTable limit={2} />
  </SellerShell>;
}

export function AddProductPage() {
  const { addListing, seller } = useShop();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>(fallbackImage);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "New product");
    const price = Number(data.get("price") ?? 0);
    const oldPrice = Number(data.get("oldPrice") ?? 0);
    addListing({
      id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`,
      name,
      category: String(data.get("category") ?? categories[0]),
      price,
      ...(oldPrice > price ? { oldPrice } : {}),
      rating: 5,
      reviews: 0,
      seller: seller?.store ?? "My JustBay Store",
      city: String(data.get("city") ?? seller?.city ?? "Awka"),
      image: preview,
      delivery: String(data.get("delivery") ?? "Delivery in 2–4 days"),
      badge: "NEW",
    });
    void navigate({ to: "/seller/dashboard" });
  };
  return <SellerShell title="Add a product">
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5 rounded-[2rem] bg-surface p-5 md:p-8">
        <Field label="Product name" name="name" placeholder="Ora X 5G Smartphone" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Category" name="category" options={categories} />
          <Select label="City" name="city" options={cities} defaultValue={seller?.city ?? "Awka"} />
          <Field label="Price (₦)" name="price" type="number" placeholder="45000" />
          <Field label="Old price (₦, optional)" name="oldPrice" type="number" placeholder="56000" required={false} />
          <Field label="Delivery estimate" name="delivery" placeholder="Delivery by Friday" />
          <Field label="Image link (optional)" name="image" placeholder="https://…" required={false} />
        </div>
        <label className="block"><span className="mb-2 block text-sm font-semibold">Description</span><textarea name="description" className="min-h-28 w-full rounded-2xl bg-surface-muted p-4 outline-none" placeholder="Tell buyers what makes this product worth it." /></label>
        <p className="text-xs text-muted-foreground">Demo listing — it stays in this browser session and shows up in the shop alongside the sample catalogue.</p>
      </div>
      <aside className="h-fit space-y-4 rounded-[2rem] bg-surface p-5 md:p-7">
        <h2 className="font-display text-xl font-bold">Product photo</h2>
        <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-surface-muted"><img src={preview} alt="Product preview" className="h-full w-full object-cover" /></div>
        <label className={`${secondary} w-full cursor-pointer`}><ImagePlus className="size-4" /> Upload photo
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); }} />
        </label>
        <button className={`${primary} w-full`}>Publish product <ArrowRight className="size-4" /></button>
      </aside>
    </form>
  </SellerShell>;
}

function OrdersTable({ limit }: { limit?: number }) {
  const rows = limit ? demoOrders.slice(0, limit) : demoOrders;
  return <div className="space-y-3">{rows.map((order) => <article key={order.id} className="grid gap-3 rounded-[1.5rem] bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
    <div className="min-w-0"><p className="text-xs text-muted-foreground">Order {order.id} · {order.buyer} · {order.city}</p><b className="mt-1 block truncate font-display">{order.item}</b><p className="mt-1 text-sm">{formatNaira(order.total)}</p></div>
    <span className={`justify-self-start rounded-full px-4 py-1.5 text-xs font-bold ${order.status === "Delivered" ? "bg-surface-muted text-muted-foreground" : order.status === "Processing" ? "bg-brand/25" : "bg-accent/15 text-accent"}`}>{order.status}</span>
  </article>)}</div>;
}

export function SellerOrdersPage() {
  return <SellerShell title="Orders">
    <div className="mb-6 grid gap-3 sm:grid-cols-3">{[["1", "Processing"], ["1", "Out for delivery"], ["1", "Delivered"]].map(([value, label]) => <div key={label} className="rounded-[1.5rem] bg-surface p-5"><p className="font-display text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>)}</div>
    <OrdersTable />
    <p className="mt-6 text-xs text-muted-foreground">Sample orders for the demo — no real buyers or payments are involved.</p>
  </SellerShell>;
}
