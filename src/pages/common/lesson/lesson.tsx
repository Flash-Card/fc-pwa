import { FC, memo, useCallback, useState, useRef, useMemo } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { CardSlider } from 'components/card';
import { LessonForm } from './form';
import { Container } from 'pages/common/container';
import { AnswerList } from './answerList';
import { quiz, compare, answerList } from './helpers';

import { ICard } from 'domain/decks';
import { IQuestion, IAnswer, IState } from './types';

import styles from './lesson.module.scss';

interface IProps {
  lesson: ReadonlyArray<IQuestion>;
  cards: ReadonlyArray<ICard>;
  onClose(): void;
}

const DELLAY_AFTER_ANSWER = 1800;

const Lesson: FC<IProps> = ({ lesson, onClose, cards }) => {

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

  const handleSkip = useCallback(
    () => handleAnswer({ answer: '' }),
    [handleAnswer],
  );

  const renderForm = useCallback(
    ({ handleSubmit, form }: FormRenderProps<IAnswer>) => (
      <LessonForm
        handleSubmit={handleSubmit}
        lesson={state.item}
        form={form}
        onSkip={handleSkip}
      />
    ),
    [state],
  );

  const suggestion = useMemo<ReadonlyArray<IQuestion>>(
    () => {
      const index = cards.findIndex(f => f.front === state.item.question);
      return answerList(cards, index).map(({ front, back }) => ({ question: front, answer: back }));
    },
    [state, cards],
  );

  return (
    <Container onClose={onClose} name="Lesson">
      <div className={styles.content}>
        <CardSlider id={state.item.question} status={state.status}>
          <div className={styles.card}>
            <div className={styles.question}>{state.item.question}</div>
            <div className={styles.answer}>{state.item.answer}</div>
          </div>
        </CardSlider>
        {/* <Form
          onSubmit={handleAnswer}
          render={renderForm}
        /> */}
        <AnswerList onSelect={handleAnswer} suggestion={suggestion} />
      </div>
    </Container>
  );
}

export default memo(Lesson);
