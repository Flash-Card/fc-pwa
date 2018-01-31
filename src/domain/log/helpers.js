import * as sz from 'serialize';

export const logItemSerialize = sz.dstObjToObjSerialize({
  date: () => ['date', new Date()],
  payload: v => ['key', v],
  status: v => ['status', v],
});
