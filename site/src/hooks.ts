import { useWindowDimensions } from "react-native";
import { maxWidth } from "./theme";

export function useLayout() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 760;
  const isTablet = width >= 760 && width < 1080;
  const isDesktop = width >= 1080;
  const pad = isMobile ? 20 : isTablet ? 32 : 48;
  const contentW = Math.min(width, maxWidth + pad * 2);

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    pad,
    contentW,
    gap: isMobile ? 16 : 24,
  };
}
