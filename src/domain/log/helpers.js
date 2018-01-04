import * as srz from 'lib/serialize';

export const logItemSerialize = srz.dstObjToObjSerialize({
  date: () => ['date', new Date()],
  payload: v => ['key', v],
  status: v => ['status', v],
});
