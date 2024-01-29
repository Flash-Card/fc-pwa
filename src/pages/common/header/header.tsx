import { FC, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles.home} />
      <h1 className={styles.title}>FlashCards</h1>
      <div className={styles.version}>
        V{require("../../../../package.json").version}
      </div>
    </header>
  );
};

export default memo(Header);
