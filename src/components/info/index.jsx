import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Info extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    card: PropTypes.instanceOf(I.Map).isRequired,
  };

  render() {
    const { classes, card = new I.Map() } = this.props;
    const first = card.getIn(['set', 'meta', 'first'], 0);
    const last = card.getIn(['set', 'meta', 'last'], 0);
    const count = card.get('index', 0);
    const all = last - first + 1;
    return (
      <div className={cx('inner', classes.info)}>
        <div className={classes.set}>{card.getIn(['set', 'title'])}</div>
        <dl className={classes.counter}>
          <dd>{count}</dd>of<dt>{all}</dt>
          <dt>left:</dt><dd>{all - count}</dd>
        </dl>
      </div>
    );
  }
}

export default injectSheet(sheet)(Info);
