import { FC, memo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { TextField, TextAreaField, SwitchField } from 'components/Form';
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
      <Field name='front' component={TextField} label='Front' autoCapitalize="off" />
      <Field name='back' component={TextField} label='Back' autoCapitalize="off" />
      <Field name='hidden' component={SwitchField} label='Hide cards' />
      <Field name='note' component={TextAreaField} label='Note' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormCard);
