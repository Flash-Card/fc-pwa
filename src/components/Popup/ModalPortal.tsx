import { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from './types';

export const ModalPortal: FC<IModalProps> = ({
  children,
  nodeId = 'modalRoot',
  tagName = 'dialog',
}) => {

  const container = useRef(document.createElement(tagName));

  useEffect(() => {
    container.current.setAttribute('open', 'true')
    container.current.setAttribute('aria-hidden', 'false');
    const modalRoot = document.getElementById(nodeId);
    const root = document.getElementById('root');
    if (modalRoot) modalRoot.appendChild(container.current);
    if (root) root.setAttribute('aria-hidden', 'true');
    return () => {
      if (modalRoot) modalRoot.removeChild(container.current);
      if (root) root.setAttribute('aria-hidden', 'false');
    };
  }, []);

  return ReactDOM.createPortal(
    children,
    container.current,
  );
};
