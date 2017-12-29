import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  cardItem,
  getDictItem,
  addToLexicon,
  typesById,
  isCardinLexicon,
  removeFromLexicon,
} from 'domain/cards';
import { routesById } from 'domain/router/routes';
import Card from 'components/card';
import Info from 'components/info/index';
import SideBar from '../sidebar';
import injectSheet from 'react-jss';
import sheet from './sheet';

class CardsPage extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    card: PropTypes.instanceOf(I.Map),
    match: PropTypes.shape({
      params: PropTypes.shape({
        cardId: PropTypes.string,
      }),
    }).isRequired,
    getItem: PropTypes.func.isRequired,
    isRemembered: PropTypes.bool.isRequired,
    addToLexicon: PropTypes.func.isRequired,
    removeFromLexicon: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    types: PropTypes.instanceOf(I.Map).isRequired,
  };

  render() {
    const { classes, card, location, isRemembered, types } = this.props;
    const index = card.get('index');
    const pathMaker = (cardId) => routesById['/edit/:cardId'].path.pathMaker({ cardId });
    return (
      <div className="screen">
        <Info card={card} />
        {
          card.size ? (
            <Card
              card={card}
              types={types}
              location={location}
              open
            >
              <Link
                to={pathMaker(index)}
                className={classes.edit}
              />
            </Card>
          ) : (
            <div>No Cards</div>
          )
        }
        <SideBar
          card={card}
          isRemembered={isRemembered}
          addToLexicon={this.props.addToLexicon}
          removeFromLexicon={this.props.removeFromLexicon}
          pathMaker={(cardId) => routesById['/memoize/:cardId'].path.pathMaker({ cardId })}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getItem: getDictItem,
  addToLexicon,
  removeFromLexicon,
};

const mapStateToProps = (state) => ({
  card: cardItem(state),
  types: typesById(state),
  isRemembered: isCardinLexicon(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(sheet),
)(CardsPage);


/**
 * <div className={classes.btnGroup}>
 <button
 className="btn btn_regular"
 disabled={lexicon.includes(card.get('key'))}
 onClick={() => this.props.addToLexicon()}
 >Remember</button>
 <Link
 className="btn btn_regular"
 to={routesById['/memoize/:cardId'].path.pathMaker({ cardId: 1 + index })}
 >Skip</Link>
 </div>
 */
