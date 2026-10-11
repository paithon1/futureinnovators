import Head from "expo-router/head";
import { StyleSheet, Text, View } from "react-native";
import { Body, Container, Eyebrow, Gallery, Lead, Photo, Title } from "../src/components/Blocks";
import { projects } from "../src/data";
import { useLayout } from "../src/hooks";
import { colors, fonts, radius } from "../src/theme";

export default function Projects() {
  const { isMobile } = useLayout();

  return (
    <View>
      <Head>
        <title>Projects | Future Innovators</title>
      </Head>
      <Container>
        <View style={{ paddingTop: isMobile ? 36 : 56, paddingBottom: 20 }}>
          <Eyebrow>Projects</Eyebrow>
          <Title>STEM classrooms, locally and online</Title>
          <Lead>
            From in-person engineering workshops to live online math, we keep showing up for the same students —
            in Atlanta and in rural Telangana.
          </Lead>
        </View>
      </Container>

      {projects.map((project, index) => (
        <View
          key={project.id}
          style={{ backgroundColor: index % 2 === 0 ? colors.paper : colors.cream, paddingVertical: isMobile ? 36 : 56 }}
        >
          <Container>
            <View style={[styles.metaRow, { flexDirection: isMobile ? "column" : "row" }]}>
              <View style={{ flex: 1.1, gap: 12 }}>
                <Text style={styles.kicker}>
                  {project.season} · {project.place}
                </Text>
                <Title size="md">{project.region}</Title>
                <Lead>{project.summary}</Lead>
                <View style={styles.chips}>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{project.students}</Text>
                  </View>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{project.season}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Photo source={project.cover} alt={project.region} height={isMobile ? 220 : 300} />
              </View>
            </View>
            <View style={{ gap: 14, marginTop: 28, maxWidth: 760 }}>
              {project.paragraphs.map((paragraph) => (
                <Body key={paragraph}>{paragraph}</Body>
              ))}
              <Text style={styles.location}>Location: {project.location}</Text>
            </View>
            <View style={{ marginTop: 28 }}>
              <Text style={styles.galleryLabel}>Photo gallery</Text>
              <Gallery items={project.gallery} />
            </View>
          </Container>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    gap: 28,
    alignItems: "center",
  },
  kicker: {
    fontFamily: fonts.sansSemi,
    color: colors.lilacDeep,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontSize: 12,
  },
  chips: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.lilacSoft,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontFamily: fonts.sansMedium,
    color: colors.indigo,
    fontSize: 13,
  },
  location: {
    fontFamily: fonts.sansMedium,
    color: colors.muted,
    fontSize: 14,
    marginTop: 8,
  },
  galleryLabel: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 20,
    marginBottom: 14,
  },
});
