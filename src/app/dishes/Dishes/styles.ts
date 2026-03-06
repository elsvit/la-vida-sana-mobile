import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  root: {
    flex: 1,
  },
}));

export default themedStyles;
