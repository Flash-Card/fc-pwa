import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import Field from 'redux-form/lib/Field';
import Layout from './layout';
import injectSheet from 'react-jss';
import sheet from './sheet';

function Select(props) {
  const { input, classes, title, meta, options } = props;
  const id = input.name;
  return (
    <Layout
      classes={classes}
      title={title}
      meta={meta}
      id={id}
    >
      <Field
        name={input.name}
        component="select"
        className={classes.field}
      >
        <option value="" />
        {
          options.map(e =>
            <option
              key={e.get('id')}
              value={e.get('id')}
            >{e.get('title')}</option>,
          )
        }
      </Field>
    </Layout>
  );
}

Select.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  options: PropTypes.instanceOf(I.List),
};

export default injectSheet(sheet)(Select);
