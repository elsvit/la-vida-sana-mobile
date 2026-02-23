import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  sellerHeader: {
    backgroundColor: palette.background.secondary,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
    marginTop: spacing(2),
    marginHorizontal: spacing(2),
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sellerHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sellerHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerIcon: {
    fontSize: 20,
    marginRight: spacing(2),
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.text.primary,
    textTransform: 'capitalize',
    flex: 1,
    marginLeft: spacing(2),
  },
  toggleButton: {
    padding: spacing(1),
    borderRadius: 4,
  },
  sellerProductsContainer: {
    backgroundColor: palette.background.primary,
  },
  sellerDivider: {
    marginVertical: spacing(2),
  },
  divider: {
    backgroundColor: palette.border,
    marginHorizontal: spacing(2),
    height: 1,
  },
}));
