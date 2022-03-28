import { FC, memo, useReducer, useMemo, useCallback } from 'react';
import { ICard } from 'domain/decks';
import { useLocation } from 'react-router-dom';
import { FlipCard, Card } from 'components/Card';
import { MorePic, IPickerItem } from 'components/MorePick';
import { EditCard } from '../edit';
import { reducer, getInitialState, TDackReducer, EDackActionType } from './reducer';
import styles from './cards-tab.module.scss';

interface IProps {
  cards: ReadonlyArray<ICard>;
}

const OPTIONS: ReadonlyArray<IPickerItem<EDackActionType>> = [
  { value: EDackActionType.START_EDIT, title: 'EditCard' },
]

function getIndexByHash(list: ReadonlyArray<ICard>, hash: string): number {
  return list.findIndex(f => f.id === hash.slice(1));
}

const CardsTab: FC<IProps> = ({ cards }) => {
  const { hash } = useLocation();
  
  const [state, dispatch] = useReducer<TDackReducer>(
    reducer,
    getInitialState(getIndexByHash(cards, hash)),
  );

  const action = useCallback(
    (type: EDackActionType) => () => dispatch({ type }),
    [dispatch],
  );

  const item = useMemo(
    () => {
      const data = cards[state.count];
      return data && {
        front: (<Card text={data.front}/>),
        back: (<Card text={data.back}/>),
        hasPrev: state.count > 0,
        hasNext: state.count < (cards.length - 1),
      }
    },
    [state.count, cards],
  );

  const handleChange = useCallback(
    (item: IPickerItem<EDackActionType>) => {
      action(item.value)();
    },
    [action],
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FlipCard front={item.front} back={item.back} isFlipped={state.flip} />
        <MorePic list={OPTIONS} onSelect={handleChange} className={styles.pick} />
      </div>
      <div className={styles.bar}>
        <button type='button' className={styles.prev} disabled={!item.hasPrev} onClick={action(EDackActionType.DECREMENT)} />
        <button type='button' className={styles.flip} onClick={action(EDackActionType.FLIP)} />
        <button type='button' className={styles.next} disabled={!item.hasNext} onClick={action(EDackActionType.INCREMENT)} />
      </div>
      {
        state.isEdit ? (
          <EditCard item={cards[state.count]} onComplete={action(EDackActionType.FINISH_EDIT)} />
        ) : null
      }
    </div>
  );
}

export default memo(CardsTab);
