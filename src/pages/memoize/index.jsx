// @flow
import React from 'react';
import { is, type List, type RecordOf } from 'immutable';
import { compose, type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getDictionary, setsList } from 'domain/cards';
import type { DictSet } from 'domain/cards/type.js.flow';
import Asset from './asset';

type Props = {
  getDictionary: Dispatch<getDictionary>,
  sets: List<RecordOf<DictSet>>,
}

class Catalog extends React.Component<Props> {

  shouldComponentUpdate(nextProps) {
    return !is(this.props.sets, nextProps.sets);
  }

  render() {
    const { sets } = this.props;
    return (
      <div className="screen">
        <ul>
          {
            sets.map(e =>
              (<Asset
                key={e.id}
                data={e}
                getDictionary={() => this.props.getDictionary(e)}
              />),
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
)(Catalog);
