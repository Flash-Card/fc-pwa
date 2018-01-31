import I from 'immutable';
import * as sz from 'serialize';

const emptyMap = new I.Map();

export const envSerialize = sz.srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], I.fromJS(data[i].value)],
}, emptyMap ,l => l.map(() => 'key'));
