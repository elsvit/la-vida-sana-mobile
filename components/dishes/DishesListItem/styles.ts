import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  container: {
    marginBottom: spacing(2),
    marginHorizontal: spacing(4),
    backgroundColor: palette.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  disabledContainer: {
    opacity: 0.5,
    backgroundColor: palette.background.secondary,
  },
  content: {
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(4),
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    marginRight: spacing(3),
  },
  dishImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dishImagePlaceholder: {
    backgroundColor: palette.text.secondary,
  },
  dishInfo: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  dishName: {
    fontWeight: '600',
    marginRight: 8,
    color: palette.text.primary,
  },
  idChip: {
    marginRight: 4,
    marginBottom: 2,
  },
  disabledChip: {
    marginRight: spacing(1),
    marginBottom: spacing(0.5),
    borderColor: palette.text.error,
  },
  chipText: {
    fontSize: 12,
  },
  nutritionText: {
    color: palette.text.secondary,
    lineHeight: 16,
  },
  actionsContainer: {
    alignItems: 'flex-end',
    marginLeft: spacing(2),
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginHorizontal: 2,
    width: 32,
    height: 32,
  },
  detailsRow: {
    marginTop: spacing(2),
    paddingTop: spacing(2),
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  detailsText: {
    color: palette.text.secondary,
    fontSize: 12,
    lineHeight: 16,
  },
}));
