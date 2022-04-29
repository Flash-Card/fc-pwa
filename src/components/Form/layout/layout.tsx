import { FC, memo, ReactNode } from 'react';
import './layout.scss';

interface IProps {
  children: ReactNode;
  id: string;
  title: string;
}

const Layout: FC<IProps> = ({ children, id, title }) => {
  return (
    <div className="form-field">
      <div className="form-field__wrapper">
        <label htmlFor={id} className="form-field__label">{title}</label>
      </div>
      {children}
    </div>
  );
}

export default memo(Layout);
