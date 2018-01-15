import React, { Component } from 'react';
import I from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import sheet from './sheet';
import searchIcon from './search.svg';
import cx from 'classnames';
import { debounce } from 'lib/helpers';
import { search } from 'domain/cards';
import { push } from 'react-router-redux';
import { routesById } from 'domain/router/routes';

class SearchBox extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    searchResults: PropTypes.instanceOf(I.List).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isOpen: false,
      showDropDown: false,
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen, showDropDown: false });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value }, debounce(this.handleSearch, 500));
  }

  handleSearch = () => {
    if (this.state.query) this.props.search({ word: this.state.query });
  }

  handleRedirect = (card) => () => {
    this.setState({ query: card.key, showDropDown: false }, () => {
      this.props.push(routesById['/memoize/:cardId'].path.pathMaker({ cardId: card.index }));
    });
  }

  handleRedirectToSearch = () => {
    if (this.state.query) {
      this.setState({ showDropDown: false }, () => {
        this.props.push({ pathname: routesById['/search'].path.pathMaker(), search: `?term=${this.state.query}` });
      });
    }
  }

  renderInput = () => {
    const { classes, searchResults } = this.props;
    const { query, showDropDown } = this.state;

    return (
      <div className={classes.inputWrapper}>
        <input
          className={classes.searchInput}
          type="text"
          value={query}
          onChange={this.handleChange}
          onFocus={() => this.setState({ showDropDown: true })}
        />
        {showDropDown &&
          <ul className={classes.dropDown}>
            {searchResults && searchResults.map((i, index) => (
              <li key={index} onClick={this.handleRedirect(i)}>{i.key}</li>
            ))}
          </ul>}
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.searchWrapper}>
        <div className={cx(classes.search, { open: isOpen })}>
          <img className={classes.searchIcon} src={searchIcon} alt="search" onClick={this.handleOpen} />
          {this.renderInput()}
          <button
            className={cx(classes.closeSearch, 'btn btn_regular')}
            onClick={this.handleRedirectToSearch}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapActionCreators = {
  search,
  push,
};

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
});

export default connect(mapStateToProps, mapActionCreators)(injectSheet(sheet)(SearchBox));
