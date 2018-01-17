import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import sheet from './sheet';

class SideBar extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    card: PropTypes.instanceOf(I.Map).isRequired,
    pathMaker: PropTypes.func.isRequired,
    addToLexicon: PropTypes.func.isRequired,
    removeFromLexicon: PropTypes.func.isRequired,
    isRemembered: PropTypes.bool.isRequired,
  };

  toggleLexicon = () => {
    const { isRemembered, addToLexicon, removeFromLexicon, card } = this.props;
    if (isRemembered) {
      removeFromLexicon(card);
    } else {
      addToLexicon();
    }
  };

  render() {
    const { classes, card, pathMaker } = this.props;
    const prev = card.getIn(['set', 'meta', 'prev', 'index']);
    const next = card.getIn(['set', 'meta', 'next', 'index']);
    return (
      <div className={classes.sidebar}>
        {
          typeof prev === 'number' ? (
            <Link className={classes.prev} to={pathMaker(prev)} />
          ) : (
            <span className={cx(classes.prev, classes.disabled)} />
          )
        }
        <button
          className={classes.remember}
          onClick={this.toggleLexicon}
        >
          <span className={classes.greenPin} />
          <span className={classes.whitePin} />
        </button>
        {
          typeof next === 'number' ? (
            <Link className={classes.next} to={pathMaker(next)} />
          ) : (
            <span className={cx(classes.next, classes.disabled)} />
          )
        }
      </div>
    );
  }
}

export default injectSheet(sheet)(SideBar);
