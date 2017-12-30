import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Info extends React.Component {

  static defaultProps = {
    data: new I.Map(),
    card: new I.Map(),
    index: 0,
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.instanceOf(I.Map).isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.title !== this.props.title) return true;
    if (nextProps.index !== this.props.index) return true;
    return !I.is(nextProps.data, this.props.data);
  }

  render() {
    const { classes, data = new I.Map(), title, index } = this.props;
    const first = data.get('first', 0);
    const last = data.get('last', 0);
    const all = last - first + 1;
    return (
      <div className={cx('inner', classes.info)}>
        <div className={classes.set}>{title}</div>
        <dl className={classes.counter}>
          <dd>{index}</dd>of<dt>{all}</dt>
          <dt>left:</dt><dd>{all - index}</dd>
        </dl>
      </div>
    );
  }
}

export default injectSheet(sheet)(Info);
