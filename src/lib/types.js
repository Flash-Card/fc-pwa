/**
 * @flow
 */
import I from 'immutable';

export type ActionCreator<P, A> = (P) => A

type _Dispatch<A, _ : ActionCreator<*, A>> = (A) => Promise<*>

export type Dispatch<AC> = _Dispatch<*, AC>

export type State = { [key: string]: I.Map }

export type GetState = () => State

type _Dispatched<P, R, _: ActionCreator<P, R>> = (P) => Promise<R>

export type Dispatched<AC> = _Dispatched<*, *, AC>

export type Store = { dispatch: Dispatch<*>, getState: GetState }

export type Location = {
  pathname: string,
  query?: {
    [key: string]: string,
  },
}

export type RouterState = {
  params: {
    [key: string]: string,
  },
  location: Location,
}

type Replace = ({ } | string) => void;

export type RouteConfig = {
  component?: Function | ReactClass<*>,
  onEnter?: (current: RouterState, replace: Replace, callback: () => void) => void,
  onChange?: (old: RouterState, current: RouterState) => void,
  childRoutes?: Array<RouteConfig>,
  indexRoute?: RouteConfig,
}
