import { Link, usePathname } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from '~/components/ui/themed-text';
import { ThemedView } from '~/components/ui/themed-view';

export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Unmatched route</ThemedText>
      <ThemedText style={styles.path}>Path: {pathname || '(unknown)'}
      </ThemedText>
      <ThemedText style={styles.hint}>
        If this persists, the route may not exist or the manifest is stale.
      </ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go to Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  path: {
    marginTop: 8,
  },
  hint: {
    opacity: 0.7,
  },
  link: {
    marginTop: 16,
  },
});
