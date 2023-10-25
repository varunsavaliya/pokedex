import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetailStates(id, pokemonName) {
  const [pokemonDetailStates, setPokemonDetailStates] = useState({
    pokemon: {},
    isLoading: true,
  });

  async function getPokemon() {
    setPokemonDetailStates((state) => ({ ...state, isLoading: true }));
    let response;
    try {
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const data = response.data;
      const pokemon = {
        name: data.name,
        weight: data.weight,
        images: [
          data.sprites.other.dream_world.front_default,
          data.sprites.other.home.front_default,
          data.sprites.front_default,
        ],
        height: data.height,
        types: data.types,
      };
      setPokemonDetailStates((state) => ({
        ...state,
        pokemon: pokemon,
        isLoading: false,
      }));
    } catch (error) {
      console.log('Something went wrong');
    }
  }

  useEffect(() => {
    getPokemon();
  }, [id]);

  return [pokemonDetailStates];
}

export default usePokemonDetailStates;
