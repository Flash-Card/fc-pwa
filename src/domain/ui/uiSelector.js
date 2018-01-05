import { selector } from 'lib/selectors';

const ui = state => state.ui;
export const menuStatus = selector(ui, u => u.getIn(['menu', 'isOpen']));
