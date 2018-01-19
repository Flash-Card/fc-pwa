import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  quizCurrentItem,
  quizList,
  typesById,
  negative,
  nextCard,
  positive,
  newQuiz,
} from 'domain/cards';
import * as ACL from 'domain/restriction';
import Info from 'components/info/index';
import Card from 'components/card';
import SideBar from 'pages/common/sidebar';
import injectSheet from 'react-jss';
import sheet from './sheet';

class QuizPage extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    card: PropTypes.instanceOf(I.Map).isRequired,
    types: PropTypes.instanceOf(I.Map).isRequired,
    flip: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    positive: PropTypes.func.isRequired,
    isGranted: PropTypes.func.isRequired,
    newQuiz: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  };

  state = {
    open: false,
    size: this.props.size,
  };

  flipHandler = () => {
    const { flip, card } = this.props;
    this.setState({
      open: true,
    }, () => flip(card.get('key')));
  };

  nextHandler = () => {
    const { next, card } = this.props;
    this.setState({
      open: false,
    }, () => next(card.get('key')));
  };

  get left() {
    return this.state.size - this.props.size + 1;
  }

  render() {
    const { card, types, classes, positive, isGranted } = this.props;
    const isOpen = this.state.open;
    return isGranted(ACL.MENU_QUIZ) ? (
      <div className="screen">
        {
          card.size ? [
            <Info key="1" all={this.state.size} title="Quiz" index={this.left} />,
            <Card key="2" card={card} types={types} open={isOpen} />,
            <SideBar key="3">
              <button
                type="button"
                className={classes.btnFlip}
                onClick={this.flipHandler}
                disabled={isOpen}
              />
              <button
                type="button"
                className={classes.btnOk}
                onClick={() => positive(card.get('key'))}
                disabled={isOpen}
              />
              <button
                type="button"
                className={classes.btnNext}
                disabled={!isOpen}
                onClick={this.nextHandler}
              />
            </SideBar>,
          ] : (
            <div className="inner">
              <h1 className={classes.title}>Quiz is finished</h1>
              <button
                type="button"
                className="btn btn_main"
                onClick={() => this.props.newQuiz()}
              >Try one more time</button>
            </div>
          )
        }
      </div>
    ) : (
      <div className="screen">
        <div className="inner">
          <div className="btn__group">
            <Link to="/memoize" className="btn btn_regular">Choice and load Sets</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  card: quizCurrentItem(state),
  types: typesById(state),
  size: quizList(state).size,
  isGranted: ACL.isGranted(state),
});

export default compose(
  connect(mapStateToProps, {
    flip: negative,
    next: nextCard,
    positive: positive,
    newQuiz,
  }),
  injectSheet(sheet),
)(QuizPage);
