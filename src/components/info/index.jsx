import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Info extends React.Component {

  static defaultProps = {
    index: 0,
    all: 1,
  };

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    all: PropTypes.number,
    index: PropTypes.number,
    title: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.title !== this.props.title) return true;
    if (nextProps.index !== this.props.index) return true;
    return nextProps.all !== this.props.all;
  }

  render() {
    const { classes, title, index, all } = this.props;
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
