export default function Buscador({ busqueda, setBusqueda }) {
  // busqueda y setBusqueda llegan desde App como props.
  // value mantiene el input sincronizado con el estado de React.
  // onChange se ejecuta cada vez que el usuario escribe o borra texto.
  return (
    <div className="mb-4">
      <label htmlFor="busqueda-pokemon" className="form-label">
        Nombre del Pokémon
      </label>
      <input
        id="busqueda-pokemon"
        className="form-control form-control-lg"
        type="search"
        placeholder="Ejemplo: Bulbasaur, Ivysaur, Venusaur..."
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        aria-label="Buscar Pokémon por nombre"
      />
      <div className="form-text">
        La lista se filtra automáticamente mientras escribes.
      </div>
    </div>
  );
}
