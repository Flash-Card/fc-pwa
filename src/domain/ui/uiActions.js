import { action } from 'lib/action';
import * as S from './uiSelector';

export const menuAction = action('ui/MENU_ACTION');

export function menuToggle(newStatus) {
  return (dispatch, getState) => {
    const status = (typeof newStatus === 'undefined') ? !S.menuStatus(getState()) : newStatus;
    return dispatch(
      menuAction(status),
    );
  };
}

export const progress = action('ui/PROGRESS', action => action);
