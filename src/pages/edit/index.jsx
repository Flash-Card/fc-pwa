import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxForm from 'redux-form/lib/reduxForm';
import WordCard from 'components/Form/wordCard/index';
import { editCard, typesList, getDictItem, cardItem } from 'domain/cards/index';

class EditCard extends React.Component {

  static propTypes = {
    card: PropTypes.instanceOf(I.Map).isRequired,
    types: PropTypes.instanceOf(I.List).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { handleSubmit, types, card, history } = this.props;
    return (
      <div className="screen">
        <WordCard
          types={types}
          handleSubmit={handleSubmit}
          initialValues={card.toJS()}
        >
          <div className="btn__group">
            <button
              type="submit"
              className="btn btn_regular"
            >Ok</button>
            <button
              type="button"
              className="btn btn_regular"
              onClick={() => history.goBack()}
            >Cancel</button>
          </div>
        </WordCard>
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    types: typesList(state),
    card: cardItem(state),
  }), { getItem: getDictItem }),
  reduxForm({
    form: 'edit',
    onSubmit: editCard.onSubmit,
  }),
)(EditCard);
