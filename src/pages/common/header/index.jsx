import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import sheet from './sheet';
import { menuToggle } from 'domain/ui';

function Header({ classes, toggle }){
  return (
    <header className={classes.header}>
      <button
        type="button"
        className={classes.menuBtn}
        onClick={() => toggle()}
      >
        <span className={classes.burger} />
      </button>
      <h1
        className={classes.logo}
      >FlashCards</h1>
    </header>
  );
}

export default compose(
  injectSheet(sheet),
  connect(() => ({}), { toggle: menuToggle }),
)(Header);
