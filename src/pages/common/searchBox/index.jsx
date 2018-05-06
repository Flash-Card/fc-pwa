import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { connect } from 'react-redux';
import debounce from 'debounce';
import { push } from 'react-router-redux';
import { routesById } from 'domain/router/routes';
import { search } from 'domain/cards';
import Search from './component';

class SearchBox extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    searchResults: PropTypes.instanceOf(I.List).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isOpen: false,
      showDropDown: false,
    };
  }

  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      showDropDown: false,
      query: this.state.isOpen ? '' : this.state.query,
    }, () => {
      if (this.input && this.state.isOpen) setTimeout(() => { this.input.focus(); }, 300);
      if (this.state.isOpen) this.props.search({ word: '' });
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value }, debounce(this.handleSearch, 200));
  };

  handleSearch = () => {
    this.props.search({ word: this.state.query });
  };

  handleRedirectToSearch = () => {
    if (this.state.query) {
      this.setState({ showDropDown: false }, () => {
        this.props.search({ word: '' });
        this.props.push({ pathname: routesById['/search'].path.pathMaker(), search: `?term=${this.state.query}` });
      });
    }
  };

  render() {
    return (
      <Search
        searchResults={this.props.searchResults}
        query={this.state.query}
        isOpen={this.state.isOpen}
        handleOpen={this.handleOpen}
        onChange={this.handleChange}
        spellSearch={this.handleRedirectToSearch}
        inputRef={(el) => { this.input = el; }}
      />
    );
  }
}

const mapActionCreators = {
  search,
  push,
};

const mapStateToProps = state => ({
  searchResults: state.searchResults.get('search'),
});

export default connect(mapStateToProps, mapActionCreators)(SearchBox);
