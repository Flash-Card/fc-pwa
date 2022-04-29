import { FC, memo, useMemo } from 'react';
import { Field } from 'react-final-form';
import { TextField, SelectField, TextAreaField } from 'components/Form';
import styles from './form.module.scss';

interface IProps {
  handleSubmit(): void;
}

interface IOption {
  value: string;
  label: string;
}

const FormDeck: FC<IProps> = ({ handleSubmit }) => {

  const sortOptions = useMemo(
    () => [
      { value: 'id', label: 'unsorted' },
      { value: 'front', label: 'Front' },
      { value: 'back', label: 'Back' },
    ],
    [],
  );

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
      <Field
        name='sortBy'
        component={SelectField}
        label='Sort By'
        options={sortOptions}
        getLabel={(o: IOption) => o.label}
        getValue={(o: IOption) => o.value}
      />
      <Field name='decription' component={TextAreaField} label='Decription' />
      <button type='submit' className={styles.btn}>Ok</button>
    </form>
  )
}

export default memo(FormDeck);
