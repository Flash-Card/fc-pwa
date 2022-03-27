import { FC, memo, useCallback, useState, useRef, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useKeyboard } from 'lib/useKeyboard';
import { ModalPortal, Popup } from 'components/Popup';
import { CardSlider } from 'components/Card'
import { LessonForm } from './form';
import { quiz, compare } from './helpers';
import { IQuestion, IAnswer, IState } from './types';
import styles from './lesson.module.scss';

interface IProps {
  lesson: ReadonlyArray<IQuestion>;
  onClose(): void;
}

const Lesson: FC<IProps> = ({ lesson, onClose }) => {

  const { refPropxy } = useKeyboard();
  const refq = useRef(quiz(lesson));
  const [currentItem, setCurrentItem] = useState<IState>(() => ({ item: refq.current.next(true).value }));

  const handleAnswer = useCallback(
    (res) => {
      const status = compare(res.answer, currentItem.item.answer)
      const { done, value } = refq.current.next(status);
      if (done) {
        onClose();
      } else {
        setCurrentItem({
          item: value,
          status,
        });
      }
    },
    [currentItem],
  );

  const renderForm = useCallback(
    ({ handleSubmit, form }: FormRenderProps<IAnswer>) => (
      <LessonForm
        handleSubmit={handleSubmit}
        lesson={currentItem.item}
        form={form}
      />
    ),
    [currentItem],
  );

  return (
    <ModalPortal>
      <Popup
        name='Lesson'
        className={styles.container}
        refProxy={el => { refPropxy(el?.parentElement); }}
      >
        <div className={styles.header}>
          <button
            type='button'
            className={styles.close}
            onClick={onClose}
            tabIndex={-1}
          />
        </div>
        <div className={styles.content}>
          <CardSlider id={currentItem.item.question}>
            <div className={styles.card}>{currentItem.item.question}</div>
          </CardSlider>
          <Form
            onSubmit={handleAnswer}
            render={renderForm}
          />
        </div>
      </Popup>
    </ModalPortal>
  );
}

export default memo(Lesson);
