import { spacing, styleSheetFactory } from '~/styles';

export const themedStyles = styleSheetFactory(palette => ({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: spacing(4),
    paddingBottom: spacing(6),
  },

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ---------- HEADER ---------- */

  headerSection: {
    alignItems: 'center',
    marginBottom: spacing(2),
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: palette.text.primary,
  },

  ratingText: {
    marginTop: spacing(1),
    color: palette.text.secondary,
  },

  /* ---------- IMAGE ---------- */

  imageContainer: {
    alignItems: 'center',
    marginTop: spacing(2),
  },

  image: {
    width: 220,
    height: 220,
    borderRadius: 16,
  },

  imagePlaceholder: {
    backgroundColor: palette.background.secondary,
  },

  /* ---------- TAGS ---------- */

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing(1),
  },

  chip: {
    marginBottom: spacing(1),
  },

  /* ---------- INFO ROWS ---------- */

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing(1.5),
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },

  infoLabel: {
    color: palette.text.secondary,
  },

  infoValue: {
    fontWeight: '600',
    color: palette.text.primary,
  },

  /* ---------- SECTIONS ---------- */

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing(1),
    color: palette.text.primary,
  },

  sectionContent: {
    lineHeight: 22,
    color: palette.text.secondary,
  },

  sectionBlock: {
    marginBottom: spacing(4),
  },
}));

export default themedStyles;
