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
  setsById,
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
    set: PropTypes.instanceOf(I.Map).isRequired,
  };

  render() {
    const { classes, card, location, isRemembered, types, set } = this.props;
    const pathMaker = ({ set, key }) => routesById['/edit/:set/:key'].path.pathMaker({ set, key });
    return (
      <div className="screen">
        <Info
          title={set.get('title')}
          index={card.get('index')}
          all={set.getIn(['meta', 'length'])}
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
                to={pathMaker(card.toJS())}
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
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  addToLexicon,
  removeFromLexicon,
};

const mapStateToProps = (state, props) => ({
  card: cardItem(state),
  types: typesById(state),
  isRemembered: isCardinLexicon(state),
  set: setsById(state).get(props.match.params.set),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(sheet),
)(CardsPage);
