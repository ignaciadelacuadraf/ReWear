import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import data from "../../data/products.json";
import TarjetaProducto from "../../components/TarjetaProducto/TarjetaProducto";
import "./Search.css";

/* ---------- utils ---------- */
function norm(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

const GENDERS = new Set(["womens", "mens"]);
const CATEGORIES = new Set(["tops", "bottoms", "shoes", "accessories"]);

/* Sinónimos ES -> claves internas */
const synonyms = {
  // género
  mujer: "womens",
  mujeres: "womens",
  dama: "womens",
  damas: "womens",
  hombre: "mens",
  hombres: "mens",
  // categorías
  zapatos: "shoes",
  calzado: "shoes",
  zapas: "shoes",
  polera: "tops",
  poleras: "tops",
  camiseta: "tops",
  camisetas: "tops",
  blusa: "tops",
  blusas: "tops",
  falda: "bottoms",
  faldas: "bottoms",
  pantalon: "bottoms",
  pantalones: "bottoms",
  jeans: "bottoms",
  accesorio: "accessories",
  accesorios: "accessories",
};

/* Scoring solo para campos de texto libres (no género/categoría) */
function scoreProduct(p, terms) {
  const name = norm(p.name);
  const brand = norm(p.brand);
  const color = norm(p.color);

  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    // nombre: match parcial
    if (name.includes(t)) s += 3;
    // bonus si es prefijo en nombre (p.ej., "cam" en "camisa")
    if (name.startsWith(t)) s += 1;

    // marca
    if (brand && brand.includes(t)) s += 2;

    // color
    if (color && color.includes(t)) s += 1.5;
  }
  return s;
}

export default function SearchResults() {
  const [params] = useSearchParams();
  const [sort, setSort] = useState("relevance"); // relevance | priceAsc | priceDesc

  const qRaw = (params.get("q") || "").trim();
  const qn = norm(qRaw);

  const { results, total, activeFilters } = useMemo(() => {
    if (!qn) return { results: [], total: 0, activeFilters: {} };

    // 1) tokeniza + mapea sinónimos
    const tokens = qn.split(/\s+/).map((t) => synonyms[t] || t).filter(Boolean);

    // 2) detecta filtros exactos (gender/category) y separa keywords
    let genderFilter = null;
    let categoryFilter = null;
    const keywords = [];

    for (const t of tokens) {
      if (!genderFilter && GENDERS.has(t)) {
        genderFilter = t; // mens | womens
        continue;
      }
      if (!categoryFilter && CATEGORIES.has(t)) {
        categoryFilter = t; // tops | bottoms | shoes | accessories
        continue;
      }
      keywords.push(t);
    }

    // 3) aplica filtros por igualdad exacta
    let pool = data;
    if (genderFilter) pool = pool.filter((p) => p.gender === genderFilter);
    if (categoryFilter) pool = pool.filter((p) => p.category === categoryFilter);

    // 4) si hay keywords, calcula score; si no hay, todos valen (pero ordenamos por precio si corresponde)
    let arr;
    if (keywords.length > 0) {
      const withScore = pool
        .map((p) => ({ p, s: scoreProduct(p, keywords) }))
        .filter((x) => x.s > 0);

      arr = withScore.sort((a, b) => b.s - a.s).map((x) => x.p);
    } else {
      arr = [...pool];
    }

    // 5) orden secundario
    if (sort === "priceAsc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") arr = [...arr].sort((a, b) => b.price - a.price);

    return {
      results: arr,
      total: arr.length,
      activeFilters: { gender: genderFilter, category: categoryFilter, keywords },
    };
  }, [qn, sort]);

  return (
    <main className="search-container">
      {/* Header */}
      <header className="search-header">
        <h1 className="search-title">
          {qn ? <>Resultados para “{qRaw}”</> : "Explora productos"}
        </h1>

        {/* Toolbar: ordenar izq | conteo der */}
        <div className="search-toolbar">
          <label className="search-sort" aria-label="Ordenar resultados">
            <span className="search-sort__label">Ordenar por:</span>
            <select
              className="search-sort__select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Relevancia</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
            </select>
          </label>

          <span className="search-count" aria-live="polite">
            {total} {total === 1 ? "producto" : "productos"}
          </span>
        </div>

        {/* (Opcional) chips de filtros activos */}
        {(activeFilters.gender || activeFilters.category) && (
          <div className="search-chips">
            {activeFilters.gender && (
              <span className="chip">
                {activeFilters.gender === "mens" ? "Hombre" : "Mujer"}
              </span>
            )}
            {activeFilters.category && (
              <span className="chip">
                {
                  {
                    tops: "Tops",
                    bottoms: "Bottoms",
                    shoes: "Zapatos",
                    accessories: "Accesorios",
                  }[activeFilters.category]
                }
              </span>
            )}
          </div>
        )}
      </header>

      {/* Grid de resultados */}
      {total > 0 ? (
        <section className="search-grid">
          {results.map((p) => (
            <TarjetaProducto
              key={p.id}
              to={`/p/${p.id}`}
              name={p.name}
              price={`$${p.price.toLocaleString("es-CL")}`}
              img={p.img}
            />
          ))}
        </section>
      ) : (
        <div className="search-empty">
          {qn ? (
            <>
              <p>No encontramos resultados para “{qRaw}”.</p>
              <div className="search-suggest">
                <span>Prueba con:</span>
                <ul>
                  <li>Un término más general (ej: “zapatillas”).</li>
                  <li>Sin tildes (ej: “falda”).</li>
                  <li>
                    Un filtro en la búsqueda, por ejemplo: “<strong>hombre zapatos</strong>”,
                    “<strong>mujer tops</strong>”, “<strong>mujer accesorios</strong>”.
                  </li>
                </ul>
              </div>
              <p>
                O explora por <Link to="/womens/tops">Mujer</Link> /{" "}
                <Link to="/mens/tops">Hombre</Link>.
              </p>
            </>
          ) : (
            <p>Escribe algo en el buscador para comenzar.</p>
          )}
        </div>
      )}
    </main>
  );
}
