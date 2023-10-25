import axios from "axios";
import { useEffect, useState } from "react";

function usePokedexStates(url = undefined, pokemonId = undefined) {
  const [pokedexState, setPokedexState] = useState({
    pokemonList: [],
    isLoading: true,
    prev: "",
    next: "",
    pokedexUrl: url ? url : "https://pokeapi.co/api/v2/pokemon/",
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
    // filtering according recommended pokemons or list page
    let pokemonResults;
    if (url) {
      pokemonResults = response.data.pokemon;
      pokemonResults = pokemonResults.filter((p) => {
        const urlArray = p.pokemon.url.split("/");
        const id = urlArray[urlArray.length - 2];

        return pokemonId != id;
      });
      pokemonResults = shufflePokemons(pokemonResults);
      pokemonResults = pokemonResults.slice(0, 4);
    } else {
      pokemonResults = response.data.results;
    }

    // pokemons according searching
    if (pokedexState.searchText) {
      pokemonResults = pokemonResults.filter((p) =>
        p.name.includes(pokedexState.searchText.toLowerCase())
      );
      console.log(pokemonResults);
    }

    // promise array of 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) => {
      if (url) {
        return axios.get(pokemon.pokemon.url);
      } else {
        return axios.get(pokemon.url);
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

  function shufflePokemons(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    getPokemons();
  }, [pokedexState.pokedexUrl, pokedexState.searchText]);

  return [pokedexState, setPokedexState];
}
export default usePokedexStates;
