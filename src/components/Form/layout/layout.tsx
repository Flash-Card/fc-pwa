import { FC, memo, ReactNode, useMemo } from 'react';
import { FieldMetaState } from 'react-final-form';
import cx from 'classnames';
import './layout.scss';

interface IProps {
  children: ReactNode;
  id: string;
  title: string;
  meta: FieldMetaState<string>;
}

const Layout: FC<IProps> = ({ children, id, title, meta }) => {

  const fieldClassName = useMemo(
    () => cx('form-field', {
      'form-field_error': meta.invalid,
    }),
    [meta],
  );

  return (
    <div className={fieldClassName}>
      <div className="form-field__wrapper">
        <label htmlFor={id} className="form-field__label">{title}</label>
      </div>
      {children}
      <span className='form-field__error-message'>{meta.error}</span>
    </div>
  );
}

export default memo(Layout);
