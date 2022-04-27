import { memo, ReactElement } from 'react';
import './view-list.scss';

interface IListProps<T> {
  list: ReadonlyArray<T>;
  renderItem(el: T): ReactElement;
  getKey(el: T): string;
}

function List<T>({
  list,
  renderItem,
  getKey,
}: IListProps<T>): ReactElement {
  return (
    <ul className='view-list__container'>
      {
        list.map(el => (
          <li key={getKey(el)} className='view-list__item'>{renderItem(el)}</li>
          ))
        }
    </ul>
  );
}

export default memo(List);
