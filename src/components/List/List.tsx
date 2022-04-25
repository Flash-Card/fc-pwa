import { FC, memo, ReactElement } from 'react';
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
    <div className='view-list__wrapper'>
      <ul className='view-list__container'>
        {
          list.map(el => (
            <li key={getKey(el)} className='view-list__item'>{renderItem(el)}</li>
            ))
          }
      </ul>
    </div>
  );
}

export default memo(List);
