import { type ImageSourcePropType, type ReactNode, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radius } from "../theme";
import { useLayout } from "../hooks";

export function Container({ children }: { children: ReactNode }) {
  const { pad } = useLayout();
  return (
    <View style={[styles.container, { paddingHorizontal: pad }]}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

export function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <Text style={[styles.eyebrow, light && { color: colors.lilac }]}>{children}</Text>
  );
}

export function Title({
  children,
  light = false,
  size = "lg",
}: {
  children: string;
  light?: boolean;
  size?: "lg" | "md";
}) {
  const { isMobile } = useLayout();
  return (
    <Text
      style={[
        styles.title,
        size === "md" && styles.titleMd,
        {
          fontSize: size === "lg" ? (isMobile ? 36 : 56) : isMobile ? 28 : 36,
          lineHeight: size === "lg" ? (isMobile ? 42 : 62) : isMobile ? 34 : 42,
        },
        light && { color: colors.paper },
      ]}
    >
      {children}
    </Text>
  );
}

export function Lead({ children, light = false }: { children: string; light?: boolean }) {
  return <Text style={[styles.lead, light && { color: "#DDD6EE" }]}>{children}</Text>;
}

export function Body({ children }: { children: string }) {
  return <Text style={styles.body}>{children}</Text>;
}

export function Photo({
  source,
  alt,
  height = 280,
  radiusValue = radius.lg,
}: {
  source: ImageSourcePropType;
  alt: string;
  height?: number;
  radiusValue?: number;
}) {
  return (
    <Image
      source={source}
      accessibilityLabel={alt}
      style={[styles.photo, { height, borderRadius: radiusValue }]}
    />
  );
}

export function Gallery({
  items,
}: {
  items: { src: ImageSourcePropType; alt: string }[];
}) {
  const { isMobile, isTablet } = useLayout();
  const columns = isMobile ? 1 : isTablet ? 2 : 3;
  const [active, setActive] = useState<number | null>(null);

  return (
    <View>
      <View style={styles.gallery}>
        {items.map((item, index) => (
          <Pressable
            key={`${item.alt}-${index}`}
            onPress={() => setActive(index)}
            style={[styles.galleryItem, { width: columns === 1 ? "100%" : columns === 2 ? "48%" : "31.5%" }]}
          >
            <Image source={item.src} accessibilityLabel={item.alt} style={styles.galleryImg} />
          </Pressable>
        ))}
      </View>
      {active != null ? (
        <Pressable style={styles.lightbox} onPress={() => setActive(null)}>
          <Image source={items[active].src} style={styles.lightboxImg} />
          <Text style={styles.lightboxCap}>{items[active].alt}</Text>
          <Text style={styles.lightboxHint}>Tap anywhere to close</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inner: {
    width: "100%",
    maxWidth: 1140,
    alignSelf: "center",
  },
  eyebrow: {
    fontFamily: fonts.sansSemi,
    color: colors.lilacDeep,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.displayExtra,
    color: colors.ink,
    letterSpacing: -1.2,
    lineHeight: 62,
  },
  titleMd: {
    letterSpacing: -0.6,
    lineHeight: 40,
  },
  lead: {
    fontFamily: fonts.serif,
    color: colors.muted,
    fontSize: 19,
    lineHeight: 30,
    marginTop: 14,
    maxWidth: 640,
  },
  body: {
    fontFamily: fonts.serif,
    color: "#3F3A4A",
    fontSize: 17,
    lineHeight: 28,
  },
  photo: {
    width: "100%",
    backgroundColor: colors.lilacSoft,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  galleryItem: {
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.lilacSoft,
  },
  galleryImg: {
    width: "100%",
    height: 210,
  },
  lightbox: {
    marginTop: 16,
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    padding: 16,
    alignItems: "center",
    gap: 10,
  },
  lightboxImg: {
    width: "100%",
    height: 420,
    borderRadius: radius.md,
  },
  lightboxCap: {
    fontFamily: fonts.sansMedium,
    color: colors.paper,
    fontSize: 15,
  },
  lightboxHint: {
    fontFamily: fonts.sans,
    color: "#A99FBE",
    fontSize: 13,
  },
});
