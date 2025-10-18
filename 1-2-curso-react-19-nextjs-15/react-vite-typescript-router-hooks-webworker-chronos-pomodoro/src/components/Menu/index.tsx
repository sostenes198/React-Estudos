import styles from './styles.module.css';
import {HistoryIcon, HouseIcon, SettingsIcon, SunIcon} from 'lucide-react';
import {useState} from 'react';
import * as React from 'react';

type AvailableThemes = 'dark' | 'light'

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>('dark');

    function handleChangeTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();

        console.log('Clicado');
    }


    return (
        <nav className={styles.menu}>
            <h1>{theme}</h1>
            <a
                className={styles.menuLink}
                href="#"
                aria-label={'Ir para Home'}
                title={'Ir para Home'}>
                <HouseIcon/>
            </a>
            <a
                className={styles.menuLink}
                href="#" aria-label={'Ver Histórico'}
                title={'Ver Histórico'}>
                <HistoryIcon/>
            </a>
            <a
                className={styles.menuLink}
                href="#"
                aria-label={'Configurações'}
                title={'Configurações'}>
                <SettingsIcon/>
            </a>
            <a
                className={styles.menuLink}
                href="#"
                aria-label={'Mudar Tema'}
                title={'Mudar Tema'}
                onClick={handleChangeTheme}>
                <SunIcon/>
            </a>
        </nav>
    );
}