import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Heart, MapPin, Search, ShoppingBag, Star, type LucideIcon } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { formatNaira, type Product } from "../lib/catalog";
import { useShop } from "../lib/shop-context";

export function Logo() {
  return <Link to="/" className="font-display text-2xl font-extrabold text-foreground">Just<span className="text-brand-strong">Bay</span></Link>;
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submit = (event: FormEvent) => { event.preventDefault(); void navigate({ to: "/search", search: { q: query || "all" } }); };
  return <form onSubmit={submit} className={`flex items-center rounded-full bg-surface-muted ring-1 ring-border focus-within:ring-2 focus-within:ring-brand ${compact ? "h-11" : "h-14"}`}>
    <Search className="ml-4 size-5 shrink-0 text-muted-foreground" />
    <input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="What are you looking for today?" />
    <button aria-label="Submit search" className="mr-1 grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background"><ArrowRight className="size-4" /></button>
  </form>;
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
    <div className="min-w-0">{eyebrow && <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">{eyebrow}</p>}<h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2></div>{action}
  </div>;
}

export function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
  const { wishlist, toggleWishlist } = useShop();
  const saved = wishlist.includes(product.id);
  return <article className={`group min-w-0 ${dark ? "text-dark-foreground" : "text-foreground"}`}>
    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-surface-muted">
      <Link to="/product/$id" params={{ id: product.id }} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" width={768} height={768} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></Link>
      {product.badge && <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-[11px] font-extrabold text-brand-foreground">{product.badge}</span>}
      <button onClick={() => toggleWishlist(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-surface/85 shadow-soft backdrop-blur"><Heart className={`size-4 ${saved ? "fill-accent text-accent" : "text-foreground"}`} /></button>
    </div>
    <div className="pt-4"><p className="mb-1 text-xs text-muted-foreground">{product.category} · {product.city}</p><Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 font-display font-bold leading-snug">{product.name}</Link>
      <div className="mt-2 flex items-center gap-1 text-xs"><Star className="size-3.5 fill-warning text-warning" /><b>{product.rating}</b><span className="text-muted-foreground">({product.reviews})</span></div>
      <div className="mt-3 flex flex-wrap items-baseline gap-2"><b className="font-display text-lg">{formatNaira(product.price)}</b>{product.oldPrice && <span className="text-xs text-muted-foreground line-through">{formatNaira(product.oldPrice)}</span>}</div>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground"><BadgeCheck className="size-3.5 text-success" /> Verified · {product.delivery}</p>
    </div>
  </article>;
}

export function TrustStrip() {
  const items: Array<[LucideIcon, string, string]> = [
    [BadgeCheck, "Trusted sellers", "Every featured store is verified"], [ShoppingBag, "Buyer protection", "Shop with confidence on every order"], [MapPin, "Local delivery", "Clear estimates across the South East"],
  ];
  return <section className="grid gap-px overflow-hidden rounded-[2rem] bg-border md:grid-cols-3">{items.map(([Icon, title, copy]) => <div key={title} className="bg-surface p-7"><Icon className="mb-6 size-6 text-brand-strong" /><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{copy}</p></div>)}</section>;
}

const wrap = "mx-auto w-full max-w-[1440px] px-4 md:px-8";

export function Footer() {
  return (
    <footer className={`${wrap} py-8`}>
      <div className="rounded-[2.5rem] bg-dark p-8 text-dark-foreground md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl font-extrabold">
              Just<span className="text-brand">Bay</span>
            </p>
            <p className="mt-4 max-w-sm text-sm text-dark-foreground/55">
              The trusted digital marketplace for Eastern Nigeria.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <b>Shop</b>
              <Link to="/products" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">All products</Link>
              <Link to="/stores" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Local sellers</Link>
              <Link to="/category/$category" params={{ category: "all" }} className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Categories</Link>
            </div>
            <div className="space-y-3">
              <b>Help</b>
              <Link to="/help" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Support</Link>
              <Link to="/track-order" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Track order</Link>
              <Link to="/sell" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Sell on JustBay</Link>
              <Link to="/admin" className="block text-dark-foreground/55 hover:text-dark-foreground transition-colors">Admin</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-dark-foreground/10 pt-6 text-xs text-dark-foreground/45">
          © {new Date().getFullYear()} JustBay.
        </div>
      </div>
    </footer>
  );
}
