import { FC, memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './slider.module.scss';

interface IProps {
  id: string;
  children: ReactNode;
  status?: boolean;
}

function updateStyle(el: HTMLDivElement | null, value: string) {
  if (el) {
    el.setAttribute('style', value);
  }
  return value;
}

function getColors(status: boolean): [string, string] {
  return status ? ['#739f3d', '#fff'] : ['#ee693f', '#fff'];
}

const Slider: FC<IProps> = ({ children, id, status }) => {

  const [card, setCard] = useState<ReactNode>(() => children);

  const item = useRef<HTMLDivElement | null>(null);

  const seq = useCallback(
    function* (el: HTMLDivElement | null): Generator<any, any, any> {
      const st: boolean = yield;
      const [face, text] = getColors(st);
      const ch = yield updateStyle(el, `--face-color: ${face}; --text-color: ${text}`);
      yield updateStyle(el, `--face-color: ${face}; --text-color: ${text}; transition-duration: 0.001s; transform: translate3d(-100%, 0, 0)`);
      yield updateStyle(el, `--face-color: ${face}; --text-color: ${text}; transition-duration: 0.001s; transform: translate3d(0, 0, 0)`);
      yield updateStyle(el, `--face-color: ${face}; --text-color: ${text}; transition-duration: 0.9s; transform: translate3d(-100%, 0, 0)`);
      setCard(ch);
      yield updateStyle(el, 'transition-duration: 0.001s; transform: translate3d(0, 0, 0)');
    },
    [],
  );

  const data = useRef({ id, gen: seq(item.current) });

  useEffect(
    () => {
      if (id !== data.current.id) {
        data.current.id = id;
        data.current.gen.next(children);
      }
    },
    [id],
  );

  useEffect(
    () => {
      if (typeof status !== 'undefined' && item.current ) {
        data.current.gen = seq(item.current);
        data.current.gen.next();
        data.current.gen.next(status);
      }
    },
    [status],
  );

  const handleTransition = useCallback(
    () => {
      data.current.gen.next();
    },
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
