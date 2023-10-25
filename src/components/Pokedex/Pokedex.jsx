import { useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="pokedex-wrapper d-flex flex-column align-items-center justify-content-center">
      <Search
        handleSearch={setSearchText}
      />
      { !searchText ? <PokemonList /> : <PokemonDetails key={searchText} pokemonName={searchText} />}
    </div>
  );
}

export default Pokedex;
