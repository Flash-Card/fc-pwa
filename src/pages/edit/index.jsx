import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routesById } from 'domain/router/routes';
import WordCard from 'components/Form/wordCard/index';
import { editCard, typesList, getDictItem, cardItem, setsById } from 'domain/cards/index';

class EditCard extends React.Component {

  static propTypes = {
    card: PropTypes.instanceOf(I.Map).isRequired,
    types: PropTypes.instanceOf(I.List).isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    set: PropTypes.instanceOf(I.Map),
  };

  render() {
    const { onSubmit, types, card, pristine, set } = this.props;
    return (
      <div className="screen">
        {
          card.get('isOwn') ? null : (
            <p className="inner warning">You can't edit <b>{set.get('title')}</b>, this card will be add in to your own dictionary.</p>
          )
        }
        <WordCard
          types={types}
          onSubmit={onSubmit}
          initialValues={card.set('to_lexicon', true).toJS()}
        >
          <div className="btn__group">
            <button
              type="submit"
              className="btn btn_regular"
              disabled={pristine}
            >Ok</button>
            <Link
              className="btn btn_regular"
              to={routesById['/memoize/:set/:key'].path.pathMaker(card.toJS())}
            >Cancel</Link>
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
  connect(
    mapStateToProps,
    {
      getItem: getDictItem,
      onSubmit: editCard,
    },
  ),
)(EditCard);
