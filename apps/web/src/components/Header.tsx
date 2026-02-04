import { Link } from "react-router-dom";

export default function Header(props: {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  categories: { id: number; name: string; "@id": string }[];
  cartCount: number;
  favCount: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="header">
      <div className="container header-content">
        <span className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            GreenShop
          </Link>
        </span>

        <input
          className="search"
          placeholder="Rechercher un produit..."
          value={props.search}
          onChange={(e) => props.onSearch(e.target.value)}
        />

        <select className="search" value={props.category} onChange={(e) => props.onCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {props.categories.map((c) => (
            <option key={c.id} value={c["@id"]}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="actions header-links">
          <Link className="nav-link" to="/favorites">
            Favoris <span className="badge">{props.favCount}</span>
          </Link>

          <button className="btn outline" onClick={props.onOpenCart}>
            Panier <span className="badge">{props.cartCount}</span>
          </button>

          <button className="btn primary">Votre Profil</button>
        </div>
      </div>
    </header>
  );
}
