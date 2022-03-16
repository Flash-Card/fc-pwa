import { FC, memo, useReducer, useMemo } from 'react';
import { ICards } from 'domain/decks';
import { FlipCard, Card } from 'components/Card';
import { IDackAction, IDeckState, EDackActionType } from './types';
import styles from './cards-tab.module.scss';

function reducer(state: IDeckState, action: IDackAction) {
  switch (action.type) {
    case EDackActionType.INCREMENT:
      return { count: state.count + 1, flip: false };
    case EDackActionType.DECREMENT:
      return { count: state.count - 1, flip: false };
    case EDackActionType.FLIP: {
      return { ...state, flip: !state.flip };
    }
    default:
      throw new Error();
  }
}

const initialArg = {
  count: 0,
  flip: false,
}

interface IProps {
  cards: ReadonlyArray<ICards>;
}

const CardsTab: FC<IProps> = ({ cards }) => {
  const [state, dispatch] = useReducer(reducer, initialArg);
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
        <button type='button' className={styles.prev} disabled={!item.hasPrev} onClick={() => dispatch({ type: EDackActionType.DECREMENT })} />
        <button type='button' className={styles.flip} onClick={() => dispatch({ type: EDackActionType.FLIP })} />
        <button type='button' className={styles.next} disabled={!item.hasNext} onClick={() => dispatch({ type: EDackActionType.INCREMENT })} />
      </div>
    </div>
  )
}

export default memo(CardsTab);
