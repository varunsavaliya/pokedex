import axios from "axios";
import { useEffect } from "react";
import "./PokemonList.css";

function PokemonList() {
  const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";
  async function getPokemons() {
    const response = await fetch(POKEDEX_URL);
    console.log(response);
  }

  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <>
      <div className="pokemon-list-wrapper"></div>
    </>
  );
}

export default PokemonList;
