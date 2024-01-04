import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "./theme";
    
const getGlobalStyles = (props : AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: props.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.colors.background,
  },
});

export function useGlobalStyles() {
  const theme = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getGlobalStyles(theme), [theme]);

  return styles;
}