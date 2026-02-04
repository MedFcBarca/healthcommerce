import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import type { Product } from "../lib/api";
import { euro } from "../lib/format";

export default function FavoritesPage(props: {
  favorites: number[];
  products: Product[];
  onToggleFav: (p: Product) => void;
}) {
  const nav = useNavigate();

  return (
    <>
      <div className="container main">
        <div className="section-header">
          <h2>Favoris</h2>
          <span className="counter">{props.favorites.length} produits</span>
        </div>

        {props.favorites.length === 0 && (
          <div className="card fade-in" style={{ maxWidth: 720, margin: "18px auto" }}>
            <div className="card-body">
              <h3>Aucun favori</h3>
              <p>Clique sur ❤️ sur un produit pour l’ajouter ici.</p>
            </div>
            <div className="card-footer" style={{ justifyContent: "flex-end" }}>
              <button className="btn primary" onClick={() => nav("/")}>
                Découvrir des produits
              </button>
            </div>
          </div>
        )}

        {props.favorites.length > 0 && (
          <div className="grid">
            {props.products.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="card fade-in" style={{ cursor: "pointer" }}>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                  </div>
                  <div className="card-footer">
                    <span>{euro(p.price)}</span>
                    <button
                      className="fav-btn active"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onToggleFav(p);
                      }}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
