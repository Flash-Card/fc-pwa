import { FC, memo, ReactNode } from 'react';
import styles from './layout.module.scss';

interface IProps {
  children: ReactNode;
  id: string;
  title: string;
}

const Layout: FC<IProps> = ({ children, id, title }) => {
  return (
    <div className={styles.conatiner}>
      <div className={styles.wrapper}>
        <label htmlFor={id} className={styles.label}>{title}</label>
      </div>
      {children}
    </div>
  );
}

export default memo(Layout);
