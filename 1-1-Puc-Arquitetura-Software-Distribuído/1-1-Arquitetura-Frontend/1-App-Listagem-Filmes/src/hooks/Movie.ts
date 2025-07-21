import {useEffect, useState} from 'react';
import {MoviesDbService} from '../services/MoviesDbService';

export function useMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        MoviesDbService.getPopularMovies().then((data) => {
            setMovies(data.results);
        });
    }, []);

    return movies;
}

export function useMovie(movieId: string) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        MoviesDbService.getMovie(movieId).then((data) => {
            setMovie(data);
        });
    }, [movieId]);

    return movie;
}