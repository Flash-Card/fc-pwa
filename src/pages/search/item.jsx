import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { Link } from 'react-router-dom';

class Item extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    to: PropTypes.func.isRequired,
    data: PropTypes.instanceOf(I.Map).isRequired,
  };

  render() {
    const { classes, data, to } = this.props;
    return (
      <li className={classes.item}>
        <div className={classes.itemKey}>{data.get('key')}</div>
        {
          data.get('set').map(el =>
            <Link
              key={el}
              className={classes.link}
              to={to(el)}
            >{el}</Link>,
          )
        }
      </li>
    );
  }
}

export default Item;
