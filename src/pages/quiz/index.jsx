import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { quizCurrentItem, typesById } from 'domain/cards';
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
  };

  render() {
    const { card, types, classes } = this.props;
    return (
      <div className="screen">
        <Info card={card} />
        <Card card={card} types={types} />
        <SideBar>
          <button
            type="button"
            className={classes.btnFlip}
          />
          <button
            type="button"
            className={classes.btnOk}
          />
          <button
            type="button"
            className={classes.btnNext}
          />
        </SideBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  card: quizCurrentItem(state),
  types: typesById(state),
});

export default compose(
  connect(mapStateToProps),
  injectSheet(sheet),
)(QuizPage);
