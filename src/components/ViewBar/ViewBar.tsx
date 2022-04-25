import { FC, memo, ReactNode, useCallback, useState } from 'react';
import cx from 'classnames';
import './view-bar.scss';

export enum EStatus {
  LIST = 'LIST',
  GRID = 'GRID',
}

interface IViewBardProps {
  children?(status: EStatus, fn: (st: EStatus) => () => void): ReactNode;
  getTitle?(status: EStatus): ReactNode;
  onChange?(s: EStatus): void;
  defaultStatus: EStatus;
}

const ViewBar: FC<IViewBardProps> = ({ children, onChange, defaultStatus, getTitle }) => {

  const [status, setStatus] = useState<EStatus>(defaultStatus);

  const handleChange = useCallback(
    (status: EStatus) => () => setStatus(status),
    [setStatus],
  );

  const renderButton = useCallback(
    (st: EStatus) => (
      <button
        key={st}
        type='button'
        onClick={handleChange(st)}
        disabled={st === status}
        className={cx(
          'view-bar__btn', {
            'view-bar__btn_list': st === EStatus.LIST,
            'view-bar__btn_grid': st === EStatus.GRID,
            'view-bar__btn_active': status === st,
          }
        )}
      />
    ),
    [status],
  );

  return (
    <>
      <div className='view-bar__container'>
        { typeof getTitle === 'function' && getTitle(status)}
        <div className='view-bar__btn-group'>
          {
            Object.values(EStatus).map(el => renderButton(el))
          }
        </div>
      </div>
      {
        typeof children === 'function' && children(status, handleChange)
      }
    </>
  );
}

export default memo(ViewBar);
