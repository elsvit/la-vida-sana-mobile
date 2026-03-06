import { StyleSheet } from 'react-native';
import { palette } from '~/styles';
import { HEADER_HEIGHT } from '~/constants';

export const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: palette.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  leftContainer: {
    width: 80,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flexDirection: 'row',
    width: 80, // reserve space for up to 3 icons
  },
  leftButton: {
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  rightButton: {
    paddingHorizontal: 8,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
