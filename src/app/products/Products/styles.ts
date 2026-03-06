import { styleSheetFactory } from '~/styles';

const themedStyles = styleSheetFactory(_palette => ({
  list: {
    flex: 1,
  },
}));

export default themedStyles;
