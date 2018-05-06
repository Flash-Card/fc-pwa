import React from 'react';
import { Link } from 'react-router-dom';
import { cardPath } from 'domain/router/helpers';
import cx from 'classnames';

function Sets({ classes, sets }) {
  return [
    <h2 key="title" className={classes.title}>Add item to your Lexicon</h2>,
    sets.map(e =>
      (<Link
        key={e.get('id')}
        to={cardPath(e.getIn(['meta', 'current'], e.getIn(['meta', 'first'])))}
        className={cx('btn btn_main', classes.link)}
      >from <b>"{e.get('title')}"</b>
      </Link>),
    ),
  ];
}

export default Sets;
