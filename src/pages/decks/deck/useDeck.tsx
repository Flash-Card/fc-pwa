import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { useAppSelector, useAppDispatch } from 'domain/index';
import { IDeckItem, ICard, getDeckRequest, EActionType } from 'domain/decks';
import { MorePic } from 'components/MorePick';
import { EditDeck } from '../edit';

const defaultDeck = {} as IDeckItem;

interface IActionItem {
  value: string;
  title: string;
}

const actionList: ReadonlyArray<IActionItem> = [
  { value: 'edit', title: 'Edit Deck' },
  { value: 'delete', title: 'Delete Deck' }
]

function sortCart<C extends ICard>(field?: 'front' | 'back'): (l: ReadonlyArray<C>) => ReadonlyArray<C> {
  if (typeof field === 'undefined') return (list: ReadonlyArray<C>) => list;
  const sort = (a: C, b: C) => a[field].localeCompare(b[field]);
  return (list: ReadonlyArray<C>) => list.slice().sort(sort);
}

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
    () => sortCart(deck.sortBy)(Object.values(get(deck, 'cards', {}))),
    [deck],
  );

  const handleSelect = useCallback(
    ({ value }: IActionItem) => {
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
