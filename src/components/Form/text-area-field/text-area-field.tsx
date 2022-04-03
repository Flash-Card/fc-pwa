import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';
import styles from './text-area-field.module.scss';

interface IProps extends FieldRenderProps<string> {
  title: string;
}

const TextAreaField: FC<IProps> = ({ input, title, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={title} >
      <textarea {...input} {...rest} className={styles.field} />
    </Layout>
  )
}

export default memo(TextAreaField);
