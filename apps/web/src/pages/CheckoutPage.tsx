import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { euro } from "../lib/format";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: "card" | "cash";
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
};

export default function CheckoutPage() {
  const nav = useNavigate();
  const cart = useCart();

  const { checkout, loading, error: checkoutError } = useCheckout({
    items: cart.items,
    clearCart: cart.clear,
  });

  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "Maroc",
    paymentMethod: "card",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  const canSubmit = useMemo(() => {
    if (cart.items.length === 0) return false;
    if (!form.fullName || !form.email || !form.phone) return false;
    if (!form.address1 || !form.city || !form.zip || !form.country) return false;

    if (form.paymentMethod === "card") {
      if (!form.cardNumber || !form.cardExp || !form.cardCvc) return false;
    }
    return true;
  }, [cart.items.length, form]);

  function onChange<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit() {
    setError(null);

    try {
      const orderId = await checkout();

      nav(`/confirmation/${orderId}`);
    } catch (e: any) {
      setError(e?.message ?? "Erreur lors du paiement");
    }
  }

  const finalError = error ?? checkoutError;

  return (
    <div className="checkout">
      <div className="checkout-wrap">
        <header className="checkout-head">
          <h1>Checkout</h1>
          <p style={{ color: "#64748b" }}>
            Renseigne tes informations pour finaliser la commande.
          </p>
        </header>

        {cart.items.length === 0 ? (
          <div className="checkout-card">
            <p>Ton panier est vide.</p>
            <button className="btn primary" onClick={() => nav("/")}>
              Revenir aux produits
            </button>
          </div>
        ) : (
          <div className="checkout-grid">
            <div className="checkout-card">
              <h3>Informations</h3>

              <div className="grid2">
                <Field label="Nom complet">
                  <input
                    value={form.fullName}
                    onChange={(e) => onChange("fullName", e.target.value)}
                    placeholder="Ex: Youssef El..."
                  />
                </Field>

                <Field label="Téléphone">
                  <input
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    placeholder="Ex: +212..."
                  />
                </Field>
              </div>

              <div className="grid2">
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    placeholder="exemple@mail.com"
                  />
                </Field>

                <Field label="Pays">
                  <input
                    value={form.country}
                    onChange={(e) => onChange("country", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Adresse">
                <input
                  value={form.address1}
                  onChange={(e) => onChange("address1", e.target.value)}
                  placeholder="Rue, numéro..."
                />
              </Field>

              <Field label="Complément d’adresse">
                <input
                  value={form.address2}
                  onChange={(e) => onChange("address2", e.target.value)}
                  placeholder="Appartement, étage (optionnel)"
                />
              </Field>

              <div className="grid2">
                <Field label="Ville">
                  <input
                    value={form.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    placeholder="Casablanca..."
                  />
                </Field>

                <Field label="Code postal">
                  <input
                    value={form.zip}
                    onChange={(e) => onChange("zip", e.target.value)}
                    placeholder="20000"
                  />
                </Field>
              </div>

              <hr className="sep" />

              <h3>Paiement</h3>

              <div className="pay-methods">
                <label className="radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={form.paymentMethod === "card"}
                    onChange={() => onChange("paymentMethod", "card")}
                  />
                  Carte bancaire
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="pay"
                    checked={form.paymentMethod === "cash"}
                    onChange={() => onChange("paymentMethod", "cash")}
                  />
                  Paiement à la livraison
                </label>
              </div>

              {form.paymentMethod === "card" && (
                <div style={{ marginTop: 10 }}>
                  <Field label="Numéro de carte">
                    <input
                      value={form.cardNumber}
                      onChange={(e) => onChange("cardNumber", e.target.value)}
                      placeholder="4242 4242 4242 4242"
                    />
                  </Field>

                  <div className="grid2">
                    <Field label="Expiration (MM/AA)">
                      <input
                        value={form.cardExp}
                        onChange={(e) => onChange("cardExp", e.target.value)}
                        placeholder="12/30"
                      />
                    </Field>

                    <Field label="CVC">
                      <input
                        value={form.cardCvc}
                        onChange={(e) => onChange("cardCvc", e.target.value)}
                        placeholder="123"
                      />
                    </Field>
                  </div>

                  <small style={{ color: "#64748b" }}>
                    (Démo) Ces champs ne sont pas reliés à Stripe — juste un formulaire.
                  </small>
                </div>
              )}

              {finalError && <div className="alert">{finalError}</div>}

              <button
                className="btn primary full"
                onClick={submit}
                disabled={!canSubmit || loading}
              >
                {loading ? "Paiement en cours..." : `Payer ${euro(cart.total)}`}
              </button>
            </div>

            <div className="checkout-card">
              <h3>Résumé</h3>

              <div className="sum-items">
                {cart.items.map((it) => (
                  <div key={it.id} className="sum-row">
                    <div>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>
                        {it.qty} × {euro(it.price)}
                      </div>
                    </div>
                    <div style={{ fontWeight: 600 }}>{euro(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="sum-total">
                <span>Total</span>
                <strong>{euro(cart.total)}</strong>
              </div>

              <button className="btn outline full" onClick={() => nav("/")}>
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{props.label}</span>
      {props.children}
    </label>
  );
}
