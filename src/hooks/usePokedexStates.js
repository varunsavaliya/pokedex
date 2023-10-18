import axios from "axios";
import { useEffect, useState } from "react";

function usePokedexStates(url) {
  const [pokedexState, setPokedexState] = useState({
    pokemonList: [],
    isLoading: true,
    prev: "",
    next: "",
    pokedexUrl: url == "" ? "https://pokeapi.co/api/v2/pokemon/" : url,
  });

  async function getPokemons() {
    setPokedexState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokedexState.pokedexUrl); // get data from api
    setPokedexState((state) => ({
      ...state,
      prev: response.data.previous,
      next: response.data.next,
    }));

    // result have 20 pokemons name and url
    let pokemonResults;
    if (url) {
      pokemonResults = response.data.pokemon.slice(0, 4);
    } else {
      pokemonResults = response.data.results;
    }
    
    // promise array of 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) => {
      if (url) {
        return axios.get(pokemon.pokemon.url);
      }else{
        return axios.get(pokemon.url)
      }
    });

    const pokemonData = await axios.all(pokemonResultsPromise);

    // mapping of 20 pokemons data
    const result = pokemonData.map((p) => {
      const pokemon = p.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    setPokedexState((state) => ({
      ...state,
      pokemonList: result,
      isLoading: false,
    }));
  }

  useEffect(() => {
    getPokemons();
  }, [pokedexState.pokedexUrl]);

  return [pokedexState, setPokedexState];
}
export default usePokedexStates;
