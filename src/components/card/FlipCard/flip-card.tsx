import { FC, memo, useEffect, useRef } from 'react';
import cx from 'classnames';
import { useTouchMove } from './useTouchMove';
import styles from './flip-card.module.scss';

interface IProps {
  front: string | JSX.Element;
  back: string | JSX.Element;
  isFlipped?: boolean;
}

const FlipCard: FC<IProps> = ({ front, back, isFlipped }) => {
  
  const props = useTouchMove<HTMLDivElement>({ });

  return (
    <div
      {...props}
      className={cx(styles.container, { [styles.flip]: isFlipped })}
    >
      <div className={styles.warapper}>
        <div className={cx(styles.content, styles.front)}>{front}</div>
        <div className={cx(styles.content, styles.back)}>{back}</div>
      </div>
    </div>
  );
}

export default memo(FlipCard);
