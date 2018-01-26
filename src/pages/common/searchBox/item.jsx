import React from 'react';
import I from 'immutable';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class SearchItem extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    onTransition: PropTypes.func,
    to: PropTypes.func,
    data: PropTypes.instanceOf(I.Map),
  };

  render() {
    const { classes, data, onTransition, to } = this.props;
    return (
      <li>
        <Link
          className={classes.item}
          onClick={onTransition}
          to={to(data)}
        >
          {data.get('key')}
          <div className={classes.setWord}>{data.get('set')}</div>
        </Link>
      </li>
    );
  }
}

export default SearchItem;
