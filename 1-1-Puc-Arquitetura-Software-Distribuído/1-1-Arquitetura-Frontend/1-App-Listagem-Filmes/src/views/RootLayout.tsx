import {Header} from '../components/Header';
import {Outlet} from 'react-router';

export function RootLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}