function makeActionDefault(payload) { return { payload }; }

export function formOnSubmit(fun) {
  return (data, dispatch) => dispatch(fun(data));
}

export const POSTFIX = {
  request: '/REQUEST',
  success: '/SUCCESS',
  failure: '/FAILURE',
};

function makeActionCreator(base, makeAction) {
  return (...args) => {
    const action = makeAction(...args);
    if (typeof action === 'object') {
      action.type = base;
    }
    return action;
  };
}

export function action(base, makeAction = makeActionDefault) {

  const actionCreator = makeActionCreator(base, makeAction);

  actionCreator.type = base;
  actionCreator.onSubmit = formOnSubmit(actionCreator);

  return actionCreator;
}


export function asyncAction(base, makeAction = makeActionDefault) {

  const actionCreator = makeActionCreator(base, makeAction);

  actionCreator.type = base;
  actionCreator.request = `${base}${POSTFIX.request}`;
  actionCreator.success = `${base}${POSTFIX.success}`;
  actionCreator.failure = `${base}${POSTFIX.failure}`;
  actionCreator.onSubmit = formOnSubmit(actionCreator);

  return actionCreator;
}
