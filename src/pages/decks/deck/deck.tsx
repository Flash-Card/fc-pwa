import { memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CardsTab } from './cards';
import { LessonsTab } from './lessons'
import { TabHead } from 'components/Tab';
import { useDeck } from './useDeck';
import styles from './deck.module.scss';

const TABS = [
  { id: '', title: 'Lesson' },
  { id: 'cards', title: 'Cards' },
  { id: 'quiz', title: 'Quiz' },
]

const Deck = () => {

  const { cards, deck } = useDeck();

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
      <h2 className={styles.title}>{deck.name}</h2>
      <TabHead
        data={TABS}
        getPath={getPath}
        getKey={({ title }) => title}
        getTitle={getTitle}
      />
      <Routes>
        <Route index element={<LessonsTab />} />
        <Route path='cards' element={<CardsTab cards={cards} />} />
      </Routes>
    </div>
  );
}

export default memo(Deck);
