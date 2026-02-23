import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  listContainer: {
    paddingBottom: spacing(0.5),
  },
  categoryContainer: {
    backgroundColor: palette.background.primary,
  },
  categoryItem: {
    backgroundColor: palette.background.primary,
    paddingLeft: spacing(5),
    paddingRight: spacing(5),
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing(2),
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text.primary,
  },
  countChip: {
    marginRight: spacing(1),
    backgroundColor: palette.background.secondary,
  },
  countText: {
    fontSize: 12,
    color: palette.text.secondary,
  },
  categoryDivider: {
    backgroundColor: palette.border,
    marginHorizontal: spacing(2),
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing(4),
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.text.primary,
    marginBottom: spacing(2),
  },
  emptyStateDescription: {
    fontSize: 14,
    color: palette.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  itemSeparator: {
    height: 1,
    marginVertical: spacing(0.5),
  },
}));
