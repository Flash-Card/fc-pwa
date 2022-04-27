import { FC, memo, ReactElement } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import cx from 'classnames';
import { useTouchMove } from './useTouchMove';
import styles from './flip-card.module.scss';

interface IProps {
  front: string | JSX.Element;
  back: string | JSX.Element;
  isFlipped?: boolean;
  id: string;
  onChange(nc: 1 | -1): void;
  children?: ReactElement;
  onFlip(): void;
}

const FlipCard: FC<IProps> = ({ id, front, back, isFlipped, onChange, children, onFlip }) => {
  
  const { ref, ...props } = useTouchMove<HTMLDivElement>({ onChange, threshold: 0.38, onTap: onFlip });

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={id}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        classNames={{ ...styles }}
      >
        <div
          ref={ref}
          className={cx(styles.container, { [styles.flip]: isFlipped })}
          >
          <div className={styles.warapper} {...props}>
            <div className={cx(styles.side, styles.front)}>{front}</div>
            <div className={cx(styles.side, styles.back)}>{back}</div>
          </div>
          { children }
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default memo(FlipCard);
