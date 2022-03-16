import { FC, memo } from 'react';
import Card from './card/card';
import styles from './grid.module.scss';

export interface IGrid {
  list: Array<{ title: string, id: string }>;
  createPath(id: string): string;
}

interface IProps extends IGrid {}

const Grid: FC<IProps> = ({ list, createPath }) => {
  return (
    <ul className={styles.container}>
      {
        list.map(e => 
          <li key={e.title} className={styles.item}>
            <Card {...e} path={createPath(e.id)} />
          </li>
        )
      }
    </ul>
  );
}

export default memo(Grid);
