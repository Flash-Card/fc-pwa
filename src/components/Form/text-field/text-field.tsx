import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps, FieldMetaState } from 'react-final-form';

interface IProps extends FieldRenderProps<string> {
  label: string;
}

const TextField: FC<IProps> = ({ input, label, meta, ...rest }) => {
  return (
    <Layout id={input.id} title={label} meta={meta} >
      <input
        {...input}
        {...rest}
        className="form-field__field form-field__field_text"
      />
    </Layout>
  )
}

export default memo(TextField);
