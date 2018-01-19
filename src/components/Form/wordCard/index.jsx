import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import Field from 'redux-form/lib/Field';
import FieldArray from 'redux-form/lib/FieldArray';
import { Input, MultiInput } from 'components/Form/element';
import injectSheet from 'react-jss';
import sheet from './sheet.js';

class Create extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    types: PropTypes.instanceOf(I.List).isRequired,
    children: PropTypes.node,
    pristine: PropTypes.bool,
  };

  render() {
    const { classes, types, pristine } = this.props;
    return (
      <form
        onSubmit={this.props.handleSubmit}
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
        <FieldArray
          name="values"
          component={MultiInput}
          props={{
            title: 'Back of the card',
            options: types,
          }}
        />
        <label htmlFor="to_lexicon" className={classes.label}>
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
              >Ok</button>
            </div>
          )
        }
      </form>
    );
  }
}

export default injectSheet(sheet)(Create);
