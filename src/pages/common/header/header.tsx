import { FC, memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Menu } from './menu';
import styles from './header.module.scss';

interface IProps {
}

const Header: FC<IProps> = () => {
  const [menuStatus, setMenuStatus] = useState<boolean>(false);

  const handleMenu = useCallback(
    () => { setMenuStatus(prev => !prev); },
    [setMenuStatus],
  );

  return (
    <>
      <header className={styles.container}>
        <Link to='/' className={styles.home} />
        <h1 className={styles.title}>FlashCards</h1>
        {/* <button
          type="button"
          className={cx(styles.burger, { [styles.open]: menuStatus })}
          onClick={handleMenu}
          >
          <span />
        </button> */}
        <div className={styles.version}>
          V
          {
            require('../../../../package.json').version
          }
        </div>
      </header>
      {/* <div className={cx(styles.menu, { [styles.open]: menuStatus })}>
        <Menu />
      </div> */}
    </>
  );
}

export default memo(Header);
