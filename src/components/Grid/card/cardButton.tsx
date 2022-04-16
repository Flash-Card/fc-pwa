import { FC, memo } from 'react';
import styles from './card.module.scss';

interface IProps {
  title: string;
  onClick(): void;
}

const CardButton: FC<IProps> = ({ title, onClick }) => {

  return (
    <div className={styles.container}>
      <button className={styles.link} onClick={onClick}>
        <div className={styles.content}>{title}</div>
      </button>
    </div>
  );
}

export default memo(CardButton);
