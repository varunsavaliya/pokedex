import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  //   const [pokemonList, setPokemonList] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)
  //   const [prev, setPrev] = useState('')
  //   const [next, setNext] = useState('')
  //   const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [pokedexState, setPokedexState] = useState({
    pokemonList: [],
    isLoading: true,
    prev: "",
    next: "",
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
  });

  async function getPokemons() {
    setPokedexState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokedexState.pokedexUrl); // get data from api
    setPokedexState((state) => ({ ...state, prev: response.data.previous, next: response.data.next}));

    // result have 20 pokemons name and url
    const pokemonResults = response.data.results;

    // promise array of 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
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
  return (
    <>
      <div className="pokemon-list-wrapper row g-3 my-3">
        {pokedexState.isLoading ? (
          "Loading...."
        ) : (
          <>
            {pokedexState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />
            ))}

            <div className="controls d-flex justify-content-center">
              <button
                className="btn btn-primary mx-2"
                disabled={pokedexState.prev == null}
                onClick={() => setPokedexState((state)=>({...state, prev: pokedexState.prev}))}
              >
                Previous
              </button>
              <button
                className="btn btn-primary mx-2"
                disabled={pokedexState.next == null}
                onClick={() => setPokedexState((state)=>({...state, next: pokedexState.next}))}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PokemonList;
