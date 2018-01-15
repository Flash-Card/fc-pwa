import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';
import { getDictItemByKey } from 'domain/cards';

class SearchResults extends Component {
  static propTypes = {
    searchResults: PropTypes.instanceOf(I.List).isRequired,
    classes: PropTypes.object.isRequired,
    getDictItemByKey: PropTypes.func.isRequired,
  }

  searchWord = (word) => () => {
    this.props.getDictItemByKey({ word });
  }

  render() {
    const { searchResults, classes } = this.props;

    return (
      <div className="screen">
        <ul className="inner">
          {searchResults.map((i, index) => (
            <li key={index} className={classes.list} onClick={this.searchWord(i.term)}>
              {i.term}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
});

const mapActionCreators = {
  getDictItemByKey,
};

export default connect(mapStateToProps, mapActionCreators)(injectSheet(sheet)(SearchResults));
