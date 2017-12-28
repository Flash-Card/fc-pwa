import I from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import {
  dstImToObjSerialize,
  dstExImToObjSerialize,
  imGetter,
  srcArrToMapSerialize,
} from '../serialize';

const MOCK_DATA_1 = I.fromJS({
  id: 10,
  first_name: 'host_1',
  last_name: 'last name',
  access_levels: ['guest_name', 'arrival_time'],
  token: 'supertokentest',
});

describe('Serializer', () => {
  let serializator;
  beforeEach(() => {
    jest.addMatchers(matchers);
    serializator = {
      id: v => ['id', v],
      first_name: v => ['first_name', v],
      weight: v => ['weight', v],
      guest_name: (_, d) => ['guest_name', d.get('access_levels').includes('guest_name')],
      arrival_time: (_, d) => ['arrival_time', d.get('access_levels').includes('arrival_time')],
    };
  });

  it('simpleDeSerialize function', () => {
    const srz = dstExImToObjSerialize(serializator);
    const res = srz(MOCK_DATA_1);
    expect(res).toEqual({
      id: 10,
      first_name: 'host_1',
    });
  });

  it('flatSerialize function simple', () => {
    const srz = dstImToObjSerialize(serializator);
    const res = srz(MOCK_DATA_1);
    expect(res).toEqual({
      id: 10,
      first_name: 'host_1',
      guest_name: true,
      arrival_time: true,
    });
  });

  it('flatSerialize function change structure of data', () => {
    const resource = dstImToObjSerialize({
      first_name: v => ['first_name', v],
      last_name: v => ['last_name', v],
    });
    const srz = dstImToObjSerialize({
      resource: (_, d) => ['resource', resource(d)],
      token: v => ['token', v],
    });
    const res = srz(MOCK_DATA_1);
    expect(res).toEqual({
      resource: {
        first_name: 'host_1',
        last_name: 'last name',
      },
      token: 'supertokentest',
    });
  });

  it('imGetter function', () => {
    expect(imGetter(MOCK_DATA_1, 'id')).toBe(10);
  });

  it('srcArToMapSerialize serializer', () => {
    const array = [
      { id: '10', text: 'same text' },
      { id: '12', text: 'same text 2' },
    ];

    const DataSerializer = srcArrToMapSerialize({
      id: (v, data, i) => [[data[v]], I.fromJS(data[i])],
    });
    expect(DataSerializer(array)).toBeImmutableMap(I.fromJS({
      '10': array[0],
      '12': array[1],
    }));
  });

});
