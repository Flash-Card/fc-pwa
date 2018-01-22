import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import sheet from './sheet';
import { menuToggle } from 'domain/ui';
import SearchBox from '../searchBox';

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
      <SearchBox />
    </header>
  );
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default compose(
  injectSheet(sheet),
  connect(() => ({}), { toggle: menuToggle }),
)(Header);
