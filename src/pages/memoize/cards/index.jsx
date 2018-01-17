import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  cardItem,
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
        <Info
          index={card.getIn(['set', 'meta', 'currentIndex'])}
          all={card.getIn(['set', 'meta', 'length'])}
        />
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
