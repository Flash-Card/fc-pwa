import { FC, memo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { TextField, TextAreaField } from 'components/Form';
import styles from './form.module.scss';

interface IProps {
  front: string;
  back: string;
  note?: string;
  hidden?: boolean;
}

const FormCard: FC<FormRenderProps<IProps>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name='front' component={TextField} title='Front' autoCapitalize="off" />
      <Field name='back' component={TextField} title='Back' autoCapitalize="off" />
      <Field name='note' component={TextAreaField} title='Note' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormCard);
