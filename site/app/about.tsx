import Head from "expo-router/head";
import { Image, StyleSheet, Text, View } from "react-native";
import { Body, Container, Eyebrow, Lead, Photo, Title } from "../src/components/Blocks";
import { PrimaryButton } from "../src/components/Chrome";
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
        <View style={[styles.split, { flexDirection: isMobile ? "column-reverse" : "row", paddingVertical: isMobile ? 48 : 72 }]}>
          <View style={styles.founderCard}>
            <Image source={images.founder} style={styles.founderPhoto} accessibilityLabel="Rishi Pai, founder" />
            <Text style={styles.founderName}>Rishi Pai</Text>
            <Text style={styles.founderRole}>Founder and CEO</Text>
          </View>
          <View style={{ flex: 1.3, gap: 14 }}>
            <Eyebrow>Meet the founder</Eyebrow>
            <Title size="md">A student building the classroom he wanted others to have</Title>
            <Body>
              Rishi is a student at Northview High School in Johns Creek, Georgia. He started Future Innovators from
              a love of hands-on learning and a commitment to widening access to STEM in his Atlanta community — and
              now beyond it.
            </Body>
            <Body>
              With a background in engineering and a habit of teaching, he leads workshops himself and works with
              schools to keep the programs practical, welcoming, and ambitious.
            </Body>
            <PrimaryButton label="Work with us" href="/contact" />
          </View>
        </View>
      </Container>

      <Container>
        <View style={[styles.split, { flexDirection: isMobile ? "column" : "row", paddingBottom: 56 }]}>
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
  founderCard: {
    flex: 0.8,
    alignItems: "center",
    gap: 10,
  },
  founderPhoto: {
    width: 240,
    height: 280,
    borderRadius: radius.lg,
  },
  founderName: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 22,
  },
  founderRole: {
    fontFamily: fonts.sansMedium,
    color: colors.muted,
    fontSize: 14,
  },
  caption: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
  },
});
