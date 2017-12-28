import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Header from './header';
import cx from 'classnames';
import { menuToggle, menu } from 'domain/ui';
import Menu from './menu';
import sheet from './sheet.js';

function Layout({ children, classes, menu, toggle }){
  return (
    <div className={classes.container}>
      <Header />
      <Menu list={menu.get('list')} toggle={toggle} />
      <div
        className={cx(classes.slider, { [classes.menuOpen]: menu.get('isOpen') })}
        onTouchMove={e => console.log(e.touches[0])}
      >
      </div>
    </div>
  );
}

export default compose(
  connect( state => ({ menu: menu(state) }), { toggle: menuToggle }),
  injectSheet(sheet),
)(Layout);
