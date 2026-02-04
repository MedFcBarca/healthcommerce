import { useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../lib/storage";
import type { Product } from "../lib/api";

const FAV_KEY = "greenshop_favorites_v1";
const FAV_SNAPSHOT_KEY = "greenshop_fav_products_v1";

export function useFavorites() {
  const [ids, setIds] = useState<number[]>(() => loadJSON(FAV_KEY, []));
  const [snapshot, setSnapshot] = useState<Record<number, Product>>(() =>
    loadJSON(FAV_SNAPSHOT_KEY, {})
  );

  useEffect(() => saveJSON(FAV_KEY, ids), [ids]);
  useEffect(() => saveJSON(FAV_SNAPSHOT_KEY, snapshot), [snapshot]);

  function isFav(id: number) {
    return ids.includes(id);
  }

  function toggle(p: Product) {
    setIds((prev) => (prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]));
    setSnapshot((prev) => (prev[p.id] ? prev : { ...prev, [p.id]: p }));
  }

  const products = useMemo(() => ids.map((id) => snapshot[id]).filter(Boolean) as Product[], [
    ids,
    snapshot,
  ]);

  return { ids, products, isFav, toggle };
}
