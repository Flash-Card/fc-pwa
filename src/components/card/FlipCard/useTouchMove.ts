import { useCallback, useRef, TouchEvent, Touch} from 'react';

interface IUseTouch {
  onChange?(shift: number): void;
  threshold?: number;
  onTap?(): void;
}

interface IPosition {
  timeStamp: number;
  clientX: number;
  // clientY: number;
  // screenX: number;
  // screenY: number;
  // radiusX: number;
  // radiusY: number;
};

export const useTouchMove = <T extends HTMLElement>({ onChange, threshold = (1/3), onTap }: IUseTouch) => {

  const container = useRef<T>(null);
  const start = useRef<IPosition>();
  const current = useRef<Touch>();

  const onTouchStart = useCallback(
    ({ targetTouches, timeStamp }: TouchEvent<T>) => {
      if (targetTouches.length === 1) {
        const { clientX } = targetTouches[0];
        start.current = { clientX, timeStamp };
      }
    },
    [],
  );

  const updatePosition = useCallback(
    () => {
      if (start.current && container.current && current.current) {
        const deltaX = start.current.clientX - current.current.clientX;
        container.current.style.transform = `translate3d(${-deltaX}px, 0, 0)`;
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
    ({ timeStamp }) => {
      if (start.current && typeof onTap === 'function') {
        if (timeStamp - start.current.timeStamp < 200) {
          onTap();
        }
      }
      if (start.current && current.current) {
        const delta = start.current.clientX - current.current.clientX;
        if (typeof onChange === 'function' && Math.abs(delta) > window.innerWidth * threshold) {
          onChange(delta / Math.abs(delta));
        } else if (container.current) {
          container.current.style.transform = `translate3d(0, 0, 0)`;
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