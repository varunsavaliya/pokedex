import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import './PokemonDetails.css'

function PokemonDetails() {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    async function getPokemon() {
        setIsLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = response.data
        console.log(data);
        const pokemon = {
            name: data.name,
            weight: data.weight,
            images: [data.sprites.other.dream_world.front_default, data.sprites.other.home.front_default, data.sprites.front_default],
            height: data.height,
            types: data.types.map((t) => t.type.name)
        }
        setPokemon(pokemon)
        setIsLoading(false)
    }

    useEffect(() => {
        getPokemon()
    }, [])
    return (
        <>
            {isLoading ? 'Loading....' :
                <>
                    <hr />
                    <div className="pokemon-detail-wrapper d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between">
                            <h3 className="mx-3 text-decoration-none"><Link to="/">Back</Link></h3>
                            <h3 className="pokemon-name mb-3 mx-3">  {pokemon.name} </h3>
                        </div>


                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                {pokemon.images.map((i, index) => (
                                    <div
                                        key={i}
                                        className={index === 0 ? "carousel-item active" : "carousel-item"}
                                        data-bs-interval="10000"
                                    >
                                        <img src={i} className="pokemon-image d-block w-100" alt={`Pokemon ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className="pokemon-weight my-3">Weight: {pokemon.weight}</div>
                        <div className="pokemon-height my-3">Height: {pokemon.height}</div>
                        <div className="pokemon-types">
                            {pokemon.types && pokemon.types.map((t) => <span key={t} className="badge rounded-pill bg-secondary mx-1">{t}</span>)}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PokemonDetails