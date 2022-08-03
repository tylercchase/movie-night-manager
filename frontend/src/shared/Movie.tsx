import './Movie.css'
export default function Movie({thing}: any) {
    return (
        <div className='movie'>
            <img className="poster" src={thing.poster} alt={`Poster of ${thing.name}`}/>
            <span>{thing.name}</span>
        </div>
    )
}