import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import injectSheet from 'react-jss';
import sheet from './sheet';

function Menu({ list, classes, toggle }) {
  return (
    <div className={classes.menu}>
      <ul className={classes.list}>
        {
          list.map((e, i) => (
            <li key={i + e.title}>
              <NavLink
                exact={e.path.pathname === '/'}
                activeClassName={classes.active}
                to={e.path.pathname}
                className={classes.link}
                onClick={() => toggle(false)}
              >{e.title}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

Menu.propTypes = {
  list: PropTypes.array,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default injectSheet(sheet)(Menu);
