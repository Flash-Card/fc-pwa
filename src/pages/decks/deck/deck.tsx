import { memo, useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CardsTab } from './cards';
import { LessonsTab } from './lessons'
import { TabHead } from 'components/Tab';
import { useDeck } from './useDeck';
import { CreateCard } from './create';
import styles from './deck.module.scss';

const TABS = [
  { id: '', title: 'Lesson' },
  { id: 'cards', title: 'Cards' },
  { id: 'quiz', title: 'Quiz' },
];

const Deck = () => {

  const { cards, deck } = useDeck();
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{deck.name}</h2>
        <button type="button" className={styles.add} onClick={toggleCreate} />
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
      <Routes>
        <Route index element={<LessonsTab />} />
        <Route path='cards' element={<CardsTab cards={cards} />} />
      </Routes>
    </div>
  );
}

export default memo(Deck);
