import {Http} from '../config/Http';

export class MoviesDbService {
    public static async getPopularMovies() {
        const {data} = await Http.moviesApi.get('movie/popular');
        return data;
    }

    public static async getMovie(movieId: string) {
        const {data} = await Http.moviesApi.get(`movie/${movieId}`);
        return data;
    }
}