import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import injectSheet from 'react-jss';
import cx from 'classnames';
import sheet from './sheet';

function Input(props) {
  const { input, classes, type, title, placeholder, meta } = props;
  const id = input.name;
  return (
    <Layout
      classes={classes}
      title={title}
      meta={meta}
      id={id}
    >
      <input
        id={id}
        type={type}
        className={cx(classes.field)}
        placeholder={placeholder}
        onChange={input.onChange}
        value={input.value}
        name={input.name}
      />
    </Layout>
  );
}

Input.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
};

export default injectSheet(sheet)(Input);
