import { FC, memo } from 'react';
import { Field } from 'react-final-form';
import { TextField, formatNumber } from 'components/Form';
import styles from './form.module.scss';

interface IProps {
  handleSubmit(): void;
}

const FormDeck: FC<IProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name='name' component={TextField} label='Name' />
      <Field
        name='cardsInLesson'
        component={TextField}
        label='Cards in Lesson'
        inputMode="numeric"
        type='number'
        min={3}
      />
      <Field name='decription' component={TextField} label='Decription' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormDeck);
