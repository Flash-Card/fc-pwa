import { FC, memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './menu.module.scss';

interface IProps {
}

const Menu: FC<IProps> = () => {

  const handleLink = useCallback(
    ({ isActive }: { isActive: boolean }) => cx(styles.link, { [styles.active]: isActive }),
    [],
  );

  return (
    <nav className={styles.container}>
      <ul>
        <li className={styles.item}>
          <NavLink className={handleLink} to="/">Decks</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default memo(Menu);