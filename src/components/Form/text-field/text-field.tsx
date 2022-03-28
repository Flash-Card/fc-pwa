import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';
import styles from './text-field.module.scss';

interface IProps extends FieldRenderProps<string> {
  title: string;
}

const TextField: FC<IProps> = ({ input, title, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={title} >
      <input {...input} {...rest} className={styles.field} />
    </Layout>
  )
}

export default memo(TextField);
