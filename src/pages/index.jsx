import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import AsyncRoute from 'lib/AsyncRoute';

import routes from 'domain/router/routes';
import { menuToggle, menuStatus } from 'domain/ui';
import * as ACL from 'domain/restriction';

import Header from './common/header';
import Menu from './common/menu';

import injectSheet from 'react-jss';
import sheet from './common/sheet';

require('./common/layout.css');

class App extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    toggle: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    restriction: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.location.search !== nextProps.location.search) return true;
    return this.props.location.pathname !== nextProps.location.pathname;
  }

  render() {
    const { classes, toggle, restriction } = this.props;
    return (
      <div className={classes.container}>
        <Header />
        <Menu list={routes.filter(ACL.arrayFilter(restriction))} toggle={toggle} />
        <div className={classes.slider}>
          <div
            className={classes.overlay}
            onTouchMove={() => toggle(false)}
          />
          <Switch>
            {
              routes.map((e, i) =>
                (<AsyncRoute
                  key={i + e.title}
                  path={e.path.pathname}
                  exact={e.exact}
                  import={e.component}
                />),
              )
            }
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restriction: ACL.myRestriction(state),
  menuStatus: menuStatus(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, { toggle: menuToggle }),
  injectSheet(sheet),
)(App);
