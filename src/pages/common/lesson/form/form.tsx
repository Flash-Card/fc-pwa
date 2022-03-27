import { FC, memo, ReactNode, useCallback, useEffect } from 'react';
import cx from 'classnames';
import { FormApi } from 'final-form';
import { Field, FieldRenderProps } from 'react-final-form';
import { IQuestion, IAnswer } from '../types';
import styles from './form.module.scss';

interface IProps {
  handleSubmit(): void;
  lesson: IQuestion;
  form: FormApi<IAnswer>;
}

const LessonForm: FC<IProps> = ({ handleSubmit, lesson, form }) => {

  const renderField = useCallback(
    ({ input }: FieldRenderProps<string>): ReactNode => (
      <input
        className={styles.field}
        {...input}
        placeholder="Enter the answer"
        autoCapitalize="off"
        autoFocus
      />
    ),
    [],
  );

  useEffect(() => { form.reset(); }, [lesson]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name='answer' render={renderField} />
      <div className={styles.group}>
        <button className={cx(styles.btn, styles.skip)} type="button">I don't know</button>
        <button className={cx(styles.btn, styles.done)} type='submit'>Ok</button>
      </div>
    </form>
  );
}

export default memo(LessonForm);
