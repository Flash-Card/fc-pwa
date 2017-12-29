import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDictionary, setsList } from 'domain/cards';
import { routesById } from 'domain/router/routes';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Catalog extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    getDictionary: PropTypes.func.isRequired,
    sets: PropTypes.instanceOf(I.List).isRequired,
  };

  static getCardId(set) {
    const first = set.getIn(['meta', 'first']);
    return set.getIn(['meta', 'current'], first);
  }

  render() {
    const { classes, sets } = this.props;
    return (
      <div className="screen">
        <ul className="inner">
          {
            sets.map(e =>
              <li key={e.get('id')} className={classes.set}>
                <h2 className={classes.title}>{e.get('title')}</h2>
                <p className={classes.text}>{e.getIn(['meta', 'description'])}</p>
                <div className={classes.btnGroup}>
                  <button
                    className={classes.download}
                    disabled={e.get('isLoaded') || e.get('isLoading')}
                    onClick={() => this.props.getDictionary(e)}
                  />
                  {
                    e.get('isLoaded') ? (
                      <Link
                        className="btn btn_regular"
                        to={routesById['/memoize/:cardId'].path.pathMaker({ cardId: Catalog.getCardId(e) })}
                      >Go</Link>
                    ) : null
                  }
                </div>
              </li>,
            )
          }
        </ul>
      </div>
    );
  }
}

export default compose(
  connect(state => ({ sets: setsList(state) }), { getDictionary }),
  injectSheet(sheet),
)(Catalog);
