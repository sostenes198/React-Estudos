import styles from './styles.module.css';
import * as React from 'react';

type GenericHtmlProps = {
    children: React.ReactNode;
}

export function GenericHtml({children}: GenericHtmlProps) {
    return (
        <div className={styles.genericHtml}>{children}</div>
    );
}