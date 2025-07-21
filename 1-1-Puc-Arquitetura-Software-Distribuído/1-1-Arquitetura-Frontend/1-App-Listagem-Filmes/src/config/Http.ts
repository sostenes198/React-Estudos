import axios from 'axios';
import {themoviedbAccessToken} from '../../env.json';

export class Http {
    public static moviesApi = axios.create({
        baseURL: 'https://api.themoviedb.org/3/',
        headers: {
            Authorization: `Bearer ${themoviedbAccessToken}`,
            'Accept': 'application/json',
        },
    });
}