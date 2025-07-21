/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMovie} from '../../hooks/Movie';
import {useParams} from 'react-router';
import style from './movie.detail.module.css';

export function MovieDetail() {
    const {id} = useParams();
    const movie: any = useMovie(id!);
    return (
        <>
            <section className={style['movie']}>
                <figure className={style['imgContainer']}>
                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title}/>
                </figure>

                <h1 className={style['movieTitle']}>{movie.title}</h1>
                <p>{movie.overview}</p>
            </section>
        </>
    );
}