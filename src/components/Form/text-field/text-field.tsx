import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';

interface IProps extends FieldRenderProps<string> {
  label: string;
}

const TextField: FC<IProps> = ({ input, label, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={label} >
      <input
        {...input}
        {...rest}
        className="form-field__field form-field__field_text"
      />
    </Layout>
  )
}

export default memo(TextField);
