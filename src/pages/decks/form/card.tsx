import { FC, memo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { TextField, TextAreaField, SwitchField } from 'components/Form';
import { ICard } from 'domain/decks';
import styles from './form.module.scss';

const FormCard: FC<FormRenderProps<ICard>> = ({ handleSubmit }) => {
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
