import Head from "expo-router/head";
import { Image, StyleSheet, Text, View } from "react-native";
import { Body, Container, Eyebrow, Lead, Photo, Title } from "../src/components/Blocks";
import { PrimaryButton } from "../src/components/Chrome";
import { WorkshopIcon } from "../src/components/Icons";
import { org, projects, stats, workshops } from "../src/data";
import { useLayout } from "../src/hooks";
import { images } from "../src/images";
import { colors, fonts, radius } from "../src/theme";

export default function Home() {
  const { isMobile, pad } = useLayout();

  return (
    <View>
      <Head>
        <title>Home | The Future Innovators</title>
      </Head>

      <Container>
        <View
          style={[
            styles.hero,
            {
              paddingTop: isMobile ? 36 : 64,
              paddingBottom: isMobile ? 36 : 56,
              flexDirection: isMobile ? "column" : "row",
            },
          ]}
        >
          <View style={{ flex: 1.05, gap: 18 }}>
            <Eyebrow>Atlanta · Telangana · Hands-on STEM</Eyebrow>
            <Title>Empowering future engineers</Title>
            <Lead>
              Unlocking engineering potential through workshops in circuitry, materials, programming, AI, and
              Arduino — for students who deserve to see themselves as builders.
            </Lead>
            <View style={[styles.ctaRow, { flexDirection: isMobile ? "column" : "row" }]}>
              <PrimaryButton label="See our work" href="/projects" />
              <PrimaryButton label="Contact us" href="/contact" tone="ghost" />
            </View>
          </View>
          {isMobile ? (
            <Photo source={images.img4570} alt="India workshop lecture" height={280} />
          ) : (
            <View style={[styles.mosaic, { flex: 1, width: "100%", minHeight: 460 }]}>
              <Image source={images.img4570} style={styles.mosaicMain} accessibilityLabel="India workshop lecture" />
              <Image source={images.workshop4} style={styles.mosaicTop} accessibilityLabel="Arduino breadboard project" />
              <Image source={images.workshop2} style={styles.mosaicBottom} accessibilityLabel="Atlanta circuit workshop" />
            </View>
          )}
        </View>
      </Container>

      <View style={[styles.statsBand, { paddingHorizontal: pad }]}>
        <View style={[styles.statsRow, { flexDirection: isMobile ? "column" : "row" }]}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <Container>
        <View style={[styles.split, { paddingVertical: isMobile ? 48 : 80, flexDirection: isMobile ? "column" : "row" }]}>
          <View style={{ flex: 1, gap: 14 }}>
            <Eyebrow>About us</Eyebrow>
            <Title size="md">A nonprofit built around real classrooms</Title>
            <Body>
              {org.legalName} brings engineering education to students of all levels. We host ongoing,
              multidisciplinary workshops in schools and community spaces, and we are steadily expanding that work
              from Atlanta to classrooms abroad.
            </Body>
            <Body>
              The mission is simple: make introductory engineering accessible, keep students academically supported,
              and grow genuine interest in STEM.
            </Body>
            <View style={{ marginTop: 8 }}>
              <PrimaryButton label="Read our story" href="/about" tone="ink" />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Photo source={images.workshop5} alt="Atlanta workshop on C++ and Arduino" height={isMobile ? 240 : 340} />
          </View>
        </View>
      </Container>

      <View nativeID="workshops" style={{ backgroundColor: colors.paper, paddingVertical: isMobile ? 48 : 72 }}>
        <Container>
          <Eyebrow>What students build</Eyebrow>
          <Title size="md">Four workshop tracks</Title>
          <Lead>Each session mixes making, questioning, and real tools — not worksheets about science from a distance.</Lead>
          <View style={[styles.cards, { marginTop: 28 }]}>
            {workshops.map((workshop) => (
              <View key={workshop.title} style={[styles.card, { width: isMobile ? "100%" : "48%" }]}>
                <WorkshopIcon name={workshop.icon} />
                <Text style={styles.cardTitle}>{workshop.title}</Text>
                <Text style={styles.cardBody}>{workshop.body}</Text>
              </View>
            ))}
          </View>
        </Container>
      </View>

      <Container>
        <View style={{ paddingVertical: isMobile ? 48 : 72, gap: 22 }}>
          <Eyebrow>Projects</Eyebrow>
          <Title size="md">Where the work happens</Title>
          <View style={[styles.split, { flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", alignItems: "flex-start" }]}>
            {projects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <Photo source={project.cover} alt={project.region} height={220} />
                <Text style={styles.projectKicker}>
                  {project.season} · {project.students}
                </Text>
                <Text style={styles.projectTitle}>{project.region}</Text>
                <Text style={styles.cardBody}>{project.summary}</Text>
              </View>
            ))}
          </View>
          <PrimaryButton label="View project stories" href="/projects" />
        </View>
      </Container>

      <View style={[styles.ctaBand, { marginHorizontal: pad, marginBottom: 28 }]}>
        <Title size="md" light>
          Want a workshop at your school?
        </Title>
        <Lead light>Email or call us. We would like to hear from teachers, parents, and students.</Lead>
        <PrimaryButton label="Get in touch" href="/contact" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 36,
    alignItems: "center",
  },
  ctaRow: {
    gap: 12,
    marginTop: 8,
  },
  mosaic: {
    position: "relative",
  },
  mosaicMain: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "62%",
    height: "86%",
    borderRadius: radius.lg,
  },
  mosaicTop: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "44%",
    height: "48%",
    borderRadius: radius.lg,
  },
  mosaicBottom: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "34%",
    height: "44%",
    borderRadius: radius.lg,
  },
  statsBand: {
    backgroundColor: colors.indigo,
    paddingVertical: 36,
  },
  statsRow: {
    maxWidth: 1140,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    gap: 22,
  },
  stat: {
    flex: 1,
    gap: 6,
  },
  statValue: {
    fontFamily: fonts.displayExtra,
    color: colors.white,
    fontSize: 40,
  },
  statLabel: {
    fontFamily: fonts.sansMedium,
    color: colors.lilac,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  split: {
    gap: 36,
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: 22,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardTitle: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 22,
  },
  cardBody: {
    fontFamily: fonts.serif,
    color: "#4A4556",
    fontSize: 16,
    lineHeight: 26,
  },
  projectCard: {
    flex: 1,
    minWidth: 260,
    gap: 12,
  },
  projectKicker: {
    fontFamily: fonts.sansSemi,
    color: colors.lilacDeep,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  projectTitle: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 24,
  },
  ctaBand: {
    backgroundColor: colors.indigo,
    borderRadius: radius.xl,
    paddingVertical: 48,
    paddingHorizontal: 32,
    gap: 16,
    alignItems: "flex-start",
  },
});
