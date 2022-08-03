import Movie from "./movie"

export default interface Group {
    nights: {
        movies: Movie[];
        title: string
    }
    movies: Movie[]
}