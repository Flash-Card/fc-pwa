import React from 'react';
import injectSheet from 'react-jss';
import sheet from 'pages/common/sidebar/sheet';

class SideBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sidebar}>

      </div>
    );
  }
}

export default injectSheet(sheet)(SideBar);
