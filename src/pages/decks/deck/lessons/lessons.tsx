import { FC, memo, useMemo, useState, useCallback } from 'react';
import { Lesson } from 'pages/common/lesson';
import styles from './lessons-tab.module.scss';
import { ICard } from 'domain/decks';

const CARDS_IN_LESSON = 3;

interface IProps {
  cards: ReadonlyArray<ICard>;
  cardsInLesson?: number;
}

const LessonsTab: FC<IProps> = ({ cards, cardsInLesson = CARDS_IN_LESSON }) => {

  const [lessonIndex, setLessonIndex] = useState<number>();

  const list = useMemo(
    () => [...Array(Math.ceil(cards.length / cardsInLesson)).keys()],
    [cards],
  );

  const lesson = useCallback(
    (index: number) => {
      const from = (index - 1) * cardsInLesson;
      return cards
        .slice(from, from + cardsInLesson)
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
