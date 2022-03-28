import { FC, memo, ReactNode } from 'react';
import { ModalPortal, Popup } from 'components/Popup';
import { useKeyboard } from 'lib/useKeyboard';
import styles from './container.module.scss';

interface IProps {
  name: string;
  onClose(): void;
  children: ReactNode
}

const Container: FC<IProps> = ({ onClose, children, name }) => {
  const { refPropxy } = useKeyboard();

  return (
    <ModalPortal>
      <Popup
        name={name}
        className={styles.container}
        refProxy={el => { refPropxy(el?.parentElement); }}
      >
        <div className={styles.header}>
          <button
            type='button'
            className={styles.close}
            onClick={onClose}
            tabIndex={-1}
          />
        </div>
        {
          children
        }
      </Popup>
    </ModalPortal>
  );
}

export default memo(Container);