/* eslint import/no-webpack-loader-syntax: 0 */
import Worker from 'worker-loader!./searchWorker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';
import { getDictItemByKey, searchWithSpellCheck } from 'domain/cards';

class SearchResults extends Component {
  static propTypes = {
    searchResults: PropTypes.instanceOf(I.List).isRequired,
    classes: PropTypes.object.isRequired,
    getDictItemByKey: PropTypes.func.isRequired,
    searchWithSpellCheck: PropTypes.func.isRequired,
    location: PropTypes.instanceOf(I.Map).isRequired,
  }

  componentDidMount() {
    const searcherWorker = new Worker();
    const term = this.props.location.get('location').get('query').term;
    searcherWorker.postMessage(term);
    searcherWorker.addEventListener('message', (event) => {
      this.props.searchWithSpellCheck(event.data);
    });
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
            <li key={index} className={classes.list} onClick={this.searchWord(i.key)}>
              {i.key}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
  location: state.routing,
});

const mapActionCreators = {
  getDictItemByKey,
  searchWithSpellCheck,
};

export default connect(mapStateToProps, mapActionCreators)(injectSheet(sheet)(SearchResults));
