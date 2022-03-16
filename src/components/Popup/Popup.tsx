import { FC, useEffect } from 'react';
import cn from 'classnames';
import { focusing } from 'lib/focus';
import { IPopupProps } from './types';
import { useTabNavigation } from './useTabNavigation';
import styles from './popup.module.scss';

export const Popup: FC<IPopupProps> = ({
  name,
  renderCancelBtn,
  containerClassName,
  className,
  children,
  refProxy,
}) => {

  const { handleRef } = useTabNavigation<HTMLDivElement>();

  useEffect(
    () => {
      const lastFocused = focusing();
      return () => {
        lastFocused.back();
      };
    },
    [],
  );

  return (
    <div
      className={cn(styles.container, containerClassName)}
      aria-labelledby={name}
      ref={handleRef}
    >
      <div
        className={cn(styles.popup, className)}
        ref={refProxy}
      >
        {
          children
        }
        {
          typeof renderCancelBtn !== 'undefined' ? renderCancelBtn : null
        }
      </div>
    </div>
  );
};
