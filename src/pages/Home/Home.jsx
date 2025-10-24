import TarjetaCategoria from "../../components/TarjetaCategoria/TarjetaCategoria";
import TarjetaProducto from "../../components/TarjetaProducto/TarjetaProducto";
import HeroCarousel from "../../components/HeroCarousel/HeroCarousel"; // <-- IMPORTA AQUÍ
import "./Home.css";

export default function Home() {
  return (
    <>
      {/* HERO: full-bleed */}
      <HeroCarousel />

      {/* EXPLORAR POR CATEGORÍA: full-bleed (título + grids sin márgenes) */}
      <section className="fullbleed">
        <h2 className="section-heading">Explora por categoría</h2>

        {/* MUJER */}
        <div className="section-split">
          <h3 className="split-title">MUJER</h3>
          <span className="split-line" />
        </div>
        <div className="category-grid">
          <TarjetaCategoria to="/womens/tops"        label="TOPS"        img="/Tops_m.png" />
          <TarjetaCategoria to="/womens/bottoms"     label="BOTTOMS"     img="/Bottoms_m.png" />
          <TarjetaCategoria to="/womens/shoes"       label="ZAPATOS"     img="/Zapatos_m.png" />
          <TarjetaCategoria to="/womens/accessories" label="ACCESORIOS"  img="/Accesorios_m.png" />
        </div>

        {/* HOMBRE */}
        <div className="section-split">
          <h3 className="split-title">HOMBRE</h3>
          <span className="split-line" />
        </div>
        <div className="category-grid">
          <TarjetaCategoria to="/mens/tops"        label="TOPS"        img="/Tops_h.png" />
          <TarjetaCategoria to="/mens/bottoms"     label="BOTTOMS"     img="/Bottoms_h.png" />
          <TarjetaCategoria to="/mens/shoes"       label="ZAPATOS"     img="/Zapatos_h.png" />
          <TarjetaCategoria to="/mens/accessories" label="ACCESORIOS"  img="/Accesorios_h.png" />
        </div>
      </section>

      {/* NUEVOS DE LA SEMANA: full-bleed */}
      <section className="fullbleed">
        <h3 className="section-heading mt-lg">Nuevos de la semana</h3>
        <div className="products-grid">
          <TarjetaProducto to="/p/1" name="Pantalón Flare"      price="$22.990" img="/prod_1.jpg" />
          <TarjetaProducto to="/p/2" name="Chaleco café"        price="$15.990" img="/prod_2.jpg" />
          <TarjetaProducto to="/p/3" name="Falda lino"          price="$25.990" img="/prod_3.jpg" />
          <TarjetaProducto to="/p/4" name="Chaqueta mostaza"    price="$19.990" img="/prod_4.jpg" />
        </div>
      </section>
    </>
  );
}
