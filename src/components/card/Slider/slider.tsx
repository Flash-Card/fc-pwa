import { FC, memo, ReactNode, useMemo } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import cx from 'classnames';
import styles from './slider.module.scss';

interface IProps {
  id: string;
  children: ReactNode;
  status?: boolean;
}

const Slider: FC<IProps> = ({ children, id, status }) => {

  const wclass = useMemo(
    () => cx(styles.prev, {
      [styles.posetive]: status === true,
      [styles.negative]: status === false,
    }),
    [status],
  );

  return (
    <div className={styles.wrapper}>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={id}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames={{ ...styles }}
        >
          <div className={wclass}>{children}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default memo(Slider);
