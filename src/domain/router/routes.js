import { makeString } from 'lib/helpers';
import * as ACL from 'domain/restriction';

function path(strings, ...names) {
  const pathMaker = makeString(strings, ...names);
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
    restriction: true,
  },
  {
    path: path`/memoize`,
    exact: true,
    title: 'memoize',
    component: () => import('pages/memoize/index'),
    restriction: true,
    saga: () => import('pages/memoize/sagas'),
  },
  {
    path: path`/memoize/${'cardId'}`,
    exact: true,
    title: 'memoize card',
    component: () => import('pages/memoize/cards'),
    restriction: false,
    saga: () => import('pages/memoize/cards/sagas'),
  },
  {
    path: path`/quiz`,
    exact: true,
    title: 'quiz',
    component: () => import('pages/quiz'),
    restriction: ACL.MENU_QUIZ,
    saga: () => import('pages/quiz/sagas'),
  },
  {
    path: path`/create`,
    exact: true,
    title: 'create card',
    component: () => import('pages/create/index'),
    restriction: true,
  },
  {
    path: path`/edit/${'cardId'}`,
    exact: true,
    title: 'edit card',
    component: () => import('pages/edit'),
    saga: () => import('pages/edit/sagas'),
    restriction: false,
  },
  {
    path: path`/about`,
    exact: true,
    title: 'About',
    component: () => import('pages/about'),
    saga: () => import('pages/about/sagas'),
    restriction: true,
  },
  {
    path: path`/search`,
    title: 'Search result',
    component: () => import('pages/search'),
    restriction: false,
    saga: () => import('pages/search/sagas'),
  },
];

function byId(arr) {
  return arr.reduce((A, V) => Object.assign({}, A, { [V.path.pathname]: V }), {});
}

const routesById = byId(routes);

export { routesById };

export default routes;
