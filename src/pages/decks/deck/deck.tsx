import { memo, useCallback, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TabHead } from 'components/Tab';
import { CardsTab } from './cards';
import { LessonsTab } from './lessons'
import { useDeck } from './useDeck';
import { CreateCard } from './create';
import styles from './deck.module.scss';

const TABS = [
  { id: '', title: 'Lesson' },
  { id: 'cards', title: 'Cards' },
  { id: 'quiz', title: 'Quiz' },
];

const Deck = () => {

  const { cards, deck, actionSelector, editForm } = useDeck();
  const navigate = useNavigate();

  const [isCreating, setState] = useState<boolean>(false);

  const toggleCreate = useCallback(() => setState(s => !s), [useState]);

  const handleComplete = useCallback(
    (id) => {
      setState(false);
      navigate(`cards#${id}`);
    },
    [navigate],
  );

  const getPath = useCallback(
    ({ id: tabId }) => [tabId].join('/'),
    [],
  );

  const getTitle = useCallback(
    ({ title, id }) => id === 'cards' ? `${title} (${cards.length})` : title,
    [cards],
  );

  const deckSelector = useMemo(
    () => actionSelector(styles.more),
    [actionSelector],
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{deck.name}</h2>
        <div className={styles.buttons}>
          {deckSelector}
          <button type="button" className={styles.add} onClick={toggleCreate} />
        </div>
      </header>
      <TabHead
        data={TABS}
        getPath={getPath}
        getKey={({ title }) => title}
        getTitle={getTitle}
      />
      {
        isCreating ? (
          <CreateCard onCancel={toggleCreate} onComplete={handleComplete} />
        ) : null
      }
      {
        editForm
      }
      <Routes>
        <Route index element={<LessonsTab cards={cards} cardsInLesson={deck.cardsInLesson} />} />
        <Route path='cards' element={<CardsTab cards={cards} />} />
      </Routes>
    </div>
  );
}

export default memo(Deck);
