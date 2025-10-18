import styles from './styles.module.css';
import * as React from 'react';

type DefaultButtonProps = {
    id: string;
    icon: React.ReactNode;
    color?: 'green' | 'red';
} & React.ComponentProps<'button'>

export function DefaultButton({id, icon, color = 'green', ...props}: DefaultButtonProps) {
    return (
        <>
            <button id={id} className={`${styles.button} ${styles[color]}`} {...props} >{icon}</button>
        </>
    );
}