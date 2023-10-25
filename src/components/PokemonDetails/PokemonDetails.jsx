import { Link, useParams } from "react-router-dom";
import PokemonList from "../PokemonList/PokemonList";
import { FaAngleLeft } from "react-icons/fa6";
import "./PokemonDetails.css";
import usePokemonDetailStates from "../../hooks/usePokemonDetailStates";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemonDetailStates] = usePokemonDetailStates(id, pokemonName);
  return (
    <>
      {pokemonDetailStates.isLoading ? (
        "Loading...."
      ) : (
        <>
          <hr />
          <div className="pokemon-detail-wrapper d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between my-2">
              <h3 className="mx-3 text-decoration-none ">
                <Link to="/">
                  <FaAngleLeft />
                </Link>
              </h3>
              <h3 className="pokemon-name mb-3 mx-3"> {pokemonDetailStates.pokemon.name} </h3>
            </div>

            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                {pokemonDetailStates.pokemon.images.map((i, index) => (
                  <div
                    key={index}
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                    data-bs-interval="10000"
                  >
                    <img
                      src={i ? i : '../../src/assets/default-poke.png'}
                      className="pokemon-image d-block w-100"
                      alt={`Pokemon ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="pokemon-weight my-3">Weight: {pokemonDetailStates.pokemon.weight}</div>
            <div className="pokemon-height my-3">Height: {pokemonDetailStates.pokemon.height}</div>
            <div className="pokemon-types">
              {pokemonDetailStates.pokemon.types &&
                pokemonDetailStates.pokemon.types.map((t, index) => (
                  <span
                    key={index}
                    className="badge rounded-pill bg-secondary mx-1 px-3 py-2"
                  >
                    {t.type.name}
                  </span>
                ))}
            </div>
            <PokemonList pagination={false} pokemonId={id} url={pokemonDetailStates.pokemon.types ? pokemonDetailStates.pokemon.types[0].type.url : ''} />
          </div>
        </>
      )}
    </>
  );
}

export default PokemonDetails;
