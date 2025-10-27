import styles from './styles.module.css';
import { TimerIcon } from 'lucide-react';
import {RouterLink} from '../RouterLink';

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles.logoLink} href="#">
        <TimerIcon /> Chronos
      </RouterLink>
    </div>
  );
}