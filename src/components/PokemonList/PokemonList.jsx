import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [prev, setPrev] = useState('')
  const [next, setNext] = useState('')
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')

  async function getPokemons() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl); // get data from api
    setPrev(response.data.previous)
    setNext(response.data.next)

    // result have 20 pokemons name and url
    const pokemonResults = response.data.results

    // promise array of 20 pokemons
    const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
    const pokemonData = await axios.all(pokemonResultsPromise)

    // mapping of 20 pokemons data
    const result = pokemonData.map((p) => {
      const pokemon = p.data
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types
      }
    })
    setPokemonList(result)
    setIsLoading(false)
  }

  useEffect(() => {
    getPokemons();
  }, [pokedexUrl]);
  return (
    <>
      <div className="pokemon-list-wrapper row g-3 my-3">
        {(isLoading) ? 'Loading....' :
          <>
            {pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}

            <div className="controls d-flex justify-content-center">
              <button className="btn btn-primary mx-2" disabled={prev == null} onClick={() => setPokedexUrl(prev)}>Previous</button>
              <button className="btn btn-primary mx-2" disabled={next == null} onClick={() => setPokedexUrl(next)}>Next</button>
            </div>
          </>
        }
      </div>
    </>
  );
}

export default PokemonList;
