import React from "react";
import { createRoot } from "react-dom/client";

// Bootstrap aporta clases de diseño listas para usar: contenedores,
// columnas, botones, formularios, espaciados y tarjetas.
import "bootstrap/dist/css/bootstrap.min.css";

// Estos estilos son propios del proyecto y complementan Bootstrap.
import "./styles.css";
import App from "./App.jsx";

// Busca el elemento #root del HTML y monta la aplicación React dentro de él.
createRoot(document.getElementById("root")).render(
  // StrictMode ayuda a detectar ciertos problemas durante el desarrollo.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
