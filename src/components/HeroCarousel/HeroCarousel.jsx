// src/components/HeroCarousel/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import './HeroCarousel.css'; // Asegúrate de crear este archivo CSS

// Definición de los datos a rotar: imagen y textos
const slides = [
  {
    image: '/fondo_1.jpg',
    text1: 'ReWear es una aplicación de moda circular que te permite darle una segunda vida a tu ropa.',
    text2: 'Aquí puedes comprar, vender y renovar tu clóset de manera fácil, segura y sustentable.',
  },
  {
    image: '/fondo_3.webp',
    text1: '¡Vende esa ropa que ya no usas y recupera tu inversión!',
    text2: 'Publicar es rápido y sencillo. ¡Únete a la economía circular!',
  },
  {
    image: '/fondo_2.jpg',
    text1: 'Encuentra prendas únicas con precios increíbles.',
    text2: 'Nuestra comunidad garantiza calidad y seguridad en cada transacción.',
  },
];

const INTERVAL_TIME = 10000; // 10 segundos en milisegundos

export default function HeroCarousel() {
  // 1. Hook de Estado: Mantiene el índice de la diapositiva actual
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Obtiene los datos de la diapositiva actual
  const currentSlide = slides[currentSlideIndex];

  // 2. Hook de Efecto: Configura el temporizador para cambiar la diapositiva
  useEffect(() => {
    // Función que calcula el próximo índice (vuelve a 0 si es el último)
    const nextSlide = () => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % slides.length
      );
    };

    // Configura el temporizador para llamar a nextSlide cada 10 segundos
    const intervalId = setInterval(nextSlide, INTERVAL_TIME);

    // Función de limpieza: Se ejecuta cuando el componente se desmonta o el efecto se re-ejecuta
    return () => clearInterval(intervalId);
  }, []); // El array de dependencias vacío [] asegura que el efecto se ejecute SÓLO una vez al montar

  return (
    <section className="hero fullbleed">
      {/* La imagen y el texto cambian en base al estado 'currentSlideIndex' */}
      <img className="hero__img" src={currentSlide.image} alt="Ropa de segunda mano" key={currentSlide.image} />
      <div className="hero__overlay">
        <div className="hero__content">
          <img src="/logo_blanco.png" alt="ReWear" className="hero__logo" />
          <p className="hero__text">{currentSlide.text1}</p>
          <p className="hero__text">{currentSlide.text2}</p>
          <p className="hero__text">
            <strong>¡Desliza y descubre más!</strong>
          </p>
        </div>
      </div>
    </section>
  );
}