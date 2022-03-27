import { FC, memo, useReducer, useMemo, useCallback } from 'react';
import { ICards } from 'domain/decks';
import { FlipCard, Card } from 'components/Card';
import { reducer, initialArg, TDackReducer, EDackActionType } from './reducer';
import styles from './cards-tab.module.scss';

interface IProps {
  cards: ReadonlyArray<ICards>;
}

const CardsTab: FC<IProps> = ({ cards }) => {
  const [state, dispatch] = useReducer<TDackReducer>(reducer, initialArg);
  
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

  return (
    <div className={styles.container}>
      <FlipCard front={item.front} back={item.back} isFlipped={state.flip} />
      <div className={styles.bar}>
        <button type='button' className={styles.prev} disabled={!item.hasPrev} onClick={action(EDackActionType.DECREMENT)} />
        <button type='button' className={styles.flip} onClick={action(EDackActionType.FLIP)} />
        <button type='button' className={styles.next} disabled={!item.hasNext} onClick={action(EDackActionType.INCREMENT)} />
      </div>
    </div>
  )
}

export default memo(CardsTab);
