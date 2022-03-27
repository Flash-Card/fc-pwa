import { useEffect, useCallback, useRef } from 'react';
import { subscribe, isSupported } from 'on-screen-keyboard-detector';


export function useKeyboard<T extends HTMLElement>() {

  const container = useRef<T | null | undefined>();

  const keybordHandler = useCallback(
    (visibility: 'visible' | 'hidden') => {
      if (visibility === 'visible' && container.current) {
        const height = visualViewport.height;
        window.scrollTo(0, 0)
        container.current.style.height = height + 'px';
      }
      if (visibility === 'hidden' && container.current) {
        container.current.removeAttribute('style');
      }
    },
    [],
  );

  useEffect(() => {
    if (isSupported()) {
      var unsubscribe = subscribe(keybordHandler);
    }
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  }, []);

  const refPropxy = useCallback(
    (el: T | null) => {
      container.current = el;
    },
    [],
  );


  return {
    refPropxy,
  }

}
