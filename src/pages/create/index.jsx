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
  };

  render() {
    const { types, handleSubmit } = this.props;
    return (
      <div className="screen">
        <WordCard
          types={types}
          handleSubmit={handleSubmit}
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
    initialValues: { values: [{ value: '' }] },
    onSubmit: createCard.onSubmit,
  }),
)(Create);
