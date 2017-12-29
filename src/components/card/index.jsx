import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Card extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    children: PropTypes.node,
    card: PropTypes.instanceOf(I.Map).isRequired,
    types: PropTypes.instanceOf(I.Map).isRequired,
  };

  render() {
    const { classes, card, types } = this.props;
    return (
      <div className={classes.card}>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.key}>{card.get('key')}</div>
            <div className={classes.values}>
              {
                card.get('values', new I.List()).map(e =>
                  <dl key={e.get('value')}>
                    <dd className={classes.description}>{types.getIn([e.get('type'), 'title'], '')}</dd>
                    <dt className={classes.value}>{e.get('value')}</dt>
                  </dl>,
                )
              }
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default injectSheet(sheet)(Card);
