import {Link} from 'react-router-dom';

export function Header() {
    return (
        <>
            <h1>Aplicação de filmes</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
            </ul>
        </>
    );
}