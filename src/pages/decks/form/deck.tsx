import { FC, memo } from 'react';
import { Field } from 'react-final-form';
import { TextField } from 'components/Form';
import styles from './form.module.scss';


interface IProps {
  handleSubmit(): void;
}

const FormDeck: FC<IProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name='name' component={TextField} title='Name' />
      <Field name='decription' component={TextField} title='Decription' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormDeck);
