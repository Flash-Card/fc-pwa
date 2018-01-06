import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { gitHub } from 'domain/env';
import queryString from 'query-string';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Auth extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    gitHub: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  get url() {
    const { url, ...params } = this.props.gitHub;
    return `${url}?${queryString.stringify(params)}`;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="screen">
        <div className="inner">
          <h1 className={classes.title}>Auth</h1>
          <a
            className={classes.git}
            href={this.url}
          >Sign In via GitHub</a>
        </div>
      </div>
    );
  }
}

export default compose(
  connect((state) => ({ gitHub: gitHub(state) }), {}),
  injectSheet(sheet),
)(Auth);
