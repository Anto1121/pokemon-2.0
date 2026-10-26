import { useState } from "react";
import MiApi from "./components/MiApi.jsx";
import Buscador from "./components/Buscador.jsx";

// Componente principal: organiza la página y comparte el estado de búsqueda.
export default function App() {
  // busqueda guarda el texto escrito por el usuario.
  // setBusqueda es la función que permite actualizar ese texto.
  const [busqueda, setBusqueda] = useState("");

  return (
    // container, py-4 y otras clases son utilidades de Bootstrap.
    <main className="pagina">
      <header className="encabezado text-center py-5 px-3">
        <div className="container">
          <span className="badge rounded-pill text-bg-dark mb-3">PROYECTO INF41</span>
          <h1 className="display-5 fw-bold">Pokémon en español</h1>
          <p className="lead mb-0">Conoce algunos Pokémon y búscalos por su nombre en español.</p>
        </div>
      </header>

      <section className="container contenido py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <h2 className="h4 mb-3">Buscar Pokémon</h2>

            {/* Se pasan el texto y su actualizador al componente Buscador mediante props. */}
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

            {/* MiApi recibe el término y muestra los personajes que coinciden. */}
            <MiApi busqueda={busqueda} />
          </div>
        </div>
      </section>

      <footer className="text-center py-4 mt-auto">
        Proyecto de Programación Front End
      </footer>
    </main>
  );
}
