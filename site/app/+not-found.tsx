import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../src/theme";

export default function NotFound() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.body}>That link does not exist on this site.</Text>
      <Link href="/" style={styles.link}>
        Back home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.muted,
  },
  link: {
    fontFamily: fonts.sansSemi,
    color: colors.copper,
    fontSize: 16,
    marginTop: 8,
  },
});
