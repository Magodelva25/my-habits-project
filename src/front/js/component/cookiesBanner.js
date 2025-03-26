import React, { useState, useEffect } from "react";
import "./../../styles/cookies.css"

export const CookiesBanner = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookies = localStorage.getItem("cookies-aceptadas");
    if (cookies) {
      setCookiesAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookies-aceptadas", true);
    setCookiesAccepted(true);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cookies-aceptadas" });
  };

  if (cookiesAccepted) {
    return null;
  }

  return (
    <>
    <div className="aviso-cookies activo">
      <div className="contenido">
        <h3 className="titulo">Cookies</h3>
        <p className="parrafo">
          Utilizamos cookies propias y de terceros para mejorar nuestros
          servicios.
        </p>
        <button
          className="cookies-cta"
          id="btn-aceptar-cookies"
          onClick={handleAcceptCookies}
        >
         <span>
         De acuerdo
         </span> 
        </button>
        <a
          className="enlace"
          href=""
        >
          Aviso de Cookies
        </a>
      </div>
    </div>
    <div className="fondo-aviso-cookies">
    </div>
    </>
  );
};
