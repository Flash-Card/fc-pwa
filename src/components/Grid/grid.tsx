import { FC, memo, ReactNode } from 'react';
import './grid.scss';

export interface IGrid<T> {
  list: Array<T>;
  renderItem(data: T): ReactNode;
}

type TProps<T = { id: string }> = IGrid<T>;

const Grid: FC<TProps> = ({ list, renderItem }) => {
  return (
    <ul className="grid__container">
      {
        list.map(e => 
          <li key={e.id} className="grid__item">
            {
              renderItem(e)
            }
          </li>
        )
      }
    </ul>
  );
}

export default memo(Grid);
