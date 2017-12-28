import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Stat extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    size: PropTypes.number,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.stat}>{1}</div>
    );
  }
}

export default compose(
  injectSheet(sheet),
)(Stat);
