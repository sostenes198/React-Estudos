/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMovies} from '../../hooks/Movie';
import style from './movies.module.css';
import {MovieItem} from '../../components/movie-item/MovieItem';

export function Movies() {
    const movies = useMovies();

    return (
        <>
            <section className={style['movies']}>
                <h1>Filmes populares</h1>

                <div className={style['movies-list']}>
                    {movies.map((movie: any, index: number) => (
                        <MovieItem key={index} movie={movie}/>
                    ))}
                </div>
            </section>
        </>
    );
}