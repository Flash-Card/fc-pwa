/* eslint no-restricted-globals: 0 */
import * as idb from 'lib/db';

self.onmessage = function(e) {
  idb.searchWithSpellCheck(e.data).then(res => {
    self.postMessage(res);
  });
};
