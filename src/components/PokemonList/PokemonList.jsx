import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokedexStates from "../../hooks/usePokedexStates";

function PokemonList({ pagination = true, url = "" }) {
  const [pokedexState, setPokedexState] = usePokedexStates(url);
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
            {pagination && (
              <>
                <div className="controls d-flex justify-content-center">
                  <button
                    className="btn btn-primary mx-2"
                    disabled={pokedexState.prev == null}
                    onClick={() =>
                      setPokedexState((state) => ({
                        ...state,
                        pokedexUrl: pokedexState.prev,
                      }))
                    }
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    disabled={pokedexState.next == null}
                    onClick={() =>
                      setPokedexState((state) => ({
                        ...state,
                        pokedexUrl: pokedexState.next,
                      }))
                    }
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PokemonList;
