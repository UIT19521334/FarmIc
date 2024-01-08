import { filter, groupBy, isNaN, map, meanBy, result, some, sum, sumBy } from 'lodash'
import { IDrawer, IFactory, ISubDivision, ISubmenu } from '../types';

export const convertToGroupedList = (arr : ISubmenu[]) => {
  const groupedByMenuGroup = groupBy(arr, 'MenuGroup');

  const groupedMenuList = map(groupedByMenuGroup, (group, MenuGroup) => ({
    MenuGroup,
    SubMenu: map(group, ({ MenuGroup, ...rest }) => rest),
  }));

  return groupedMenuList;
};

export const convertToSubDivisionList = (arr : IFactory[]) => {
  const groupedBySubDivisionID = groupBy(arr, 'SubDivisionID');

  const groupedSubDivisionList = map(groupedBySubDivisionID, (group, SubDivisionID) => ({
    SubDivisionID,
    SubDivisionShortName: group[0].SubDivisionShortName,
    SubDivisionDescription: group[0].SubDivisionDescription,
    Factories: map(group, ({ SubDivisionID, ...rest }) => rest),
  }));

  return groupedSubDivisionList;
};

// This name is MaterialCommunityIcons  
// please go to https://oblador.github.io/react-native-vector-icons/ to get name
export const getNameIcon = (name: string) => {
  if (name === "MASTER") return "folder-account"
  if (name === "TRANSACTION") return "folder-sync"
  if (name === "MONITORING") return "folder-eye"
  if (name === "PROCESS") return "folder-clock"
  if (name === "SETTING") return "folder-cog"
  return "folder"
}