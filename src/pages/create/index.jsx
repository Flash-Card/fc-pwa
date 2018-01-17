import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxForm from 'redux-form/lib/reduxForm';
import { typesList } from 'domain/cards';
import { createCard } from 'domain/cards';
import WordCard from 'components/Form/wordCard';
class Create extends React.Component {

  static propTypes = {
    types: PropTypes.instanceOf(I.List).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
  };

  render() {
    const { types, handleSubmit, pristine } = this.props;
    return (
      <div className="screen">
        <WordCard
          types={types}
          handleSubmit={handleSubmit}
          pristine={pristine}
        />
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    types: typesList(state),
  })),
  reduxForm({
    form: 'create',
    initialValues: { values: [{ value: '' }], set: 'owner-dict' },
    onSubmit: createCard.onSubmit,
  }),
)(Create);
