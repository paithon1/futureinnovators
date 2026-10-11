import Head from "expo-router/head";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Container, Eyebrow, Lead, Photo, Title } from "../src/components/Blocks";
import { org } from "../src/data";
import { useLayout } from "../src/hooks";
import { images } from "../src/images";
import { colors, fonts, radius } from "../src/theme";

export default function Contact() {
  const { isMobile } = useLayout();

  return (
    <View>
      <Head>
        <title>Contact | Future Innovators</title>
      </Head>
      <Container>
        <View style={{ paddingTop: isMobile ? 36 : 56, paddingBottom: 12 }}>
          <Eyebrow>Contact</Eyebrow>
          <Title>Let’s build the next workshop together</Title>
          <Lead>
            Questions, school partnerships, or a note for the team — call or email The Future Innovators.
          </Lead>
        </View>
      </Container>

      <Container>
        <View style={[styles.split, { flexDirection: isMobile ? "column" : "row", paddingBottom: 56 }]}>
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue} onPress={() => Linking.openURL(org.phoneHref)}>
              {org.phone}
            </Text>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue} onPress={() => Linking.openURL(`mailto:${org.email}`)}>
              {org.email}
            </Text>
            <Text style={styles.detailLabel}>Based in</Text>
            <Text style={styles.detailValue}>{org.location}</Text>
            <Text style={styles.note}>
              Feel free to reach out with any questions or ideas for a school visit.
            </Text>
          </View>
          <View style={{ flex: 1, width: "100%" }}>
            <Photo source={images.workshop6} alt="LED circuit workshop in Atlanta" height={isMobile ? 220 : 280} />
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  split: {
    gap: 32,
    alignItems: "stretch",
  },
  detailCard: {
    flex: 1,
    backgroundColor: colors.indigo,
    borderRadius: radius.lg,
    padding: 28,
    gap: 6,
    width: "100%",
  },
  detailLabel: {
    fontFamily: fonts.sansSemi,
    color: colors.lilac,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 10,
  },
  detailValue: {
    fontFamily: fonts.sansMedium,
    color: colors.white,
    fontSize: 18,
    lineHeight: 26,
  },
  note: {
    fontFamily: fonts.serif,
    color: "#DDD6EE",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 18,
  },
});
