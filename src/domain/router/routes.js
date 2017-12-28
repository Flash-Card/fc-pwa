function makeString(strings, keys) {
  if (keys.length === 0) return () => strings.reduce((A, V) => A + V, '');
  return args => {
    let str = '';
    for (let i=0; i < keys.length; i++) {
      str += strings[i];
      str += (typeof args !== 'undefined' && keys[i] in args) ? args[keys[i]] : `:${keys[i]}`;
    }
    str += strings[strings.length-1];
    return str;
  };
}

function path(strings, ...names) {
  const pathMaker = makeString(strings, names);
  return {
    pathname: pathMaker(),
    pathMaker,
  };
}

const routes = [
  {
    path: path`/`,
    exact: true,
    title: 'home',
    component: () => import('pages/home/index'),
    restriction: null,
  },
  {
    path: path`/memoize`,
    exact: true,
    title: 'memoize',
    component: () => import('pages/memoize/index'),
    restriction: null,
    saga: () => import('pages/memoize/sagas'),
  },
  {
    path: path`/memoize/${'cardId'}`,
    exact: true,
    title: 'memoize card',
    component: () => import('pages/memoize/cards'),
    restriction: null,
    saga: () => import('pages/memoize/cards/sagas'),
  },
  {
    path: path`/quiz`,
    exact: true,
    title: 'quiz',
    component: () => import('pages/quiz/index'),
    restriction: null,
  },
  {
    path: path`/create`,
    exact: true,
    title: 'create card',
    component: () => import('pages/create/index'),
    restriction: null,
  },
  {
    path: path`/edit/${'cardId'}`,
    exact: true,
    title: 'edit card',
    component: () => import('pages/edit'),
    saga: () => import('pages/edit/sagas'),
    restriction: null,
  },
  {
    path: path`/auth`,
    exact: true,
    title: 'SignIn',
    component: () => import('pages/home/index'),
    restriction: null,
  },
];

function byId(arr) {
  return arr.reduce((A, V) => Object.assign({}, A, { [V.path.pathname]: V }), {});
}

const routesById = byId(routes);

export { routesById };

export default routes;
