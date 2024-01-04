import { filter, groupBy, isNaN, map, meanBy, result, some, sum, sumBy } from 'lodash'
import { IDrawer, ISubmenu } from '../types';
import { useTheme } from 'react-native-paper';
export const getPrimaryColor = () => {
  const theme = useTheme();
  return theme.colors.primary;
};
export const getBackgroundPrimaryColor = () => {
  const theme = useTheme();
  return theme.colors.onPrimary;
};