import { FC, memo, useReducer, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import get from 'lodash/get';
import { useAppDispatch } from 'domain/index';
import { updateCard, deleteCard, ICard } from 'domain/decks';
import { FlipCard, Card } from 'components/card';
import { MorePic, IPickerItem } from 'components/MorePick';
import { EditCard } from '../edit';
import { reducer, getInitialState, TDackReducer, EDackActionType } from './reducer';
import styles from './cards-tab.module.scss';

interface IProps {
  cards: ReadonlyArray<ICard>;
}

const OPTIONS: ReadonlyArray<IPickerItem<EDackActionType>> = [
  { value: EDackActionType.START_EDIT, title: 'Edit Card' },
  { value: EDackActionType.DELETE, title: 'Delete Card' },
  { value: EDackActionType.HIDE, title: 'Hide Card' },
  { value: EDackActionType.SHOW, title: 'Show Card' },
]

function getIndexByHash(list: ReadonlyArray<ICard>, hash: string): number {
  return list.findIndex(f => f.id === hash.slice(1));
}

const CardsTab: FC<IProps> = ({ cards }) => {
  const { hash } = useLocation();

  const disp = useAppDispatch();
  
  const [state, dispatch] = useReducer<TDackReducer>(
    reducer,
    getInitialState(getIndexByHash(cards, hash)),
  );

  const action = useCallback(
    (type: EDackActionType) => () => dispatch({ type }),
    [dispatch],
  );

  const card = useMemo<ICard>(() => get(cards, state.count, {} as ICard), [cards, state.count]);

  const item = useMemo(
    () => {
      return card.id && {
        front: (<Card text={card.front}/>),
        back: (<Card text={card.back}/>),
        hasPrev: state.count > 0,
        hasNext: state.count < (cards.length - 1),
      }
    },
    [card, state.count],
  );

  const handleChange = useCallback(
    (item: IPickerItem<EDackActionType>) => {
      if (item.value === EDackActionType.DELETE) {
        disp(deleteCard(card));
      } else if (item.value === EDackActionType.HIDE) {
        disp(updateCard({ ...card, hidden: true }));
      } else if (item.value === EDackActionType.SHOW) {
        disp(updateCard({ ...card, hidden: false }));
      } else {
        action(item.value)();
      }
    },
    [action, card],
  );

  const options = useMemo(
    () => OPTIONS.filter(f => f.value !== (card?.hidden ? EDackActionType.HIDE : EDackActionType.SHOW)),
    [card],
  );

  return (
    <div className={styles.container}>
      {
        item ? (
          <>
            <div className={cx(styles.card, { [styles.hidden]: card.hidden })}>
              <FlipCard front={item.front} back={item.back} isFlipped={state.flip} />
              <MorePic list={options} onSelect={handleChange} className={styles.pick} />
            </div>
            <div className={styles.bar}>
              <button type='button' className={styles.prev} disabled={!item.hasPrev} onClick={action(EDackActionType.DECREMENT)} />
              <button type='button' className={styles.flip} onClick={action(EDackActionType.FLIP)} />
              <button type='button' className={styles.next} disabled={!item.hasNext} onClick={action(EDackActionType.INCREMENT)} />
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <p>It's still empty here.</p>
            <p>Please create some cards.</p>
          </div>
        )
      }
      {
        state.isEdit ? (
          <EditCard
            item={card}
            onComplete={action(EDackActionType.FINISH_EDIT)}
          />
        ) : null
      }
    </div>
  );
}

export default memo(CardsTab);
