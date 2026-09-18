CREATE TABLE public.stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  owner_name text,
  phone text,
  city text NOT NULL,
  category text,
  description text,
  verified boolean NOT NULL DEFAULT false,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stores TO anon;
GRANT SELECT, INSERT, UPDATE ON public.stores TO authenticated;
GRANT ALL ON public.stores TO service_role;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stores are publicly viewable" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Owners create their store" ON public.stores FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners update their store" ON public.stores FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price integer NOT NULL,
  old_price integer,
  city text NOT NULL,
  image_url text,
  delivery text,
  stock integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active products are publicly viewable" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Owners read their products" ON public.products FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Owners manage their products" ON public.products FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Owners update their products" ON public.products FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Owners delete their products" ON public.products FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));

ALTER TABLE public.order_items ADD COLUMN store_id uuid REFERENCES public.stores(id) ON DELETE SET NULL;
ALTER TABLE public.order_items ADD COLUMN status text NOT NULL DEFAULT 'Processing';
GRANT UPDATE ON public.order_items TO authenticated;
CREATE POLICY "Store owners read their order items" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = order_items.store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Store owners update their order items" ON public.order_items FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = order_items.store_id AND s.owner_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = order_items.store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Store owners read related orders" ON public.orders FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.order_items oi JOIN public.stores s ON s.id = oi.store_id WHERE oi.order_id = orders.id AND s.owner_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER stores_touch BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();