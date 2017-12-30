import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  quizCurrentItem,
  quizList,
  typesById,
  flipCard,
  quzeNextCard,
  truePositive,
} from 'domain/cards';
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
    size: PropTypes.number.isRequired,
  };

  state = {
    open: false,
    size: this.props.size,
  };

  flipHandler = () => {
    const { flip } = this.props;
    this.setState({
      open: true,
    }, () => flip());
  };

  get infoData() {
    return new I.Map({
      first: 0,
      last: this.state.size - 1,
    });
  }

  get left() {
    return this.state.size - this.props.size + 1;
  }

  render() {
    const { card, types, classes, positive, next } = this.props;
    return (
      <div className="screen">
        <Info data={this.infoData} title="Quiz" index={this.left} />
        <Card card={card} types={types} open={this.state.open} />
        <SideBar>
          <button
            type="button"
            className={classes.btnFlip}
            onClick={this.flipHandler}
            disabled={this.state.open}
          />
          <button
            type="button"
            className={classes.btnOk}
            onClick={positive}
          />
          <button
            type="button"
            className={classes.btnNext}
            disabled={!this.state.open}
            onClick={next}
          />
        </SideBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  card: quizCurrentItem(state),
  types: typesById(state),
  size: quizList(state).size,
});

export default compose(
  connect(mapStateToProps, {
    flip: flipCard,
    next: quzeNextCard,
    positive: truePositive,
  }),
  injectSheet(sheet),
)(QuizPage);
