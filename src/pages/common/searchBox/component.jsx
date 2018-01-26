import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import cx from 'classnames';
import sheet from './sheet';
import injectSheet from 'react-jss';
import { routesById } from 'domain/router/routes';
import Item from './item';


class Search extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    searchResults: PropTypes.instanceOf(I.List),
    query: PropTypes.string,
    handleOpen: PropTypes.func.isRequired,
    spellSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    inputRef: PropTypes.func.isRequired,
  };

  static path(el) {
    return routesById['/memoize/:set/:key'].path.pathMaker(el.toJS());
  }

  clean = () => {
    this.props.onChange({ target: { value: '' } });
  };

  keyDownHandler = ({ keyCode, target: { value } }) => {
    if (keyCode === 13 && value.length > 1) this.props.spellSearch();
    if (keyCode === 27) this.props.handleOpen();
  };

  render () {
    const { classes, searchResults, query, inputRef } = this.props;
    return (
      <div className={classes.searchWrapper}>
        <div className={classes.search}>
          <button
            className={classes.searchIcon}
            onClick={this.props.handleOpen}
          />
          <div className={classes.inputWrapper}>
            <input
              ref={inputRef}
              className={classes.searchInput}
              type="search"
              value={query}
              onChange={this.props.onChange}
              onKeyDown={this.keyDownHandler}
            />
          </div>
          <button
            className={cx('btn', classes.btnSearch)}
            onClick={this.props.spellSearch}
          />
        </div>
        <ul className={classes.dropDown}>
          {
            searchResults.map(el =>
              <Item
                key={`${el.get('key')}-${el.get('set')}`}
                classes={classes}
                data={el}
                onTransition={this.clean}
                to={Search.path}
              />,
            )
          }
        </ul>
      </div>
    );
  }
}

export default injectSheet(sheet)(Search);
