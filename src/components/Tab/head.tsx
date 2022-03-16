import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './tab-header.module.scss';

interface IProps<T> {
  data: ReadonlyArray<T>;
  getPath(data: T): string;
  getTitle(data: T): string;
  getKey(data: T): string;
}

function TabHead<T>({ data, getPath, getTitle, getKey }: IProps<T>) {

  const getClassName = useCallback(
    ({ isActive }) => cx(styles.tab, { [styles.active]: isActive }),
    [],
  );

  return (
    <ul className={styles.container}>
      {
        data.map(el => (
          <li key={getKey(el)} className={styles.item}>
            <NavLink
              end
              className={getClassName}
              to={getPath(el)}
            >{getTitle(el)}</NavLink>
          </li>
        ))
      }
    </ul>
  )
}

export default memo(TabHead);
