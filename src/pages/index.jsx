import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import AsyncRoute from 'lib/AsyncRoute';

import routes, { routesById } from 'domain/router/routes';
import { menuToggle, menu as menuSelector } from 'domain/ui';

import Header from './common/header';
import Menu from './common/menu';

import injectSheet from 'react-jss';
import sheet from './common/sheet';

require('./common/layout.css');

const MENU = ['/', '/memoize', '/create', '/quiz', '/auth'];

class App extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    toggle: PropTypes.func.isRequired,
    // menu: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     path: PropTypes.shape({
    //       pathname: PropTypes.string,
    //     }),
    //     title: PropTypes.string,
    //     exact: PropTypes.bool,
    //     component: PropTypes.func.isRequired,
    //   }),
    // ),
    menu: PropTypes.instanceOf(I.Map).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.location.search !== nextProps.location.search) return true;
    return this.props.location.pathname !== nextProps.location.pathname;
  }

  render() {
    const { classes, toggle } = this.props;
    return (
      <div className={classes.container}>
        <Header />
        <Menu list={MENU.map(e => routesById[e])} toggle={toggle} />
        <div
          className={classes.slider}
        >
          <div
            className={classes.overlay}
            onTouchMove={() => toggle(false)}
          />
          <Switch>
            {
              routes.map((e, i) =>
                <AsyncRoute
                  key={i + e.title}
                  path={e.path.pathname}
                  exact={e.exact}
                  import={e.component}
                />,
              )
            }
          </Switch>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(state => ({ menu: menuSelector(state) }), { toggle: menuToggle }),
  injectSheet(sheet),
)(App);
