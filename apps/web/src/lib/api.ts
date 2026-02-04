export const API = "http://127.0.0.1:8000";

/** ---------- TYPES PRODUITS / CATEGORIES ---------- */
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number; 
  category?: string;
};

export type Category = {
  id: number;
  name: string;
  "@id": string; // IRI ex: "/api/categories/1"
};

export type HydraCollection<T> = {
  member: T[];
  view?: { next?: string };
};

/** ---------- TYPES COMMANDES ---------- */
export type OrderCreateItem = {
  product: string; 
  qty: number;
  price: number;
};

export type OrderCreatePayload = {
  total?: number;
  items: OrderCreateItem[];
};

export type OrderItem = {
  id: number;
  product: string; 
  qty: number;
  price: number;
};

export type Order = {
  id: number;
  createdAt: string;
  total: number; 
  items: OrderItem[];
};

export function iriToId(iri: string): string {
  const parts = iri.split("/");
  return parts[parts.length - 1];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API}/api/categories`, {
    headers: { Accept: "application/ld+json" },
  });
  if (!res.ok) throw new Error("Impossible de charger les catégories");
  const data = await res.json();
  return data.member;
}

export async function fetchProductsPage(params: {
  pageParam?: number;
  search: string;
  category: string;
}): Promise<HydraCollection<Product>> {
  const page = params.pageParam ?? 1;

  const qs = new URLSearchParams();
  if (params.search) qs.append("name", params.search);
  if (params.category) qs.append("category", params.category);
  qs.append("page", String(page));

  const res = await fetch(`${API}/api/products?${qs.toString()}`, {
    headers: { Accept: "application/ld+json" },
  });
  if (!res.ok) throw new Error("Impossible de charger les produits");
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/api/products/${id}`, {
    headers: { Accept: "application/ld+json" },
  });
  if (!res.ok) throw new Error("Produit introuvable");
  return res.json();
}

export async function createOrder(payload: OrderCreatePayload): Promise<Order> {
  const res = await fetch(`${API}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
      Accept: "application/ld+json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail ?? "Impossible de créer la commande");
  }

  return res.json();
}

export async function fetchOrder(id: string): Promise<Order> {
  const res = await fetch(`${API}/api/orders/${id}`, {
    headers: { Accept: "application/ld+json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail ?? "Commande introuvable");
  }

  return res.json();
}


