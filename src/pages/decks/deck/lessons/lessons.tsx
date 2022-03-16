import { memo, useMemo, useState, useCallback } from 'react';
import { Lesson } from 'pages/common/lesson';
import { useDeck } from '../useDeck';
import styles from './lessons-tab.module.scss';

const CARDS_IN_LESSON = 3;

const LessonsTab = () => {
  const { cards } = useDeck();

  const [lessonIndex, setLessonIndex] = useState<number>();

  const list = useMemo(
    () => [...Array(Math.ceil(cards.length / CARDS_IN_LESSON)).keys()],
    [cards],
  );

  const lesson = useCallback(
    (index: number) => {
      const from = (index - 1) * CARDS_IN_LESSON;
      return cards
        .slice(from, from + CARDS_IN_LESSON)
        .map(e => ({ question: e.front, answer: e.back }));
    },
    [cards],
  );

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {
          list.map(el => (
            <li key={el} className={styles.item}>
              <button
                type='button'
                className={styles.card}
                onClick={() => setLessonIndex(el + 1)}
              >{el + 1}</button>
            </li>
          ))
        }
      </ul>
      {
        typeof lessonIndex === 'number' ? (
          <Lesson
            lesson={lesson(lessonIndex)}
            onClose={() => setLessonIndex(undefined)}
          />
        ) : null
      }
    </div>
  );
}

export default memo(LessonsTab);
