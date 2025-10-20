import styles from './styles.module.css';
import {HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon} from 'lucide-react';
import * as React from 'react';
import {useEffect, useState} from 'react';

type AvailableThemes = 'dark' | 'light'

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        return (localStorage.getItem('theme') as AvailableThemes) ?? 'dark';
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    }

    function handleChangeTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();

        setTheme(prevTheme => {
            return prevTheme == 'dark' ? 'light' : 'dark';
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // clean-up function
        // return () => {
        //     console.log('Olha esse componente será atualizado') // sugestão para remover settimeout ou interval que o componente definiu
        // }
    }, [theme]);


    return (
        <nav className={styles.menu}>
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
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}