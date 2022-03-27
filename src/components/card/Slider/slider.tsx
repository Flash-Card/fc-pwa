import { FC, memo, ReactNode, TransitionEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import styles from './slider.module.scss';

interface IProps {
  id: string;
  children: ReactNode;
}

function updateStyle(el: HTMLDivElement | null, value: string) {
  if (el) {
    el.setAttribute('style', value);
  }
}

const Slider: FC<IProps> = ({ children, id }) => {

  const [card, setCard] = useState<ReactNode>(() => children);

  const item = useRef<HTMLDivElement | null>(null);

  const seq = useCallback(
    function* (el: HTMLDivElement | null) {
      updateStyle(el, 'transition-duration: 0.001s; transform: translate3d(-100%, 0, 0)');
      updateStyle(el, 'transition-duration: 0.001s; transform: translate3d(0, 0, 0)');
      yield updateStyle(el, 'transition-duration: 0.9s; transform: translate3d(-100%, 0, 0)');
      setCard(children);
      yield updateStyle(el, 'transition-duration: 0.001s; transform: translate3d(0, 0, 0)');
    },
    [children],
  );

  const data = useRef({ id, gen: seq(item.current) });

  useEffect(
    () => {
      if (id !== data.current.id && item.current) {
        data.current = { id, gen: seq(item.current) };
        data.current.gen.next();
      }
    },
    [id],
  );

  const handleTransition = useCallback<TransitionEventHandler<HTMLDivElement>>(
    () => { data.current.gen.next(); },
    [],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.next}>{children}</div>
      <div
        ref={item}
        className={styles.prev}
        onTransitionEnd={handleTransition}
      >{card}</div>
    </div>
  );
}

export default memo(Slider);
