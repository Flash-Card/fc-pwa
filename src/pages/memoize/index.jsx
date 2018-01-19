import React from 'react';
import PropTypes from 'prop-types';
import I from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getDictionary, setsList } from 'domain/cards';
import Asset from './asset';
import injectSheet from 'react-jss';
import sheet from './sheet';

class Catalog extends React.Component {

  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    getDictionary: PropTypes.func.isRequired,
    sets: PropTypes.instanceOf(I.List).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !I.is(this.props.sets, nextProps.sets);
  }

  render() {
    const { sets } = this.props;
    return (
      <div className="screen">
        <ul>
          {
            sets.map(e =>
              <Asset
                key={e.get('id')}
                data={e}
                getDictionary={() => this.props.getDictionary(e)}
              />,
            )
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sets: setsList(state),
});

export default compose(
  connect(mapStateToProps, { getDictionary }),
  injectSheet(sheet),
)(Catalog);
