import React from 'react';
import PropTypes from 'prop-types';

function Layout({ classes, children, id, title }) {
  return (
    <div className={classes.fieldWrapper}>
      <div className={classes.wrapper}>
        <label htmlFor={id} className={classes.label}>{title}</label>
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.shape({
    inputRow: PropTypes.string,
    wrapper: PropTypes.string,
    labelText: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Layout;
