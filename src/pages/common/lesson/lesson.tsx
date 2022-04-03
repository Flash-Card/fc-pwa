import { FC, memo, useCallback, useState, useRef } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { CardSlider } from 'components/card';
import { LessonForm } from './form';
import { Container } from 'pages/common/container';
import { quiz, compare } from './helpers';
import { IQuestion, IAnswer, IState } from './types';
import styles from './lesson.module.scss';

interface IProps {
  lesson: ReadonlyArray<IQuestion>;
  onClose(): void;
}

const DELLAY_AFTER_ANSWER = 1800;

const Lesson: FC<IProps> = ({ lesson, onClose }) => {

  const refq = useRef(quiz(lesson));
  const [state, setState] = useState<IState>(() => ({ item: refq.current.next(true).value }));

  const handleComplete = useCallback(
    () => {
      onClose();
    },
    [onClose],
  );

  const handleAnswer = useCallback(
    (res: IAnswer) => {
      const status = compare(res.answer, state.item.answer);
      setState((s) => ({ ...s, status }));
      setTimeout(() => {
        const { done, value } = refq.current.next(status);
        if (done) {
          handleComplete();
        } else {
          setState({ item: value });
        }
      }, DELLAY_AFTER_ANSWER);
    },
    [setState, state],
  );

  const renderForm = useCallback(
    ({ handleSubmit, form }: FormRenderProps<IAnswer>) => (
      <LessonForm
        handleSubmit={handleSubmit}
        lesson={state.item}
        form={form}
      />
    ),
    [state],
  );

  return (
    <Container onClose={onClose} name="Lesson">
      <div className={styles.content}>
        <CardSlider id={state.item.question} status={state.status}>
          <div className={styles.card}>{state.item.question}</div>
        </CardSlider>
        <Form
          onSubmit={handleAnswer}
          render={renderForm}
        />
      </div>
    </Container>
  );
}

export default memo(Lesson);
