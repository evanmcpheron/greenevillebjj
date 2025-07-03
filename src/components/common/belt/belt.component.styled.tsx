import { filterProps } from "@/styles/filter.props.helper";

export type BeltColor =
  | "white"
  | "grey"
  | "grey_white"
  | "grey_black"
  | "yellow"
  | "yellow_white"
  | "yellow_black"
  | "orange"
  | "orange_white"
  | "orange_black"
  | "green"
  | "green_white"
  | "green_black"
  | "blue"
  | "purple"
  | "brown"
  | "black"
  | "red_black"
  | "red_white"
  | "red";

export const BJJ_BELT_HEX: Record<BeltColor, string> = {
  white: "#FFFFFF",
  grey: "#A9A9A9",
  grey_white: "#A9A9A9",
  grey_black: "#A9A9A9",
  yellow: "#fcec03",
  yellow_white: "#fcec03",
  yellow_black: "#fcec03",
  orange: "#FFA500",
  orange_white: "#FFA500",
  orange_black: "#FFA500",
  green: "#4dc223",
  green_white: "#4dc223",
  green_black: "#4dc223",
  blue: "#0000FF",
  purple: "#9827b8",
  brown: "#8B4513",
  black: "#000000",
  red: "#B30000",
  red_white: "#B30000",
  red_black: "#B30000",
};

export const beltColorToHex = (color: BeltColor): string => BJJ_BELT_HEX[color];

export const getRankBarColor = (belt: BeltColor): string | null => {
  if (belt === "black") return BJJ_BELT_HEX["red"];
  if (["white", "blue", "purple", "brown"].includes(belt))
    return BJJ_BELT_HEX["black"];
  if (/^(grey|yellow|orange|green)/.test(belt)) return BJJ_BELT_HEX["black"];
  return null;
};

export const getBeltMidlineStripe = (belt: BeltColor): string | null => {
  if (belt.endsWith("_white")) return BJJ_BELT_HEX["white"];
  if (belt.endsWith("_black")) return BJJ_BELT_HEX["black"];
  return null;
};

// maximum stripes per belt type
export const BELT_CONFIG = {
  default: { maxStripes: 4 },
  black: { maxStripes: 6 },
};
export const BeltWrapper = filterProps<{ scale: number }>("div")`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => 4 * props.scale}px;
  font-family: sans-serif;
`;

export const BeltBand = filterProps<{ color: string; scale: number }>("div")`
  background-color: ${(props) => props.color};
  width: ${(props) => 70 * props.scale}px;
  height: ${(props) => 20 * props.scale}px;
  border-radius: ${(props) => 4 * props.scale}px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 ${(props) => 1 * props.scale}px ${(props) =>
  3 * props.scale}px rgba(0, 0, 0, 0.2);
`;

export const StripeContainer = filterProps<{ color: string; scale: number }>(
  "div"
)`
  background-color: ${(props) => props.color};
  display: flex;
  padding-left: ${(props) => 4 * props.scale}px;
  gap: ${(props) => 5 * props.scale}px;
  height: 100%;
  width: ${(props) => 40 * props.scale}px;
  z-index: 1;
`;

export const Stripe = filterProps<{ color: string; scale: number }>("div")`
  background-color: ${(props) => props.color};
  width: ${(props) => 4 * props.scale}px;
  height: 100%;
`;

export const OverlayStripe = filterProps<{ color: string; scale: number }>(
  "div"
)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: ${(props) => 6 * props.scale}px;
  width: 100%;
  background-color: ${(props) => props.color};
  pointer-events: none;
  border-radius: ${(props) => 2 * props.scale}px;
`;

export const BlackBeltStripeContainer = filterProps<{
  color: string;
  scale: number;
}>("div")`
  background-color: ${(props) => props.color};
  display: flex;
  padding-left: ${(props) => 3.5 * props.scale}px;
  gap: ${(props) => 3 * props.scale}px;
  height: 100%;
  width: ${(props) => 40 * props.scale}px;
  z-index: 1;
`;

export const BlackBeltStripe = filterProps<{ color: string; scale: number }>(
  "div"
)`
  background-color: ${(props) => props.color};
  width: ${(props) => 3 * props.scale}px;
  height: 100%;
`;

export const RedBeltStripeContainer = filterProps<{ scale: number }>("div")`
  display: flex;
  gap: 25%;
  height: 100%;
  width: ${(props) => 80 * props.scale}px;
  z-index: 1;
  border-radius: ${(props) => 4 * props.scale}px;
  overflow: hidden;
`;

export const RedBeltStripe = filterProps<{ color: string; scale: number }>(
  "div"
)`
  background-color: ${(props) => props.color};
  width: ${(props) => 20 * props.scale}px;
  height: 100%;
`;
