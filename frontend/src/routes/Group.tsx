import { useState } from "react";

export default function Group() {
    let [movie, setMovie] = useState("");
    function handleChange(event: any) {
        setMovie(event.target.value);
    }
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(movie);
        // send off a request to actually add a movie to the db when that's implemented
    }
    return (
        <div>
            Suggest a movie 
            <form onSubmit={handleSubmit}>
                <input type="text" value={movie} onChange={handleChange}></input>
                <button>Submit </button>
            </form>
        </div>
    )
}