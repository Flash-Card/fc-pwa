import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { routesById } from 'domain/router/routes';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Asset extends React.Component {

  static propTypes = {
    data: PropTypes.instanceOf(I.Map).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    cardId: PropTypes.number,
    getDictionary: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProp) {
    return !I.is(this.props.data, nextProp.data);
  }

  render() {
    const { classes, data, cardId, getDictionary } = this.props;
    const progress = data.get('progress');
    const isOwn = data.get('isOwn');
    return (
      <li className={cx('inner', classes.set)}>
        <div className={classes.bar} />
        <h2 className={classes.title}>{data.get('title')}</h2>
        <p className={classes.text}>{data.getIn(['meta', 'description'])}</p>
        <div className={classes.btnGroup}>
          {
            isOwn ? null : (
              <button
                className={classes.download}
                disabled={progress !== 0}
                onClick={getDictionary}
              />
            )
          }
          {
            progress === 100 ? (
              <Link
                className="btn btn_regular"
                to={routesById['/memoize/:cardId'].path.pathMaker({ cardId })}
              >Go</Link>
            ) : null
          }
        </div>
      </li>
    );
  }
}

export default injectSheet(sheet)(Asset);
