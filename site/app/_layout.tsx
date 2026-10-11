import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
  useFonts as useDmSans,
} from "@expo-google-fonts/dm-sans";
import {
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
  useFonts as useSora,
} from "@expo-google-fonts/sora";
import {
  SourceSerif4_400Regular,
  SourceSerif4_500Medium,
  useFonts as useSerif,
} from "@expo-google-fonts/source-serif-4";
import { Footer, Header } from "../src/components/Chrome";
import { colors } from "../src/theme";

export default function RootLayout() {
  const [sansLoaded] = useDmSans({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });
  const [displayLoaded] = useSora({
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });
  const [serifLoaded] = useSerif({
    SourceSerif4_400Regular,
    SourceSerif4_500Medium,
  });

  if (!sansLoaded || !displayLoaded || !serifLoaded) {
    return <View style={styles.shell} />;
  }

  return (
    <View style={styles.shell}>
      <StatusBar style="dark" />
      <Header />
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      >
        <Slot />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: colors.cream,
    ...(Platform.OS === "web" ? { height: "100vh", maxHeight: "100vh" } : {}),
  },
  scroller: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
