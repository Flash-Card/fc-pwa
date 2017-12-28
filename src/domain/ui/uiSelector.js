import { selector, peek } from 'lib/selectors';

const ui = state => state.ui;
export const menu = selector(ui, peek('menu'));
export const menuStatus = selector(ui, u => u.getIn(['menu', 'isOpen']));
