import Head from "expo-router/head";
import { StyleSheet, Text, View } from "react-native";
import { Body, Container, Eyebrow, Lead, Photo, Title } from "../src/components/Blocks";
import { useLayout } from "../src/hooks";
import { images } from "../src/images";
import { colors, fonts, radius } from "../src/theme";

const pillars = [
  {
    title: "Why we started",
    body: "STEM careers are growing, yet too many students — especially in underserved communities — never get a hands-on way in. We exist to change that through workshops, mentorship, and real projects.",
  },
  {
    title: "What we do",
    body: "We design interactive sessions with Arduinos, circuits, and code. Students work in teams, build something that works, and leave with both skill and confidence.",
  },
  {
    title: "Where we are headed",
    body: "A future where every student has the tools and support to explore STEM. Starting early is how we close opportunity gaps and grow the next generation of engineers.",
  },
];

export default function About() {
  const { isMobile } = useLayout();

  return (
    <View>
      <Head>
        <title>About | Future Innovators</title>
      </Head>
      <Container>
        <View style={{ paddingTop: isMobile ? 36 : 56, paddingBottom: 28 }}>
          <Eyebrow>About</Eyebrow>
          <Title>Empowering the engineers of this generation</Title>
          <Lead>
            Future Innovators began with a belief that every student should get to see themselves as a creator,
            problem-solver, and innovator.
          </Lead>
        </View>
      </Container>

      <Container>
        <View style={[styles.split, { flexDirection: isMobile ? "column" : "row", paddingBottom: 48 }]}>
          <View style={{ flex: 1, gap: 14 }}>
            <Eyebrow>Our story</Eyebrow>
            <Title size="md">From weekend workshops to a global classroom</Title>
            <Body>
              What started as a few weekend sessions in a local room has grown into a nonprofit dedicated to
              middle-school and early high-school engineering. We keep the work accessible, inclusive, and tied to
              problems students can touch.
            </Body>
            <Body>
              Today we serve schools in metro Atlanta and partner with classrooms abroad. The through-line is the
              same: creativity plus real tools, so young people can shape the future they imagine.
            </Body>
          </View>
          <View style={{ flex: 1 }}>
            <Photo source={images.img4568} alt="Founder teaching AI algorithms in Telangana" height={isMobile ? 240 : 360} />
          </View>
        </View>
      </Container>

      <View style={{ backgroundColor: colors.paper, paddingVertical: isMobile ? 40 : 64 }}>
        <Container>
          <Eyebrow>Mission</Eyebrow>
          <Title size="md">Expand introductory engineering — and make it stick</Title>
          <View style={[styles.pillars, { marginTop: 24 }]}>
            {pillars.map((pillar) => (
              <View key={pillar.title} style={[styles.pillar, { width: isMobile ? "100%" : "31.5%" }]}>
                <Text style={styles.pillarTitle}>{pillar.title}</Text>
                <Text style={styles.pillarBody}>{pillar.body}</Text>
              </View>
            ))}
          </View>
        </Container>
      </View>

      <Container>
        <View style={[styles.split, { flexDirection: isMobile ? "column" : "row", paddingVertical: isMobile ? 48 : 64 }]}>
          <View style={{ flex: 1, gap: 12 }}>
            <Eyebrow>Atlanta home base</Eyebrow>
            <Title size="md">Workshops in the places students already gather</Title>
            <Body>
              Summer 2025 sessions met at the Gwinnett County Public Library in Duluth — a public room, open to the
              community, where circuitry and code could live alongside ordinary Sunday afternoons.
            </Body>
          </View>
          <View style={{ flex: 1 }}>
            <Photo source={images.gwinnett} alt="Gwinnett County Public Library Duluth Branch" height={260} />
            <Text style={styles.caption}>Gwinnett County Public Library, Duluth Branch</Text>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  split: {
    gap: 32,
    alignItems: "center",
  },
  pillars: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  pillar: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: 22,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pillarTitle: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 20,
  },
  pillarBody: {
    fontFamily: fonts.serif,
    color: "#4A4556",
    fontSize: 16,
    lineHeight: 26,
  },
  caption: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
  },
});
