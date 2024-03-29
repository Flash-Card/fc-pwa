import {
  FC,
  memo,
  useMemo,
  useCallback,
  useEffect,
  createElement,
} from "react";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { ICard } from "domain/decks";
import { FlipCard, Card } from "components/card";
import { ViewBar, EStatus } from "components/ViewBar";
import { Condition } from "components/Tab";
import { NavTab, NavButton } from "components";
import ViewList from "./List";
import { EditCard } from "../edit";
import { TransferCard } from "../transfer";
import { ECardActionType } from "./reducer";
import { useCard } from "./useCard";
import styles from "./cards-tab.module.scss";

interface CardsTabProps {
  cards: ReadonlyArray<ICard>;
}

const CardsTab: FC<CardsTabProps> = ({ cards }) => {
  const { hash } = useLocation();

  const {
    onDelete,
    onSetCounter,
    getIndex,
    state,
    card,
    onAction,
    onToggleVisibility,
  } = useCard(cards);

  useEffect(() => {
    if (hash.length) {
      onSetCounter(getIndex());
    }
  }, [hash, cards]);

  const item = useMemo(() => {
    return (
      card.id && {
        front: createElement(Card, { text: card.front }),
        back: createElement(Card, { text: card.back }),
        hasPrev: state.count > 0,
        hasNext: state.count < cards.length - 1,
      }
    );
  }, [card, state.count, cards]);

  const progress = useCallback(
    (st: EStatus) =>
      st === EStatus.GRID ? (
        <div className={styles.progress}>
          {state.count + 1} from {cards.length}
        </div>
      ) : null,
    [state, cards]
  );

  const handleSetCard = useCallback(
    (i: 1 | -1) => {
      const index = Math.min(Math.max(state.count + i, 0), cards.length - 1);
      onSetCounter(index);
    },
    [state, cards]
  );

  return (
    <div className={styles.container}>
      {item ? (
        <ViewBar defaultStatus={EStatus.GRID} getTitle={progress}>
          {(st, fn) => (
            <>
              <Condition when={st === EStatus.GRID}>
                <div
                  className={cx(styles.card, { [styles.hidden]: card.hidden })}
                >
                  <FlipCard
                    id={state.key + card.id}
                    front={item.front}
                    back={item.back}
                    isFlipped={state.flip}
                    onChange={handleSetCard}
                    onFlip={onAction(ECardActionType.FLIP)}
                  />
                </div>
              </Condition>
              <Condition when={st === EStatus.LIST}>
                <ViewList list={cards} onChange={fn(EStatus.GRID)} />
              </Condition>
            </>
          )}
        </ViewBar>
      ) : (
        <div className={styles.empty}>
          <p>It's still empty here.</p>
          <p>Please create some cards.</p>
        </div>
      )}
      <Condition when={state.isEdit}>
        <EditCard
          item={card}
          onComplete={onAction(ECardActionType.FINISH_EDIT)}
        />
      </Condition>
      <Condition when={state.isTransferring}>
        <TransferCard
          item={card}
          onComplete={onAction(ECardActionType.FINISH_TRANSFER)}
        />
      </Condition>
      <NavTab>
        {card.hidden ? (
          <NavButton title="Show" icon="pin" onClick={onToggleVisibility} />
        ) : (
          <NavButton title="Hide" icon="unpin" onClick={onToggleVisibility} />
        )}
        <NavButton
          title="Edit"
          icon="edit"
          onClick={() => onAction(ECardActionType.START_EDIT)}
        />
        <NavButton
          title="Transfer"
          icon="transfer"
          onClick={() => onAction(ECardActionType.START_TRANSFER)}
        />
        <NavButton title="Delete" icon="delete" onClick={onDelete} />
      </NavTab>
    </div>
  );
};

export default memo(CardsTab);
