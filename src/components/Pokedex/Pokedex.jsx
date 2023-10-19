import usePokedexStates from "../../hooks/usePokedexStates";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  const [pokedexState, setPokedexState] = usePokedexStates();

  function handleSearch(searchText) {
    setPokedexState((state)=>( {...state, searchText: searchText }));
  }
  return (
    <div className="pokedex-wrapper d-flex flex-column align-items-center justify-content-center">
      <Search
        searchText={pokedexState.searchText}
        handleSearch={handleSearch}
      />
      <PokemonList />
    </div>
  );
}

export default Pokedex;
