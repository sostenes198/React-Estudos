/* eslint-disable @typescript-eslint/no-explicit-any */

import style from './movie.item.module.css';
import {Link} from 'react-router-dom';

type MovieItemProps = {
    movie: any;
};


export function MovieItem({movie}: MovieItemProps) {
    return (
        <>
            <div className={style['movie']}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title}/>
                <h3>{movie.title}</h3>
                <p>
                    <Link className={style['details-btn']} to={`/movies/${movie.id}`}> Ver detalhes</Link>
                </p>
            </div>
        </>
    );
}