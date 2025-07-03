import {
  BELT_CONFIG,
  beltColorToHex,
  getRankBarColor,
  getBeltMidlineStripe,
  BeltWrapper,
  BeltBand,
  OverlayStripe,
  BlackBeltStripe,
  BlackBeltStripeContainer,
  RedBeltStripe,
  RedBeltStripeContainer,
  Stripe,
  StripeContainer,
  BJJ_BELT_HEX,
} from "./belt.component.styled";

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

interface BeltIconProps {
  belt: BeltColor;
  stripes?: number;
  scale?: number;
}

export const BeltIcon: React.FC<BeltIconProps> = ({
  belt,
  stripes = 0,
  scale = 1,
}) => {
  if (belt.startsWith("red")) {
    const stripeColor = belt.endsWith("_white")
      ? BJJ_BELT_HEX["white"]
      : belt.endsWith("_black")
      ? BJJ_BELT_HEX["black"]
      : undefined;
    return (
      <BeltWrapper scale={scale}>
        <BeltBand color={beltColorToHex(belt)} scale={scale}>
          {stripeColor && (
            <RedBeltStripeContainer scale={scale}>
              {[...Array(2)].map((_, i) => (
                <RedBeltStripe key={i} color={stripeColor} scale={scale} />
              ))}
            </RedBeltStripeContainer>
          )}
        </BeltBand>
      </BeltWrapper>
    );
  }

  if (belt === "black") {
    const stripeCount = Math.max(
      0,
      Math.min(stripes, BELT_CONFIG.black.maxStripes)
    );
    const barColor = getRankBarColor("black")!;
    const stripeColor = BJJ_BELT_HEX["white"];
    const midline = getBeltMidlineStripe("black");

    return (
      <BeltWrapper scale={scale}>
        <BeltBand color={beltColorToHex("black")} scale={scale}>
          {midline && <OverlayStripe color={midline} scale={scale} />}
          <BlackBeltStripeContainer color={barColor} scale={scale}>
            {[...Array(stripeCount)].map((_, i) => (
              <BlackBeltStripe key={i} color={stripeColor} scale={scale} />
            ))}
          </BlackBeltStripeContainer>
        </BeltBand>
      </BeltWrapper>
    );
  }

  const stripeCount = Math.max(
    0,
    Math.min(stripes, BELT_CONFIG.default.maxStripes)
  );
  const barColor = getRankBarColor(belt)!;
  const midline = getBeltMidlineStripe(belt);

  return (
    <BeltWrapper scale={scale}>
      <BeltBand color={beltColorToHex(belt)} scale={scale}>
        {midline && <OverlayStripe color={midline} scale={scale} />}
        <StripeContainer color={barColor} scale={scale}>
          {[...Array(stripeCount)].map((_, i) => (
            <Stripe key={i} color={BJJ_BELT_HEX["white"]} scale={scale} />
          ))}
        </StripeContainer>
      </BeltBand>
    </BeltWrapper>
  );
};
