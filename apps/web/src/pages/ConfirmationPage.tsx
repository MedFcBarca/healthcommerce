import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder, iriToId } from "../lib/api";
import { euro } from "../lib/format";

export default function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();

  const q = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <div className="confirm-card">
          <h2>ID commande manquant</h2>
          <Link className="btn primary" to="/">Retour boutique</Link>
        </div>
      </div>
    );
  }

  if (q.isLoading) {
    return <div className="container" style={{ padding: 24 }}>Chargement...</div>;
  }

  if (q.isError) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <div className="confirm-card">
          <h2>Commande introuvable</h2>
          <p style={{ color: "#64748b" }}>
            {(q.error as any)?.message ?? "Erreur inconnue"}
          </p>
          <Link className="btn primary" to="/">Retour boutique</Link>
        </div>
      </div>
    );
  }

  const order: any = q.data;
  const items: any[] = Array.isArray(order?.items) ? order.items : [];

  const rows = items.map((it) => {
    const pid = typeof it?.product === "string" ? iriToId(it.product) : "";
    const qty = Number(it?.qty ?? 0);
    const price = Number(it?.price ?? 0);
    return {
      key: it?.id ?? `${pid}-${qty}`,
      productIri: it?.product ?? "",
      productId: pid,
      qty,
      price,
      lineTotal: qty * price,
    };
  });

  return (
    <div className="container" style={{ padding: 24 }}>
      <div className="confirm-card">
        <div className="confirm-badge">Commande confirmée</div>

        <h2 style={{ marginBottom: 6 }}>Merci 🎉</h2>
        <p style={{ color: "#64748b" }}>Votre commande a bien été enregistrée.</p>

        <div className="confirm-grid">
          <div className="confirm-box">
            <div className="confirm-label">Commande</div>
            <div className="confirm-value">#{order?.id ?? id}</div>
          </div>

          <div className="confirm-box">
            <div className="confirm-label">Date</div>
            <div className="confirm-value">
              {order?.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
            </div>
          </div>

          <div className="confirm-box">
            <div className="confirm-label">Total</div>
            <div className="confirm-value">
              {typeof order?.total === "number" ? euro(order.total) : "—"}
            </div>
          </div>
        </div>

        <h3 style={{ marginTop: 18, marginBottom: 10 }}>Articles</h3>

        {rows.length === 0 ? (
          <p style={{ color: "#64748b" }}>
            Aucun article trouvé dans la réponse API.
          </p>
        ) : (
          <div className="confirm-list">
            {rows.map((r) => (
              <div key={r.key} className="confirm-row">
                <div>
                  <div className="confirm-title">
                    Produit {r.productId || r.productIri}
                  </div>
                  <div className="confirm-sub">
                    {r.qty} × {euro(r.price)}
                  </div>
                </div>
                <div className="confirm-right">{euro(r.lineTotal)}</div>
              </div>
            ))}
          </div>
        )}

        <pre
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f8fafc",
            borderRadius: 12,
            overflow: "auto",
            border: "1px solid #e5e7eb",
          }}
        >
          {JSON.stringify(order, null, 2)}
        </pre>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Link className="btn primary" to="/">Retour boutique</Link>
          <Link className="btn outline" to="/favorites">Favoris</Link>
        </div>
      </div>
    </div>
  );
}
