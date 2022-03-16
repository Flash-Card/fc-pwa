import { FC, memo } from 'react';
import styles from './card.module.scss';

interface IProps {
  text: string;
}

const Card: FC<IProps> = ({ text }) => {
  return (
    <div className={styles.conatiner}>{text}</div>
  )
}

export default memo(Card);