export default function FiltersBar(props: {
  sort: string;
  setSort: (v: any) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="toolbar">
      <div className="pills">
        <div className="pill">
          <label>Trier</label>
          <select value={props.sort} onChange={(e) => props.setSort(e.target.value)}>
            <option value="reco">Pertinence</option>
            <option value="priceAsc">Prix ↑</option>
            <option value="priceDesc">Prix ↓</option>
            <option value="nameAsc">Nom A→Z</option>
          </select>
        </div>

        <div className="pill">
          <label>Min €</label>
          <input value={props.minPrice} onChange={(e) => props.setMinPrice(e.target.value)} placeholder="0" inputMode="decimal" />
        </div>

        <div className="pill">
          <label>Max €</label>
          <input value={props.maxPrice} onChange={(e) => props.setMaxPrice(e.target.value)} placeholder="200" inputMode="decimal" />
        </div>
      </div>

      <button className="reset-btn" onClick={props.onReset}>
        Reset
      </button>
    </div>
  );
}
