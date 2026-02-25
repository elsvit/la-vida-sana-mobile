import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  productCard: {
    backgroundColor: palette.background.secondary,
    elevation: 2,
    borderRadius: 8,
    marginVertical: spacing(0.5),
  },
  productContent: {
    padding: spacing(1), // Reduced from spacing(2)
  },
  productMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageContainer: {
    width: 40, // Reduced from 50
    height: 40, // Reduced from 50
    borderRadius: 20, // Reduced from 25
    backgroundColor: palette.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing(1), // Reduced from spacing(2)
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  productImagePlaceholder: {
    color: palette.text.primary,
    fontSize: 16, // Reduced from 20
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    marginRight: spacing(1), // Reduced from spacing(2)
  },
  productName: {
    fontSize: 14, // Reduced from 16
    fontWeight: '600',
    color: palette.text.primary,
    marginBottom: spacing(0.25), // Reduced from spacing(0.5)
  },
  productDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing(0.25),
  },
  productSize: {
    fontSize: 12,
    color: palette.text.secondary,
    flex: 1,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text.primary,
    marginLeft: spacing(1),
  },
  productActions: {
    alignItems: 'flex-end',
  },
  priceChip: {
    backgroundColor: palette.background.secondary,
    marginBottom: spacing(0.5),
  },
  priceText: {
    color: palette.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing(0.5), // Reduced from spacing(1)
    gap: spacing(0.5),
  },
  nutritionChip: {
    backgroundColor: palette.background.secondary,
  },
  nutritionText: {
    color: palette.text.secondary,
    fontSize: 10, // Small font as requested
    marginRight: spacing(1),
  },
}));
