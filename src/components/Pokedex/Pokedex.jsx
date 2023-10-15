import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  return (
    <div className="pokedex-wrapper d-flex flex-column align-items-center justify-content-center">
      <Search />
      <PokemonList />
    </div>
  );
}

export default Pokedex;
