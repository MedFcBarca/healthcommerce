import { Link } from "react-router-dom";
import { euro } from "../lib/format";
import type { Product } from "../lib/api";

export default function ProductCard(props: {
  product: Product;
  liked: boolean;
  onToggleFav: (p: Product) => void;
  onAddCart: (p: Product) => void;
}) {
  const p = props.product;

  return (
    <Link to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card fade-in" style={{ cursor: "pointer" }}>
        <div className="card-body">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>

        <div className="card-footer">
          <span>{euro(p.price)}</span>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              className={props.liked ? "fav-btn active" : "fav-btn"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onToggleFav(p);
              }}
              aria-label={props.liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              title={props.liked ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <span className="fav-heart">{props.liked ? "♥" : "♡"}</span>
            </button>

            <button
              className="btn primary small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onAddCart(p);
              }}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
