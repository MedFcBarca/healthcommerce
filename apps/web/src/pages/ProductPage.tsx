import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
};

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
  return res.json();
}

export default function ProductPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container main">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container main">
        <p>Produit introuvable</p>
        <Link to="/">← Retour</Link>
      </div>
    );
  }

  return (
    <div className="container main">
      <Link to="/">← Retour</Link>

      <div className="card fade-in" style={{ maxWidth: 720, margin: "28px auto" }}>
        <div className="card-body">
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>{product.name}</h2>
          <p style={{ marginBottom: 16 }}>{product.description}</p>
          <div style={{ fontWeight: 700, color: "#166534", fontSize: 20 }}>
            {(product.price / 100).toFixed(2)} €
          </div>
        </div>

        <div className="card-footer" style={{ justifyContent: "flex-end" }}>
          <button
  className="btn primary"
  onClick={() => {
    const key = "greenshop_cart_v1";
    const raw = localStorage.getItem(key);
    const cart = raw ? JSON.parse(raw) : [];
    const existing = cart.find((x: any) => x.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    alert("Ajouté au panier ✅");
  }}
>
  Ajouter au panier
</button>

        </div>
      </div>
    </div>
  );
}
