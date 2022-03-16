import { FC, memo, useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import { subscribe, isSupported } from 'on-screen-keyboard-detector';
import { ModalPortal, Popup } from 'components/Popup';
import { LessonForm } from './form';
import styles from './lesson.module.scss';

interface IQuestion {
  question: string;
  answer: string;
}

interface IProps {
  lesson: ReadonlyArray<IQuestion>;
  onClose(): void,
}

const Lesson: FC<IProps> = ({ lesson, onClose }) => {
  const [current, setCurrent] = useState<number>(0);
  const container = useRef<HTMLElement | null>();

  const { question } = useMemo(
    () => lesson[current],
    [current, lesson],
  );

  const handleAnswer = useCallback(
    ({ answer }) => {
      console.log(answer);
    },
    [],
  );

  const keybordHandler = useCallback(
    (visibility: 'visible' | 'hidden') => {
      if (visibility === 'visible' && container.current) {
        const height = visualViewport.height;
        window.scrollTo(0, 0)
        container.current.style.height = height + 'px';
      }
      if (visibility === 'hidden' && container.current) {
        container.current.removeAttribute('style');
      }
    },
    [],
  );

  const refPropxy = useCallback(
    (el: HTMLDivElement) => {
      container.current = el?.parentElement;
    },
    [],
  );

  useEffect(() => {
    if (isSupported()) {
      var unsubscribe = subscribe(keybordHandler);
    }
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  }, []);

  return (
    <ModalPortal>
      <Popup name='Lesson' className={styles.container} refProxy={refPropxy}>
        <div className={styles.header}>
          <button type='button' className={styles.close} onClick={onClose} tabIndex={-1} />
        </div>
        <div className={styles.content}>
          <div className={styles.card}>{question}</div>
          <Form onSubmit={handleAnswer} component={LessonForm} />
        </div>
      </Popup>
    </ModalPortal>
  );
}

export default memo(Lesson);
