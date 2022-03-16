import { useCallback } from 'react';
import { toNumber } from './utils';

export interface IFocusing<T extends HTMLElement = HTMLElement> {
  back: () => void,
  element: T | null,
}

export enum EKeyName {
  TAB = 'Tab',
  ESCAPE = 'Escape',
}

export function getIndex<T extends HTMLElement>(el: T): number {
  return toNumber(el.getAttribute('data-tabindex'), 0);
}

export function getKeyboardFocusableElements<T extends HTMLElement, E extends HTMLElement>(container?: T | null): E[] {
  if (!container) return [];
  const elements = [
    ...container.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )
  ] as E[];
  return elements
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
    .sort((a, b) => getIndex(a) - getIndex(b));
}

export function focusing<T extends HTMLElement>(): IFocusing<T> {
  const focusedElement = document.activeElement as T | null;
  return {
    back: () => {
      if (focusedElement && typeof focusedElement?.focus === 'function') {
        focusedElement.focus();
      }
    },
    element: focusedElement
  };
}

export function useFocus<T extends HTMLElement | null>(isEnable = () => true) {

  return useCallback<(el: T) => void>(
    (el) => {
      isEnable() && getKeyboardFocusableElements(el)[0]?.focus();
    },
  [isEnable],
  );
}
