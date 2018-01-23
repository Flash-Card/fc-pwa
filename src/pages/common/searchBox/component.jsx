import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import cx from 'classnames';
import sheet from './sheet';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { routesById } from 'domain/router/routes';


class Search extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    searchResults: PropTypes.instanceOf(I.List),
    query: PropTypes.string,
    handleOpen: PropTypes.func.isRequired,
    spellSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render () {
    const { classes, searchResults, query } = this.props;
    return (
      <div className={classes.searchWrapper}>
        <div className={classes.search}>
          <button
            className={classes.searchIcon}
            onClick={this.props.handleOpen}
          />
          <div className={classes.inputWrapper}>
            <input
              ref={el => { this.input = el; }}
              className={classes.searchInput}
              type="search"
              value={query}
              onChange={this.props.onChange}
            />
            <ul className={classes.dropDown}>
              {
                searchResults.map(el => (
                  <li key={`${el.get('key')}-${el.get('set')}`}>
                    <Link
                      className={classes.itemDropDown}
                      onClick={() => this.props.onChange({ target: { value: '' }})}
                      to={routesById['/memoize/:set/:key'].path.pathMaker(el.toJS())}
                    >
                      {el.get('key')}
                      <div className={classes.setWord}>{el.get('set')}</div>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <button
            className={cx('btn', classes.btnSearch)}
            onClick={this.props.spellSearch}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(sheet)(Search);
