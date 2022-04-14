import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';
import styles from './text-field.module.scss';

interface IProps extends FieldRenderProps<string> {
  label: string;
}

const TextField: FC<IProps> = ({ input, label, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={label} >
      <input {...input} {...rest} className={styles.field} />
    </Layout>
  )
}

export default memo(TextField);
