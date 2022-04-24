import { FC, memo, useCallback } from 'react';
import { ICard } from 'domain/decks';
import { ViewList, LinkItem } from 'components/List';

interface IProps {
  list: ReadonlyArray<ICard>;
  onChange(): void;
}

const List: FC<IProps> = ({ list, onChange }) => {
  const renderItem = useCallback(
    (el: ICard) => (
      <LinkItem
        to={`#${el.id}`}
        title={el.front}
        onClick={onChange}
      />
    ),
    [],
  );

  return (
    <ViewList list={list} getKey={(el: ICard) => el.id} renderItem={renderItem} />
  );
}

export default memo(List);