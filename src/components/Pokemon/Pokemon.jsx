import './Pokemon.css'

function Pokemon({ name, image }) {
    return (
        <>
            <div className="col-3">
                <div className="card pokemon-wrapper">
                    <img src={image} className="card-img-top pokemon-image p-3" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title pokemon-name">{name}</h5>
                        <a href="#" className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pokemon