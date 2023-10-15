import { Link } from 'react-router-dom'
import './Pokemon.css'

function Pokemon({ name, image, id }) {
    return (
        <>
            <div className="col-3">
                <div className="card pokemon-wrapper">
                    <img src={image} className="card-img-top pokemon-img p-3" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title pokemon-name">{name}</h5>
                        <Link to={`/pokemon/${id}`} className="btn btn-primary">Read more</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pokemon