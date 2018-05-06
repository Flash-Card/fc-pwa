import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setsLoadedList } from 'domain/cards';
import * as ACL from 'domain/restriction';
import Sets from './sets';
import injectSheet from 'react-jss';
import sheet from './sheet.js';

function Home(props) {
  const { isGranted, classes, sets } = props;
  if (!isGranted(ACL.SETS_IS_LOADED)) {
    return (
      <div className="screen">
        <div className="inner">
          <div className="inner">
            <div className="btn__group">
              <Link
                to="/memoize"
                className="btn btn_main"
              >Choice and load Sets
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="screen">
      <div className="inner">
        <div className={classes.btnGroup}>
          {
            isGranted(ACL.LEXICON_IS_EXIST) ? [
              <Link
                to="/quiz"
                key="fragment-1"
                className="btn btn_main"
              >Go to quiz
              </Link>,
              <div key="fragment-2">or</div>,
            ] : null
          }
          <Sets classes={classes} sets={sets} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isGranted: ACL.isGranted(state),
  sets: setsLoadedList(state),
});

Home.propTypes = {
  isGranted: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sets: PropTypes.instanceOf(I.List).isRequired,
};

export default compose(
  connect(mapStateToProps),
  injectSheet(sheet),
)(Home);
