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
    const index = card.get('index');
    const first = card.getIn(['set', 'meta', 'first']);
    const last = card.getIn(['set', 'meta', 'last']);
    return (
      <div className={classes.sidebar}>
        {
          index - 1 < first  ? (
            <span className={cx(classes.prev, classes.disabled)} />
          ) : (
            <Link className={classes.prev} to={pathMaker(index - 1)} />
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
          index + 1 > last ? (
            <span className={cx(classes.next, classes.disabled)} />
          ) : (
            <Link className={classes.next} to={pathMaker(index + 1)} />
          )
        }
      </div>
    );
  }
}

export default injectSheet(sheet)(SideBar);
