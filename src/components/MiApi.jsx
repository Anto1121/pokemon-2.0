import { useEffect, useState } from "react";

// Consulta PokéAPI y muestra los Pokémon con sus nombres y tipos en español.
export default function MiApi({ busqueda }) {
  const [pokemon, setPokemon] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Traducción de los tipos que entrega la API en inglés.
  const tiposEnEspanol = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
  };

  useEffect(() => {
    // Carga los primeros 20 Pokémon.
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo consultar la API");
        return respuesta.json();
      })
      .then(async (datos) => {
        // Busca los detalles y el nombre español de cada Pokémon.
        const lista = await Promise.all(
          datos.results.map(async (elemento) => {
            const respuestaPokemon = await fetch(elemento.url);
            const detalle = await respuestaPokemon.json();

            const respuestaEspecie = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${detalle.id}/`
            );
            const especie = await respuestaEspecie.json();

            const nombreEspanol = especie.names.find(
              (nombre) => nombre.language.name === "es"
            );

            return {
              id: detalle.id,
              nombre: nombreEspanol ? nombreEspanol.name : elemento.name,
              imagen:
                detalle.sprites.other?.["official-artwork"]?.front_default ||
                detalle.sprites.front_default,
              tipos: detalle.types.map(
                (tipo) => tiposEnEspanol[tipo.type.name] || tipo.type.name
              ),
            };
          })
        );

        setPokemon(lista);
      })
      .catch(() => {
        setError(
          "No se pudieron cargar los Pokémon. Revisa tu conexión a internet e inténtalo nuevamente."
        );
      })
      .finally(() => setCargando(false));
  }, []);

  // Permite buscar usando el nombre en español.
  const filtrados = pokemon.filter((elemento) =>
    elemento.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  if (cargando) {
    return <div className="alert alert-info" role="status">Cargando Pokémon...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <>
      <p className="text-secondary">
        Pokémon encontrados: <strong>{filtrados.length}</strong>
      </p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {filtrados.map((elemento) => (
          <div className="col" key={elemento.id}>
            <article className="card h-100 shadow-sm tarjeta">
              <img
                className="card-img-top imagen-personaje"
                src={elemento.imagen}
                alt={`Imagen de ${elemento.nombre}`}
                loading="lazy"
              />
              <div className="card-body">
                <h3 className="card-title h5">{elemento.nombre}</h3>
                <p className="card-text mb-2">
                  <strong>Número:</strong> #{elemento.id}
                </p>
                <p className="card-text mb-0">
                  <strong>Tipo:</strong> {elemento.tipos.join(", ")}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="alert alert-warning mt-3" role="status">
          No hay Pokémon que coincidan con esa búsqueda.
        </div>
      )}
    </>
  );
}
