import schema from './schema';
import { arrayRange } from 'lib/helpers';

export default function(fixtures) {
  return event => {
    const { newVersion, target: { result } } = event;
    arrayRange(newVersion).forEach((_, idx) => {
      schema[idx + 1].forEach(item => {

        const objectStore = result.createObjectStore(item.name, item.options);

        if (Array.isArray(item.fixture) && item.fixture.length) {
          item.fixture.forEach(values => fixtures.push({ table: item.name, values }));
        }

        item.indexes.forEach(idx => {
          objectStore.createIndex(idx.name, idx.keyPath, idx.option);
        });

      });
    });
  };
}
