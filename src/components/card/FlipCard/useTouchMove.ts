import { useCallback, useRef, TouchEvent, Touch} from 'react';

interface IUseTouch {
  onChange?(shift: number): void;
  threshold?: number;
}

export const useTouchMove = <T extends HTMLElement>({ onChange, threshold = (1/3) }: IUseTouch) => {

  const container = useRef<T>(null);
  const start = useRef<Touch>();
  const current = useRef<Touch>();

  const onTouchStart = useCallback(
    ({ targetTouches }: TouchEvent<T>) => {
      if (targetTouches.length === 1) {
        start.current = targetTouches[0];
      }
    },
    [],
  );

  const updatePosition = useCallback(
    () => {
      if (start.current && container.current && current.current) {
        const delta = start.current.clientX - current.current.clientX;
        container.current.style.transform = `translateX(${-delta}px)`;
      }
    },
    [],
  )

  const onTouchMove = useCallback(
    ({ targetTouches }: TouchEvent<T>) => {
      if (start.current) {
        current.current = targetTouches[0];
        window.requestAnimationFrame(updatePosition);
      }
    },
    [],
  );

  const onTouchEnd = useCallback(
    () => {
      if (start.current && current.current) {
        const delta = start.current.clientX - current.current.clientX;
        if (typeof onChange === 'function' && Math.abs(delta) > window.innerWidth * threshold) {
          onChange(delta / Math.abs(delta));
        } else if (container.current) {
          container.current.style.transform = `translateX(0px)`;
        }
        start.current = undefined;
      }
    },
    [onChange],
  );

  return {
    ref: container,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}