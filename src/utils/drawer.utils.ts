import { filter, groupBy, isNaN, map, meanBy, result, some, sum, sumBy } from 'lodash'
import { IDrawer, ISubmenu } from '../types';

export const convertToGroupedList = (arr : ISubmenu[]) => {
  const groupedByMenuGroup = groupBy(arr, 'MenuGroup');

  const groupedMenuList = map(groupedByMenuGroup, (group, MenuGroup) => ({
    MenuGroup,
    SubMenu: map(group, ({ MenuGroup, ...rest }) => rest),
  }));

  return groupedMenuList;
};