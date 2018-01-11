import I from 'immutable';
import { srcArrToMapSerialize } from 'lib/serialize';

export const envSerialize = srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], I.fromJS(data[i].value)],
}, l => l.map(() => 'key'));
