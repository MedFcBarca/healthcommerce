import { euro } from "../lib/format";
import type { CartItem } from "../hooks/useCart";

export default function CartDrawer(props: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;

  onCheckout: () => void;
  checkoutLoading?: boolean;
}) {
  if (!props.open) return null;

  return (
    <>
      <div className="cart-backdrop" onClick={props.onClose} />
      <aside className="cart-drawer" role="dialog" aria-modal="true">
        <div className="cart-head">
          <div className="cart-title">Votre panier</div>
          <button className="icon-btn" onClick={props.onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="cart-body">
          {props.items.length === 0 && (
            <p style={{ color: "#64748b", marginTop: 8 }}>
              Panier vide. Ajoute quelques produits 👇
            </p>
          )}

          {props.items.map((it) => (
            <div key={it.id} className="cart-item">
              <div>
                <h4>{it.name}</h4>
                <small>{euro(it.price)} · unité</small>
              </div>

              <div style={{ display: "grid", justifyItems: "end", gap: 8 }}>
                <div className="qty">
                  <button
                    className="qty-btn"
                    onClick={() => props.onDec(it.id)}
                    disabled={props.checkoutLoading}
                  >
                    −
                  </button>

                  <span className="qty-num">{it.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => props.onInc(it.id)}
                    disabled={props.checkoutLoading}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn ghost small"
                  onClick={() => props.onRemove(it.id)}
                  disabled={props.checkoutLoading}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-foot">
          <div className="total-row">
            <span>Total</span>
            <span>{euro(props.total)}</span>
          </div>

          <button
            className="btn primary full"
            disabled={props.items.length === 0 || props.checkoutLoading}
            onClick={props.onCheckout}
          >
            {props.checkoutLoading ? "Redirection..." : "Passer commande"}
          </button>

          <button
            className="btn outline full"
            onClick={props.onClear}
            disabled={props.items.length === 0 || props.checkoutLoading}
          >
            Vider le panier
          </button>
        </div>
      </aside>
    </>
  );
}
