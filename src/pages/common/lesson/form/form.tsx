import { FC, memo } from 'react';
import cx from 'classnames';
import { Field } from 'react-final-form';
import styles from './form.module.scss';

interface IProps {
  handleSubmit(): void;
}

const LessonForm: FC<IProps> = ({ handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field
        name='answer'
        render={({ input }) => (
          <input
            className={styles.field}
            {...input}
            placeholder="Enter the answer"
            autoCapitalize="off"
            autoFocus
          />
        )}
      />
      <div className={styles.group}>
        <button className={cx(styles.btn, styles.skip)} type="button">I don't know</button>
        <button className={cx(styles.btn, styles.done)} type='submit'>Ok</button>
      </div>
    </form>
  );
}

export default memo(LessonForm);
