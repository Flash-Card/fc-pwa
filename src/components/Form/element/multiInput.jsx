import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import Field from 'redux-form/lib/Field';
import cx from 'classnames';
import Layout from './layout';
import injectSheet from 'react-jss';
import sheet from './sheet';

class MultiInput extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    fields: PropTypes.shape({
      push: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    options: PropTypes.instanceOf(I.List),
    meta: PropTypes.object,
  };

  onAdd = () => {
    this.props.fields.push({ value: '' });
  };

  render() {
    const { classes, title, fields, meta, options } = this.props;
    const id = fields.name;

    return (
      <Layout
        classes={classes}
        title={title}
        meta={meta}
        id={id}
      >
        <div className={classes.container}>
          <ul className={classes.list}>
            {
              fields.map((item, index) => (
                <li
                  key={`${fields.name}-${index}`}
                  className={classes.item}
                >
                  <Field
                    name={`${fields.name}.${index}.type`}
                    component="select"
                    className={cx(classes.field, classes.fieldArrayItem)}
                  >
                    <option value="" hidden>Pick parts of speech</option>
                    {
                      options.map(e =>
                        <option
                          key={e.get('id')}
                          value={e.get('id')}
                        >{e.get('title')}</option>,
                      )
                    }
                  </Field>
                  <Field
                    type="text"
                    name={`${fields.name}.${index}.value`}
                    className={cx(classes.field)}
                    component="input"
                  />
                </li>
              ))
            }
          </ul>
          <button
            type="button"
            onClick={this.onAdd}
            className={classes.addBtn}
          >+</button>
        </div>
      </Layout>
    );
  }
}

export default injectSheet(sheet)(MultiInput);
