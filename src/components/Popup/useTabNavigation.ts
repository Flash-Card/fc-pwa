import { useCallback, useRef } from 'react';
import { getKeyboardFocusableElements, EKeyName } from 'lib/focus';
import { getNextIndex } from './helpers';

export function useTabNavigation<T extends HTMLElement>() {

  const container = useRef<T>();

  const focusElement = useCallback<(i: number) => boolean>(
    (index) => {
      const activeElements = getKeyboardFocusableElements(container.current);
      if (typeof activeElements[index]?.focus === 'function') {
        activeElements[index]?.focus();
        return true;
      }
      return false;
    },
  [],
  );

  const getCurrentElement = useCallback<() => [number, number, HTMLElement]>(
    () => {
      const current = document.activeElement;
      const activeElements = getKeyboardFocusableElements(container.current);
      const index = activeElements.findIndex(f => f === current);
      return [index, activeElements.length, activeElements[index]];
    },
  [],
  );

  const handleKey = useCallback<(event: KeyboardEvent) => void>(
    (event) => {
      if (event.key === EKeyName.TAB) {
        event.preventDefault();
        event.stopPropagation();
        const [index, length] = getCurrentElement();
        const next = getNextIndex(event.shiftKey, index, length -1);
        focusElement(next);
      }
    },
  [],
  );

  const handleRef = useCallback<(el: T) => void>(
    (el) => {
      container.current = el;
      container.current?.addEventListener('keydown', handleKey, false);
      setTimeout(() => {
        getKeyboardFocusableElements(el)[0]?.focus();
      }, 10);
    },
  [],
  );

  return {
    handleRef
  };
}
