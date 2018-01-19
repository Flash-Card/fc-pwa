import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxForm from 'redux-form/lib/reduxForm';
import WordCard from 'components/Form/wordCard/index';
import { editCard, typesList, getDictItem, cardItem, setsById } from 'domain/cards/index';

class EditCard extends React.Component {

  static propTypes = {
    card: PropTypes.instanceOf(I.Map).isRequired,
    types: PropTypes.instanceOf(I.List).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    pristine: PropTypes.bool,
    set: PropTypes.instanceOf(I.Map),
  };

  render() {
    const { handleSubmit, types, history, card, pristine, set } = this.props;
    return (
      <div className="screen">
        {
          card.get('set') === 'owner-dict' ? null : (
            <p className="inner warning">You can't edit <b>{set.get('title')}</b>, this card will be add in to your own dictionary.</p>
          )
        }
        <WordCard
          types={types}
          handleSubmit={handleSubmit}
        >
          <div className="btn__group">
            <button
              type="submit"
              className="btn btn_regular"
              disabled={pristine}
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

const mapStateToProps = (state, props) => ({
  types: typesList(state),
  card: cardItem(state),
  set: setsById(state).get(props.match.params.set, new I.Map()),
});

export default compose(
  connect(mapStateToProps, { getItem: getDictItem }),
  reduxForm({
    form: 'edit',
    onSubmit: editCard.onSubmit,
  }),
)(EditCard);
