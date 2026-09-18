import { Link } from "@tanstack/react-router";
import { BadgeCheck, Box, LayoutDashboard, Package, ShieldCheck, Store, TrendingUp, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import { formatNaira } from "../lib/catalog";
import { useCatalog } from "../lib/shop-context";

const wrap = "mx-auto w-full max-w-[1440px] px-4 py-10 md:px-8 md:py-16";
const card = "rounded-[1.5rem] bg-surface p-6";

function AdminShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const nav = [[LayoutDashboard, "Overview", "/admin"], [Users, "Users", "/admin/users"], [Store, "Sellers", "/admin/sellers"], [Box, "Products", "/admin/products"], [Package, "Orders", "/admin/orders"]] as const;
  return <div className={wrap}>
    <p className="text-xs font-bold uppercase text-brand-strong">JustBay admin</p>
    <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{title}</h1>
    <p className="mt-3 max-w-xl text-muted-foreground">{subtitle}</p>
    <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="h-fit rounded-[1.5rem] bg-surface p-3">
        {nav.map(([Icon, label, to]) => <Link key={to} to={to} activeOptions={{ exact: to === "/admin" }} activeProps={{ className: "bg-surface-muted" }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-surface-muted"><Icon className="size-4" />{label}</Link>)}
        <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-surface-muted"><Store className="size-4" />View storefront</Link>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
    <p className="mt-10 text-xs text-muted-foreground">Demo control room — figures and records are sample data only.</p>
  </div>;
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return <div className="overflow-x-auto rounded-[1.5rem] bg-surface">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead><tr className="border-b border-border text-xs uppercase text-muted-foreground">{head.map((item) => <th key={item} className="px-5 py-4 font-bold">{item}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index} className="border-b border-border/60 last:border-0">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-5 py-4">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

function Pill({ label, tone = "neutral" }: { label: string; tone?: "good" | "warn" | "neutral" }) {
  const tones = { good: "bg-brand/25", warn: "bg-accent/15 text-accent", neutral: "bg-surface-muted text-muted-foreground" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}>{label}</span>;
}

const users = [
  { name: "Chinedu Okafor", city: "Awka", joined: "12 Sep 2026", orders: 4, status: "Active" },
  { name: "Adaeze Nwosu", city: "Enugu", joined: "08 Sep 2026", orders: 2, status: "Active" },
  { name: "Emeka Obi", city: "Onitsha", joined: "01 Sep 2026", orders: 7, status: "Active" },
  { name: "Ifeoma Chukwu", city: "Awka", joined: "30 Aug 2026", orders: 11, status: "Active" },
  { name: "Uchenna Nnaji", city: "Aba", joined: "24 Aug 2026", orders: 3, status: "Active" },
  { name: "Blessing Agu", city: "Abakaliki", joined: "19 Aug 2026", orders: 5, status: "Active" },
  { name: "Obinna Eze", city: "Owerri", joined: "11 Aug 2026", orders: 9, status: "Active" },
  { name: "Ngozi Eze", city: "Owerri", joined: "27 Aug 2026", orders: 0, status: "Suspended" },
];
const sellers = [
  { store: "ABC Electronics", city: "Awka", products: 120, rating: 4.9, status: "Verified" },
  { store: "Kamsi Mobile Hub", city: "Awka", products: 98, rating: 4.8, status: "Verified" },
  { store: "Eke Awka Foodstuff", city: "Awka", products: 74, rating: 4.8, status: "Verified" },
  { store: "Nwaanyị Styles", city: "Onitsha", products: 86, rating: 4.8, status: "Verified" },
  { store: "Ogbunike Computers", city: "Onitsha", products: 52, rating: 4.7, status: "Verified" },
  { store: "Obosi Fresh Market", city: "Onitsha", products: 63, rating: 4.9, status: "Verified" },
  { store: "Amara Beauty Room", city: "Enugu", products: 64, rating: 4.7, status: "Verified" },
  { store: "Coal City Electronics", city: "Enugu", products: 41, rating: 4.6, status: "Verified" },
  { store: "Owerri Home Centre", city: "Owerri", products: 57, rating: 4.7, status: "Verified" },
  { store: "Chidera Naturals", city: "Owerri", products: 29, rating: 4.9, status: "Verified" },
  { store: "Ariaria Leather Works", city: "Aba", products: 44, rating: 4.8, status: "Verified" },
  { store: "Aba Footwear Co.", city: "Aba", products: 31, rating: 4.5, status: "Pending review" },
  { store: "Abakaliki Home Store", city: "Abakaliki", products: 22, rating: 4.4, status: "Pending review" },
];
const orders = [
  { id: "JB-24118", buyer: "Ifeoma Chukwu", seller: "Eke Awka Foodstuff", total: 32500, status: "Processing" },
  { id: "JB-24115", buyer: "Obinna Eze", seller: "Owerri Home Centre", total: 68500, status: "Out for delivery" },
  { id: "JB-24109", buyer: "Emeka Obi", seller: "Ogbunike Computers", total: 745000, status: "Processing" },
  { id: "JB-24104", buyer: "Uchenna Nnaji", seller: "Ariaria Leather Works", total: 27500, status: "Delivered" },
  { id: "JB-24098", buyer: "Blessing Agu", seller: "Coal City Electronics", total: 268000, status: "Out for delivery" },
  { id: "JB-24091", buyer: "Chinedu Okafor", seller: "ABC Electronics", total: 45000, status: "Processing" },
  { id: "JB-24088", buyer: "Adaeze Nwosu", seller: "Amara Beauty Room", total: 24500, status: "Out for delivery" },
  { id: "JB-24080", buyer: "Emeka Obi", seller: "Nwaanyị Styles", total: 38500, status: "Delivered" },
  { id: "JB-24076", buyer: "Ifeoma Chukwu", seller: "Chidera Naturals", total: 8900, status: "Delivered" },
  { id: "JB-24075", buyer: "Ngozi Eze", seller: "Owerri Device Store", total: 198000, status: "Refund requested" },
];

export function AdminDashboardPage() {
  const catalog = useCatalog();
  const stats: Array<[typeof Wallet, string, string]> = [
    [Wallet, formatNaira(3480000), "Marketplace sales (30 days)"],
    [Users, String(users.length * 312), "Registered shoppers"],
    [Store, String(sellers.length), "Active sellers"],
    [Box, String(catalog.length), "Live products"],
  ];
  return <AdminShell title="Marketplace overview" subtitle="Track growth, sellers and orders across Eastern Nigeria.">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([Icon, value, label]) => <div key={label} className={card}><Icon className="size-5 text-brand-strong" /><p className="mt-6 font-display text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>)}</div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className={card}><TrendingUp className="size-5 text-brand-strong" /><h2 className="mt-5 font-display text-xl font-bold">Top cities</h2><ul className="mt-4 space-y-3 text-sm">{[["Awka", "38%"], ["Onitsha", "24%"], ["Enugu", "19%"], ["Owerri", "12%"], ["Aba", "7%"]].map(([city, share]) => <li key={city}><div className="flex justify-between"><span>{city}</span><b>{share}</b></div><div className="mt-1 h-2 rounded-full bg-surface-muted"><div className="h-2 rounded-full bg-brand" style={{ width: share }} /></div></li>)}</ul></div>
      <div className={card}><ShieldCheck className="size-5 text-brand-strong" /><h2 className="mt-5 font-display text-xl font-bold">Needs attention</h2><ul className="mt-4 space-y-3 text-sm"><li className="flex items-center justify-between">1 seller awaiting verification <Link to="/admin/sellers" className="font-bold underline">Review</Link></li><li className="flex items-center justify-between">1 refund requested <Link to="/admin/orders" className="font-bold underline">Open</Link></li><li className="flex items-center justify-between">1 suspended shopper <Link to="/admin/users" className="font-bold underline">View</Link></li></ul></div>
    </div>
    <h2 className="mb-4 mt-10 font-display text-2xl font-bold">Latest orders</h2>
    <Table head={["Order", "Buyer", "Seller", "Total", "Status"]} rows={orders.slice(0, 3).map((order) => [order.id, order.buyer, order.seller, formatNaira(order.total), <Pill key={order.id} label={order.status} tone={order.status === "Delivered" ? "neutral" : order.status === "Processing" ? "good" : "warn"} />])} />
  </AdminShell>;
}

export function AdminUsersPage() {
  return <AdminShell title="Shoppers" subtitle="Everyone buying on JustBay, with their activity at a glance.">
    <Table head={["Name", "City", "Joined", "Orders", "Status"]} rows={users.map((user) => [user.name, user.city, user.joined, String(user.orders), <Pill key={user.name} label={user.status} tone={user.status === "Active" ? "good" : "warn"} />])} />
  </AdminShell>;
}

export function AdminSellersPage() {
  return <AdminShell title="Sellers" subtitle="Approve new stores and keep verified sellers in good standing.">
    <Table head={["Store", "City", "Products", "Rating", "Status"]} rows={sellers.map((seller) => [<span key={seller.store} className="flex items-center gap-2 font-bold">{seller.store}{seller.status === "Verified" && <BadgeCheck className="size-4 text-success" />}</span>, seller.city, String(seller.products), String(seller.rating), <Pill key={`${seller.store}-status`} label={seller.status} tone={seller.status === "Verified" ? "good" : "warn"} />])} />
  </AdminShell>;
}

export function AdminProductsPage() {
  const catalog = useCatalog();
  return <AdminShell title="Products" subtitle="Every listing on the marketplace, including new seller submissions.">
    <Table head={["Product", "Category", "Seller", "City", "Price"]} rows={catalog.map((product) => [<Link key={product.id} to="/product/$id" params={{ id: product.id }} className="font-bold underline">{product.name}</Link>, product.category, product.seller, product.city, formatNaira(product.price)])} />
  </AdminShell>;
}

export function AdminOrdersPage() {
  return <AdminShell title="Orders" subtitle="Follow marketplace orders and step in when something needs help.">
    <Table head={["Order", "Buyer", "Seller", "Total", "Status"]} rows={orders.map((order) => [order.id, order.buyer, order.seller, formatNaira(order.total), <Pill key={order.id} label={order.status} tone={order.status === "Delivered" ? "neutral" : order.status === "Processing" ? "good" : "warn"} />])} />
  </AdminShell>;
}
