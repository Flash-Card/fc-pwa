/* eslint import/no-webpack-loader-syntax: 0 */
import Worker from 'worker-loader!./searchWorker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';
import { searchWithSpellCheck } from 'domain/cards';
import { push } from 'react-router-redux';
import { routesById } from 'domain/router/routes';

class SearchResults extends Component {
  static propTypes = {
    searchResults: PropTypes.instanceOf(I.List).isRequired,
    classes: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    searchWithSpellCheck: PropTypes.func.isRequired,
    location: PropTypes.instanceOf(I.Map).isRequired,
  };

  componentDidMount() {
    this.searcherWorker = new Worker();
    const term = this.props.location.getIn(['query', 'term']);
    if (term) {
      this.searcherWorker.postMessage(term);
      this.searcherWorker.addEventListener('message', (event) => {
        this.props.searchWithSpellCheck(event.data);
      });
    }
  }

  componentWillReceiveProps(nexProps) {
    const newTerm = nexProps.location.getIn(['query', 'term']);
    if (newTerm && this.props.location.getIn(['query', 'term']) !== newTerm) {
      this.runSearchWorker(newTerm);
    }
  }

  componentWillUnmount() {
    this.searcherWorker.terminate();
  }

  runSearchWorker = (term) => {
    this.searcherWorker.postMessage(term);
    this.searcherWorker.addEventListener('message', (event) => {
      this.props.searchWithSpellCheck(event.data);
    });
  };

  searchWord = (key, set) => () => {
    this.props.push(routesById['/memoize/:set/:key'].path.pathMaker({ set, key }));
  };

  render() {
    const { searchResults, classes } = this.props;

    return (
      <div className="screen">
        <ul className="inner">
          {searchResults.map(i => (
            i.get('set').map((set, index) => (
              <li
                key={index}
                className={classes.list}
                onClick={this.searchWord(i.get('key'), set)}
              >
                {i.get('key')}
                <span className={classes.setWord}>{set}</span>
              </li>
            ))
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults.get('spellSearch'),
  location: state.routing.get('location'),
});

const mapActionCreators = {
  searchWithSpellCheck,
  push,
};

export default connect(mapStateToProps, mapActionCreators)(injectSheet(sheet)(SearchResults));
