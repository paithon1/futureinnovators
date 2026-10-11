import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";

type IconName = "circuit" | "materials" | "code" | "chip";

export function WorkshopIcon({ name }: { name: IconName }) {
  return (
    <View style={styles.wrap}>
      {name === "circuit" && <CircuitMark />}
      {name === "materials" && <MaterialsMark />}
      {name === "code" && <CodeMark />}
      {name === "chip" && <ChipMark />}
    </View>
  );
}

function CircuitMark() {
  return (
    <View style={styles.canvas}>
      <View style={[styles.node, { left: 4, top: 18 }]} />
      <View style={[styles.node, { left: 22, top: 6 }]} />
      <View style={[styles.node, { left: 22, top: 30 }]} />
      <View style={[styles.node, { right: 4, top: 18 }]} />
      <View style={[styles.wire, { left: 12, top: 22, width: 12 }]} />
      <View style={[styles.wire, { left: 26, top: 14, width: 2, height: 16 }]} />
      <View style={[styles.wire, { left: 30, top: 22, width: 12 }]} />
    </View>
  );
}

function MaterialsMark() {
  return (
    <View style={styles.canvas}>
      <View style={[styles.slab, { top: 8, width: 28, left: 8 }]} />
      <View style={[styles.slab, { top: 18, width: 34, left: 5 }]} />
      <View style={[styles.slab, { top: 28, width: 22, left: 11 }]} />
    </View>
  );
}

function CodeMark() {
  return (
    <View style={[styles.canvas, { alignItems: "center", justifyContent: "center" }]}>
      <Text style={styles.code}>&lt;/&gt;</Text>
    </View>
  );
}

function ChipMark() {
  return (
    <View style={[styles.canvas, { alignItems: "center", justifyContent: "center" }]}>
      <View style={styles.chip}>
        <View style={styles.chipCore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.lilacSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: 44,
    height: 44,
    position: "relative",
  },
  node: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lilacDeep,
  },
  wire: {
    position: "absolute",
    height: 2,
    backgroundColor: colors.lilacDeep,
  },
  slab: {
    position: "absolute",
    height: 7,
    borderRadius: 3,
    backgroundColor: colors.lilacDeep,
    opacity: 0.9,
  },
  code: {
    fontFamily: fonts.sansBold,
    color: colors.lilacDeep,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  chip: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.lilacDeep,
    alignItems: "center",
    justifyContent: "center",
  },
  chipCore: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.lilacDeep,
  },
});
