import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing(4),
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing(2),
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: spacing(2),
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  productImagePlaceholder: {
    backgroundColor: palette.background.secondary,
  },
  headerSection: {
    alignItems: 'center',
  },
  productName: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ratingContainer: {
    marginTop: spacing(1),
  },
  ratingText: {
    color: palette.text.primary,
  },
  priceCard: {
    backgroundColor: palette.background.secondary,
    elevation: 2,
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    color: palette.text.primary,
  },
  pricePerUnitText: {
    color: palette.text.secondary,
    marginTop: spacing(1),
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(1),
  },
  detailChip: {
    marginRight: spacing(1),
    marginBottom: spacing(1),
  },
  nutritionContainer: {
    backgroundColor: palette.background.secondary,
    borderRadius: 8,
    padding: spacing(2),
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing(2),
  },
  nutritionItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing(1),
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  nutritionLabel: {
    color: palette.text.secondary,
    flex: 1,
  },
  nutritionValue: {
    fontWeight: 'bold',
    color: palette.text.primary,
  },
  infoSection: {
    marginBottom: spacing(4),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing(1),
    color: palette.text.primary,
  },
  sectionContent: {
    lineHeight: 20,
  },
  actionsContainer: {
    alignItems: 'center',
  },
  actionButton: {
    minWidth: 200,
  },
}));

export default themedStyles;
