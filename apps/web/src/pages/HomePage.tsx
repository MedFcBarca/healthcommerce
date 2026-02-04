import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FiltersBar from "../components/FiltersBar";
import type { Product } from "../lib/api";
import { fetchCategories, fetchProductsPage } from "../lib/api";
import ProductCard from "@/components/ProductCard";

export default function HomePage(props: {
  cartCount: number;
  onOpenCart: () => void;
  onAddCart: (p: Product) => void;

  favoritesCount: number;
  isFav: (id: number) => boolean;
  onToggleFav: (p: Product) => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [sort, setSort] = useState<"reco" | "priceAsc" | "priceDesc" | "nameAsc">("reco");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function resetFilters() {
    setSearch("");
    setCategory("");
    setSort("reco");
    setMinPrice("");
    setMaxPrice("");
  }

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products", search, category],
    queryFn: ({ pageParam }) => fetchProductsPage({ pageParam, search, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (!lastPage.view?.next ? undefined : allPages.length + 1),
  });

  const productsRaw = useMemo(() => data?.pages.flatMap((p) => p.member) ?? [], [data]);

  const products = useMemo(() => {
    const min = minPrice ? Math.round(parseFloat(minPrice) * 100) : null;
    const max = maxPrice ? Math.round(parseFloat(maxPrice) * 100) : null;

    let list = [...productsRaw];
    if (min !== null && !Number.isNaN(min)) list = list.filter((p) => p.price >= min);
    if (max !== null && !Number.isNaN(max)) list = list.filter((p) => p.price <= max);

    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    if (sort === "nameAsc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [productsRaw, minPrice, maxPrice, sort]);

  return (
    <>
      <Header
        search={search}
        onSearch={(v) => {
          setSearch(v);
        }}
        category={category}
        onCategory={(v) => {
          setCategory(v);
        }}
        categories={categories}
        cartCount={props.cartCount}
        favCount={props.favoritesCount}
        onOpenCart={props.onOpenCart}
      />

      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text fade-in">
            <h1>
              Vos achats, enfin <span>responsables</span>.
            </h1>
            <p>Une plateforme moderne pour acheter des produits santé et bien-être avec une UX premium.</p>
          </div>

          <div className="hero-card float">
            <h3>Offre du moment</h3>
            <p>
              Jusqu’à <strong>15%</strong> sur la sélection bien-être.
            </p>
            <button className="btn primary full" onClick={props.onOpenCart}>
              Voir mon panier
            </button>
          </div>
        </div>
      </section>

      <main className="container main">
        <div className="section-header">
          <h2>Produits</h2>
          <span className="counter">{products.length} produits</span>
        </div>

        <FiltersBar
          sort={sort}
          setSort={setSort}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onReset={resetFilters}
        />

        <div className="grid">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <div key={i} className="card skeleton" />)}

          {!isLoading &&
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                liked={props.isFav(p.id)}
                onToggleFav={props.onToggleFav}
                onAddCart={props.onAddCart}
              />
            ))}
        </div>

        {!isLoading && (
          <div className="load-more">
            <button
              className="btn outline"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "Chargement..." : hasNextPage ? "Charger plus" : "Plus de produits"}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
