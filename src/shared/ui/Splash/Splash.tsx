import styles from './Splash.module.css';
import clsx from 'clsx';

export function Splash() {
  return (
    <div className={clsx(styles.container)}>
      <span className={clsx(styles.loader)} />
    </div>
  );
}