// @flow
import React from 'react';
import { is, type RecordOf } from 'immutable';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { cardPath } from 'domain/router/helpers';
import injectSheet from 'react-jss';
import type { DictSet } from 'domain/cards/type.js.flow';
import sheet from './sheet';

type Props = {
  classes: {
    [key: string]: string,
  },
  data: RecordOf<DictSet>,
  getDictionary: () => void,
}

class Asset extends React.Component<Props> {

  shouldComponentUpdate(nextProp) {
    return !is(this.props.data, nextProp.data);
  }

  render() {
    const { classes, data, getDictionary } = this.props;
    return (
      <li className={cx('inner', classes.set)}>
        <div className={classes.bar} />
        <h2 className={classes.title}>{data.title}</h2>
        <p className={classes.text}>{data.meta.description}</p>
        <div className={classes.btnGroup}>
          {
            data.isOwn ? null : (
              <button
                className={classes.download}
                disabled={data.progress !== 0}
                onClick={getDictionary}
              />
            )
          }
          {
            data.progress === 100 ? (
              <Link
                className="btn btn_regular"
                to={cardPath(data.meta.current, data.meta.first)}
              >Go
              </Link>
            ) : null
          }
        </div>
      </li>
    );
  }
}

export default injectSheet(sheet)(Asset);
