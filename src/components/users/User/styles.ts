import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(() => ({
  root: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
  },
}));
