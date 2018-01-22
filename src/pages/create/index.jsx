import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { typesList } from 'domain/cards';
import { createCard } from 'domain/cards';
import WordCard from 'components/Form/wordCard';

class Create extends React.Component {

  static propTypes = {
    types: PropTypes.instanceOf(I.List).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  onSubmit = (data, { reset }) => {
    this.props.onSubmit(data);
    reset();
  };

  render() {
    const { types } = this.props;
    return (
      <div className="screen">
        <WordCard
          types={types}
          initialValues={{ values: [{ value: '' }], set: 'owner-dict' }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    types: typesList(state),
  }), {
    onSubmit: createCard,
  }),
)(Create);
