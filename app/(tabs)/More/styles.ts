import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  root: {
    flex: 1,
    backgroundColor: palette.background.primary,
    position: 'relative',
  },
  item: {
    height: 52,
    maxHeight: 52,
    paddingHorizontal: spacing(5),
    backgroundColor: palette.background.primary,
  },
  icon: {},
  title: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '700',
    color: palette.text.primary,
  },
  disabledTitle: {
    color: palette.text.disabled,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '400',
    color: palette.text.placeholder,
  },
  subItem: {
    height: 48,
    maxHeight: 48,
    paddingRight: spacing(),
    paddingLeft: spacing(8),
    backgroundColor: palette.background.primary,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: palette.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
  },
  logout: {
    marginBottom: 32,
  },
  logoutText: { fontSize: 16, fontWeight: '400' },
}));
