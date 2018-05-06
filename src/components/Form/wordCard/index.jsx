import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';

import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutate from 'final-form-arrays';

import { Input, MultiInput } from 'components/Form/element';
import injectSheet from 'react-jss';
import sheet from './sheet.js';

class Create extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    types: PropTypes.instanceOf(I.List).isRequired,
    children: PropTypes.node,
    initialValues: PropTypes.object,
  };

  render() {
    const { classes, types, initialValues } = this.props;
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={initialValues}
        mutators={arrayMutate}
        render={({ handleSubmit, pristine }) => (
          <form
            onSubmit={handleSubmit}
            name="create"
            className="inner"
          >
            <Field
              name="set"
              component="input"
              type="hidden"
            />
            <Field
              name="key"
              component={Input}
              props={{
                title: 'Front of the card',
              }}
            />
            <FieldArray name="values">
              {
                ({ fields }) => (
                  <MultiInput
                    fields={fields}
                    title="Back of the card"
                    options={types}
                  />
                )
              }
            </FieldArray>
            <label htmlFor="id-to_lexicon" className={classes.label}>
              <Field
                name="to_lexicon"
                component="input"
                type="checkbox"
                id="id-to_lexicon"
              />
              <span>Append to my set</span>
            </label>
            {
              this.props.children || (
                <div className="btn__group">
                  <button
                    type="submit"
                    className="btn btn_main"
                    disabled={pristine}
                  >Ok
                  </button>
                </div>
              )
            }
          </form>
        )}
      />
    );
  }
}

export default injectSheet(sheet)(Create);
