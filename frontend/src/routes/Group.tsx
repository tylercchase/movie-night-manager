import { useState } from "react";
import { toast } from "react-toastify";

export default function Group() {
    let [movie, setMovie] = useState("");
    function handleChange(event: any) {
        setMovie(event.target.value);
    }
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(movie);
        let url = 'http://127.0.0.1:5000/api/add';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'movie': {name: movie, poster: ''}, group: 'gamer' })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error){
                    toast.error('Someone has already submitted this movie', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success('Movie submitted!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
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