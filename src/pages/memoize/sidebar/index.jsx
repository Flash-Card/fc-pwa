import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { cardPath } from 'domain/router/helpers';
import injectSheet from 'react-jss';
import sheet from './sheet';

class SideBar extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    card: PropTypes.instanceOf(I.Map).isRequired,
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
    const { classes, card } = this.props;
    const prev = card.getIn(['meta', 'prev'], new I.List());
    const next = card.getIn(['meta', 'next'], new I.List());
    return (
      <div className={classes.sidebar}>
        {
          prev.size ? (
            <Link className={classes.prev} to={cardPath(prev)} />
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
          next.size ? (
            <Link className={classes.next} to={cardPath(next)} />
          ) : (
            <span className={cx(classes.next, classes.disabled)} />
          )
        }
      </div>
    );
  }
}

export default injectSheet(sheet)(SideBar);
