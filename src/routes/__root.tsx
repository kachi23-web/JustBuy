import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopProvider, useShop } from "../lib/shop-context";
import { Logo, SearchBar } from "../components/marketplace";
import { Heart, Home, LayoutGrid, MapPin, Search, ShoppingBag, UserRound } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JustBay — Shop local across Eastern Nigeria" },
      { name: "description", content: "Discover trusted sellers, local deals and reliable delivery across Eastern Nigeria." },
      { name: "author", content: "JustBay" },
      { property: "og:title", content: "JustBay — Shop local across Eastern Nigeria" },
      { property: "og:description", content: "Discover trusted sellers, local deals and reliable delivery across Eastern Nigeria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider><SiteShell><Outlet /></SiteShell></ShopProvider>
    </QueryClientProvider>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  const { cartCount, wishlist } = useShop();
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6">
      <div className="mx-auto max-w-[1520px] rounded-full border border-border/70 bg-surface/85 px-4 py-2 shadow-soft backdrop-blur-xl">
        <div className="grid h-12 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:gap-6">
          <Logo />
          <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-semibold lg:flex"><Link to="/category/$category" params={{ category: "all" }}>Categories</Link><Link to="/products">Deals</Link><Link to="/stores">Stores</Link></nav>
          <div className="hidden min-w-0 md:block"><SearchBar compact /></div>
          <div className="flex shrink-0 items-center gap-1">
            <Link to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`} className="hidden size-10 place-items-center rounded-full hover:bg-surface-muted sm:grid"><Heart className="size-5" /></Link>
            <Link to="/cart" aria-label={`Cart with ${cartCount} items`} className="relative grid size-10 place-items-center rounded-full bg-foreground text-background"><ShoppingBag className="size-4" />{cartCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">{cartCount}</span>}</Link>
            <Link to="/account" aria-label="Account" className="hidden size-10 place-items-center rounded-full hover:bg-surface-muted sm:grid"><UserRound className="size-5" /></Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-2 flex max-w-[1520px] items-center gap-2 px-3 text-xs text-muted-foreground md:hidden"><MapPin className="size-3.5 text-brand-strong" /> Delivering to <b className="text-foreground">Awka, Anambra</b></div>
    </header>
    <main className="pb-24 md:pb-8">{children}</main>
    <nav aria-label="Mobile navigation" className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-[1.4rem] border border-border bg-surface/95 px-2 py-2 shadow-soft backdrop-blur-xl md:hidden">{[
      ["/", Home, "Home"], ["/category/all", LayoutGrid, "Categories"], ["/search", Search, "Search"], ["/cart", ShoppingBag, "Cart"], ["/account", UserRound, "Account"],
    ].map(([to, Icon, label]) => <Link key={String(label)} to={String(to)} className="flex min-w-0 flex-col items-center gap-1 py-1 text-[10px] font-semibold"><Icon className="size-5" /><span className="truncate">{String(label)}</span></Link>)}</nav>
  </div>;
}
