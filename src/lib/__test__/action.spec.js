import { syncAction, asyncAction, POSTFIX } from '../action';

it('syncAction', () => {
  const type = 'test/TEST';
  const action = syncAction('test/TEST');
  expect(typeof action).toEqual('function');
  expect(action('cat')).toEqual({
    type,
    payload: 'cat',
  });
  expect('type' in action).toBeTruthy();
  expect(action.type).toEqual(type);
});

it('syncAction configuration action creator', () => {
  const type = 'test/TEST';
  const action = syncAction('test/TEST', (payload, data) => ({ payload, data }));
  expect(typeof action).toEqual('function');
  expect(action('cat', 'dog')).toEqual({
    type,
    payload: 'cat',
    data: 'dog',
  });
  expect('type' in action).toBeTruthy();
  expect(action.type).toEqual(type);
});

it('asyncAction', () => {
  const type = 'test/TEST';
  const action = asyncAction('test/TEST');
  expect(typeof action).toEqual('function');
  expect(action('cat')).toEqual({
    type,
    payload: 'cat',
  });
  expect('type' in action).toBeTruthy();
  expect(action.type).toEqual(type);
  expect(action.request).toEqual(`${type}${POSTFIX.request}`);
  expect(action.success).toEqual(`${type}${POSTFIX.success}`);
  expect(action.failure).toEqual(`${type}${POSTFIX.failure}`);
});
