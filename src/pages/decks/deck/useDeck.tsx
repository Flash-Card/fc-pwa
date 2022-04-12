import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import { useAppSelector, useAppDispatch } from 'domain/index';
import { IDeckItem, ICard, getDeckRequest, EActionType } from 'domain/decks';
import { MorePic } from 'components/MorePick';
import { EditDeck } from '../edit';

const defaultDeck = {} as IDeckItem;

const actionList = [
  { value: 'edit', title: 'Edit Deck' },
  { value: 'delete', title: 'Delete Deck' }
]

export function useDeck() {

  const { id } = useParams<{id: string}>();
  const nvigate = useNavigate();
  const dispatch = useAppDispatch();
  const deck = useAppSelector(state => id ? get(state, ['decks', id], defaultDeck) : defaultDeck);

  const [isEditDeck, setEditDeck] = useState<boolean>(false);

  useEffect(
    () => {
      if (id) dispatch(getDeckRequest(id));
    },
    [id, dispatch],
  );
  
  const cards = useMemo<ReadonlyArray<ICard>>(
    () => Object.values(get(deck, 'cards', {})),
    [deck],
  );

  const handleSelect = useCallback(
    ({ value }) => {
      if (value === 'delete') {
        dispatch({ type: EActionType.DELETE_DECK, payload: deck.id });
        nvigate('/', { replace: true });
      } else if (value === 'edit') {
        setEditDeck(true);
      }
    },
    [deck],
  );

  const actionSelector = useCallback(
    (className: string) => (
      <MorePic
        list={actionList}
        onSelect={handleSelect}
        className={className}
      />),
    [],
  );

  const editForm = useMemo(
    () => (
      isEditDeck ? (
        <EditDeck onComplete={() => setEditDeck(false)} item={deck} />
      ) : null
    ),
    [isEditDeck, deck],
  );

  return {
    deck,
    cards,
    id,
    actionSelector,
    editForm,
  };
}
