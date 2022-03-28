import { FC, memo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { TextField } from 'components/Form';
import styles from './form.module.scss';


interface IProps {
  front: string;
  back: string;
}

const FormCard: FC<FormRenderProps<IProps>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name='front' component={TextField} title='Front' />
      <Field name='back' component={TextField} title='Back' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormCard);
