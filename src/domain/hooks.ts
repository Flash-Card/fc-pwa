import { Store, Dispatch } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppState, Action } from './types';

type AppStore = Store<AppState, Action>

export type AppDispatch = Pick<AppStore, 'dispatch'>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<Dispatch<Action>>();