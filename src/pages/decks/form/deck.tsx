import { FC, memo } from "react";
import { Field } from "react-final-form";
import { TextField, SelectField, TextAreaField } from "components/Form";
import styles from "./form.module.scss";

interface IProps {
  handleSubmit(): void;
}

interface IOption {
  value: string;
  label: string;
}

const SORT_OPTIONS = [
  { value: "id", label: "unsorted" },
  { value: "front", label: "Front" },
  { value: "back", label: "Back" },
];

const FormDeck: FC<IProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Field name="name" component={TextField} label="Name" />
      <Field
        name="cardsInLesson"
        component={TextField}
        label="Cards in Lesson"
        inputMode="numeric"
        type="number"
        min={3}
      />
      <Field
        name="sortBy"
        component={SelectField}
        label="Sort By"
        options={SORT_OPTIONS}
        getLabel={(o: IOption) => o.label}
        getValue={(o: IOption) => o.value}
      />
      <Field name="description" component={TextAreaField} label="Description" />
      <button type="submit" className={styles.btn}>
        Ok
      </button>
    </form>
  );
};

export default memo(FormDeck);
