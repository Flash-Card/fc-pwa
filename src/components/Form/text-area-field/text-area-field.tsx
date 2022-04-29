import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';
import styles from './text-area-field.module.scss';

interface IProps extends FieldRenderProps<string> {
  label: string;
}

const TextAreaField: FC<IProps> = ({ input, label, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={label} meta={meta}>
      <textarea {...input} {...rest} className={styles.field} />
    </Layout>
  )
}

export default memo(TextAreaField);
