import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Card from 'components/card';
import SideBar from './sidebar';
import injectSheet from 'react-jss';
import sheet from './sheet';

class QuizPage extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  render() {
    return (
      <div className="screen">
        <Card />
        <SideBar />
      </div>
    );
  }
}

export default compose(
  injectSheet(sheet),
)(QuizPage);
