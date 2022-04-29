import { FC, memo } from 'react';
import Layout from '../layout/layout';
import { FieldRenderProps } from 'react-final-form';
import { T } from 'lodash/fp';

interface ISelectProps<T> extends FieldRenderProps<string> {
  options: ReadonlyArray<T>;
  label: string;
  getLabel(o: T): string;
  getValue(o: T): string;
}

const SelectField = <T, >({ options, getLabel, getValue, ...props }: ISelectProps<T>) => {
  return (
    <Layout id={props.id} title={props.label}>
      <select className='form-field__field' {...props.input}>
        {
          options.map(o => (
            <option
              key={getValue(o)}
              value={getValue(o)}
              label={getLabel(o)}
            >{getLabel(o)}</option>
          ))
        } 
      </select>
    </Layout>
  );
}

export default memo(SelectField);
