import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../../data/products.json";
import TarjetaProducto from "../../components/TarjetaProducto/TarjetaProducto";
import "./Category.css";

const GENDERS = new Set(["womens", "mens"]);
const CATEGORIES = new Set(["tops", "bottoms", "shoes", "accessories"]);

const labelGen = { womens: "Mujer", mens: "Hombre" };
const labelCat = { tops: "Tops", bottoms: "Bottoms", shoes: "Zapatos", accessories: "Accesorios" };

export default function CategoryPage() {
  const { gender, category } = useParams();
  const [sort, setSort] = useState("relevance"); // relevance | priceAsc | priceDesc

  const valid = GENDERS.has(gender) && CATEGORIES.has(category);

  const items = useMemo(() => {
    if (!valid) return [];
    let list = data.filter(p => p.gender === gender && p.category === category);
    if (sort === "priceAsc")  list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [gender, category, sort, valid]);

  if (!valid) {
    return (
      <main className="cat-container">
        <div className="cat-empty">
          <h2>Ups… categoría no encontrada</h2>
          <p>Revisa el menú o vuelve al <Link to="/">inicio</Link>.</p>
        </div>
      </main>
    );
  }

  const title = `${labelCat[category]} • ${labelGen[gender]}`;

  return (
    <main className="cat-container">
      {/* Título centrado */}
      <header className="cat-header">
        <h1 className="cat-title">{title}</h1>

        {/* Toolbar: izquierda ordenar, derecha conteo */}
        <div className="cat-toolbar">
          <label className="cat-sort" aria-label="Ordenar productos">
            <span className="cat-sort__label">Ordenar por:</span>
            <select
              value={sort}
              onChange={(e)=>setSort(e.target.value)}
              className="cat-sort__select"
            >
              <option value="relevance">Relevancia</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
            </select>
          </label>

          <span className="cat-count" aria-live="polite">
            {items.length} {items.length === 1 ? "producto" : "productos"}
          </span>
        </div>
      </header>

      {/* Grid 4 por fila con tus tarjetas */}
      <section className="cat-grid">
        {items.map(p => (
          <TarjetaProducto
            key={p.id}
            to={`/p/${p.id}`}
            name={p.name}
            price={`$${p.price.toLocaleString("es-CL")}`}
            img={p.img}
          />
        ))}
      </section>

      {items.length === 0 && (
        <div className="cat-empty">
          <p>No hay productos en esta categoría.</p>
          <Link className="cat-btn" to="/">Volver al inicio</Link>
        </div>
      )}
    </main>
  );
}
