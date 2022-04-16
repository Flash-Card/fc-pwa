import { FC, memo, useReducer, useMemo, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import get from 'lodash/get';
import { useAppDispatch } from 'domain/index';
import { updateCard, deleteCard, ICard } from 'domain/decks';
import { FlipCard, Card } from 'components/card';
import { MorePic, IPickerItem } from 'components/MorePick';
import { EditCard } from '../edit';
import { TransferCard } from '../transfer';
import { reducer, getInitialState, TDackReducer, ECardActionType, setCounter } from './reducer';
import styles from './cards-tab.module.scss';

interface IProps {
  cards: ReadonlyArray<ICard>;
}

const OPTIONS: ReadonlyArray<IPickerItem<ECardActionType>> = [
  { value: ECardActionType.START_EDIT, title: 'Edit Card' },
  { value: ECardActionType.DELETE, title: 'Delete Card' },
  { value: ECardActionType.START_TRANSFER, title: 'Transfer Card to:' },
  { value: ECardActionType.HIDE, title: 'Hide Card' },
  { value: ECardActionType.SHOW, title: 'Show Card' },
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

  useEffect(
    () => {
      if (hash.length) {
        dispatch(setCounter(getIndexByHash(cards, hash)));
      }
    },
    [hash, cards],
  );

  const action = useCallback(
    (type: ECardActionType) => () => {
      if (type !== ECardActionType.SET_COUNTER) {
        dispatch({ type });
      }
    },
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
    [card, state.count, cards],
  );

  const handleChange = useCallback(
    (item: IPickerItem<ECardActionType>) => {
      if (item.value === ECardActionType.DELETE) {
        disp(deleteCard(card));
      } else if (item.value === ECardActionType.HIDE) {
        disp(updateCard({ ...card, hidden: true }));
      } else if (item.value === ECardActionType.SHOW) {
        disp(updateCard({ ...card, hidden: false }));
      } else {
        action(item.value)();
      }
    },
    [action, card],
  );

  const options = useMemo(
    () => OPTIONS.filter(f => f.value !== (card?.hidden ? ECardActionType.HIDE : ECardActionType.SHOW)),
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
              <button type='button' className={styles.prev} disabled={!item.hasPrev} onClick={action(ECardActionType.DECREMENT)} />
              <button type='button' className={styles.flip} onClick={action(ECardActionType.FLIP)} />
              <button type='button' className={styles.next} disabled={!item.hasNext} onClick={action(ECardActionType.INCREMENT)} />
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
            onComplete={action(ECardActionType.FINISH_EDIT)}
          />
        ) : null
      }
      {
        state.isTransfering ? (
          <TransferCard
            item={card}
            onComplete={action(ECardActionType.FINISH_TRANSFER)}
          />
        ) : null
      }
    </div>
  );
}

export default memo(CardsTab);
