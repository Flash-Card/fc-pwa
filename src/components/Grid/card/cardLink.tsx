import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.scss';

interface IProps {
  title: string;
  path: string;
}

const CardLink: FC<IProps> = ({ title, path }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={path}>
        <div className={styles.content}>{title}</div>
      </Link>
    </div>
  );
}

export default memo(CardLink);
