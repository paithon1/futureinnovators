import { type ReactNode, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { colors, fonts, radius } from "../theme";
import { images } from "../images";
import { nav, org } from "../data";
import { useLayout } from "../hooks";

export function PrimaryButton({
  label,
  onPress,
  href,
  tone = "copper",
}: {
  label: string;
  onPress?: () => void;
  href?: string;
  tone?: "copper" | "ink" | "ghost";
}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const palette = {
    copper: { bg: hover ? colors.copperHover : colors.copper, fg: colors.white, border: "transparent" },
    ink: { bg: hover ? "#2C2548" : colors.ink, fg: colors.white, border: "transparent" },
    ghost: {
      bg: hover ? colors.lilacSoft : "transparent",
      fg: colors.ink,
      border: colors.line,
    },
  }[tone];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        if (onPress) onPress();
        else if (href) router.push(href as "/");
      }}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={StyleSheet.flatten([
        styles.btn,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ])}
    >
      <Text style={StyleSheet.flatten([styles.btnLabel, { color: palette.fg }])}>{label}</Text>
    </Pressable>
  );
}

export function Header() {
  const { isMobile, pad } = useLayout();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <View style={StyleSheet.flatten([styles.header, { paddingHorizontal: pad }])}>
      <View style={styles.headerInner}>
        <Link href="/" asChild>
          <Pressable style={styles.brand} onPress={() => setOpen(false)}>
            <Image source={images.logo} style={styles.logo} />
            <View>
              <Text style={styles.brandName}>{org.name}</Text>
              <Text style={styles.brandTag}>Engineering education</Text>
            </View>
          </Pressable>
        </Link>

        {isMobile ? (
          <Pressable onPress={() => setOpen((v) => !v)} style={styles.menuBtn} accessibilityLabel="Open menu">
            <View style={styles.bar} />
            <View style={[styles.bar, { width: open ? 18 : 14 }]} />
            <View style={styles.bar} />
          </Pressable>
        ) : (
          <View style={styles.navRow}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} asChild>
                  <Pressable style={styles.navItem}>
                    <Text style={[styles.navLabel, active && styles.navActive]}>{item.label}</Text>
                    {active ? <View style={styles.navDot} /> : null}
                  </Pressable>
                </Link>
              );
            })}
            <PrimaryButton label="Get involved" href="/contact" />
          </View>
        )}
      </View>

      {isMobile && open ? (
        <View style={styles.mobileMenu}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} asChild>
              <Pressable style={styles.mobileLink} onPress={() => setOpen(false)}>
                <Text style={styles.mobileLabel}>{item.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export function Footer() {
  const { isMobile, pad } = useLayout();

  return (
    <View style={[styles.footer, { paddingHorizontal: pad }]}>
      <View style={[styles.footerGrid, { flexDirection: isMobile ? "column" : "row" }]}>
        <View style={{ flex: 1.2, gap: 12 }}>
          <View style={styles.brand}>
            <Image source={images.logo} style={styles.logo} />
            <Text style={styles.footerBrand}>{org.shortName}</Text>
          </View>
          <Text style={styles.footerBody}>
            A nonprofit bringing hands-on engineering and STEM workshops to students in Atlanta and around the world.
          </Text>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.footerHead}>Visit</Text>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Text style={styles.footerLink}>{item.label}</Text>
            </Link>
          ))}
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.footerHead}>Contact</Text>
          <Pressable onPress={() => Linking.openURL(org.phoneHref)}>
            <Text style={styles.footerLink}>{org.phone}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${org.email}`)}>
            <Text style={styles.footerLink}>{org.email}</Text>
          </Pressable>
          <Text style={styles.footerLink}>{org.location}</Text>
        </View>
      </View>
      <Text style={styles.legal}>© {new Date().getFullYear()} {org.name}. All rights reserved.</Text>
    </View>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <View style={styles.page}>{children}</View>;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cream,
    width: "100%",
  },
  header: {
    backgroundColor: colors.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingTop: 14,
    paddingBottom: 14,
    zIndex: 20,
  },
  headerInner: {
    maxWidth: 1140,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  brandName: {
    fontFamily: fonts.displayBold,
    color: colors.ink,
    fontSize: 16,
    letterSpacing: -0.3,
  },
  brandTag: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 12,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navLabel: {
    fontFamily: fonts.sansMedium,
    color: colors.muted,
    fontSize: 15,
  },
  navActive: {
    color: colors.ink,
    fontFamily: fonts.sansSemi,
  },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.lilacDeep,
  },
  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: colors.paper,
  },
  bar: {
    width: 18,
    height: 2,
    backgroundColor: colors.ink,
    borderRadius: 2,
  },
  mobileMenu: {
    maxWidth: 1140,
    width: "100%",
    alignSelf: "center",
    paddingTop: 12,
    gap: 4,
  },
  mobileLink: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  mobileLabel: {
    fontFamily: fonts.sansSemi,
    color: colors.ink,
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  btnLabel: {
    fontFamily: fonts.sansSemi,
    fontSize: 14,
  },
  footer: {
    backgroundColor: colors.ink,
    paddingTop: 48,
    paddingBottom: 28,
    marginTop: 8,
  },
  footerGrid: {
    maxWidth: 1140,
    width: "100%",
    alignSelf: "center",
    gap: 36,
    marginBottom: 32,
  },
  footerBrand: {
    fontFamily: fonts.displayBold,
    color: colors.white,
    fontSize: 18,
  },
  footerBody: {
    fontFamily: fonts.serif,
    color: "#D8D2E4",
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 420,
  },
  footerHead: {
    fontFamily: fonts.sansSemi,
    color: colors.lilac,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  footerLink: {
    fontFamily: fonts.sans,
    color: "#EDE8F6",
    fontSize: 15,
    lineHeight: 24,
  },
  legal: {
    maxWidth: 1140,
    width: "100%",
    alignSelf: "center",
    fontFamily: fonts.sans,
    color: "#9A93AD",
    fontSize: 13,
    borderTopWidth: 1,
    borderTopColor: "#3A3452",
    paddingTop: 18,
  },
});
