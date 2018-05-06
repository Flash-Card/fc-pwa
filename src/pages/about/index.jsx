import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { version } from 'domain/env/envSelector';
import { clearDB } from 'domain/env/envActions';
import injectSheet from 'react-jss';
import sheet from './sheet';

class AboutPage extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    version: PropTypes.number,
    clearDB: PropTypes.func.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="screen">
        <div className="inner">
          <div className={classes.db}>Database version: {this.props.version}</div>
          <div className="btn__group">
            <button
              type="button"
              className="btn btn_warning"
              onClick={() => this.props.clearDB()}
            >Clear database
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(state => ({ version: version(state) }), { clearDB }),
  injectSheet(sheet),
)(AboutPage);
