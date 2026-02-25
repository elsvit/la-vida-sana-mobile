import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  categoryRow: {
    padding: 14,
    backgroundColor: "#f3f4f6",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoryNameEn: {
    fontSize: 13,
    color: "#6b7280",
  },
}));
