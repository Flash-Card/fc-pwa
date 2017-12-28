import React from 'react';
import PropTypes from 'prop-types';
import makeCancelable from 'lib/makeCancelable';
import { Route } from 'react-router-dom';

export default class AsyncRoute extends React.Component {

  static propTypes = {
    import: PropTypes.func.isRequired,
    path: PropTypes.string,
    exact: PropTypes.bool,
  };

  state = {
    Component: null,
  };

  componentWillMount(){
    this.cancelable = makeCancelable(
      this.props.import(),
    );
    this.cancelable.promise
      .then(({ default: Component }) => this.setState({ Component }) );
  }

  render() {
    const { Component } = this.state;
    const { path, exact } = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        render={(props) => Component ? <Component {...props} /> : null}
      />
    );
  }
}
