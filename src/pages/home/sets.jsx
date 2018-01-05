import React from 'react';
import { Link } from 'react-router-dom';
import { routesById } from 'domain/router/routes';
import cx from 'classnames';

function Sets({ classes, sets }) {
  return [
    <h2 key="title" className={classes.title}>Add item to your Lexicon</h2>,
      sets.map(e =>
        <Link
          key={e.get('id')}
          to={routesById['/memoize/:cardId'].path.pathMaker({ cardId: e.getIn(['meta', 'current']) })}
          className={cx('btn btn_main', classes.link)}
        >from <b>"{e.get('title')}"</b></Link>,
      ),
  ];
}

export default Sets;
