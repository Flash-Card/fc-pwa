import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import sheet from './sheet';

class SideBar extends React.Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sidebar}>
        {
          this.props.children
        }
      </div>
    );
  }
}

export default injectSheet(sheet)(SideBar);
