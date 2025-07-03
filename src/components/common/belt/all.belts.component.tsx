import { BeltColor, BeltIcon } from "./belt.component";

export const BJJ_BELT_HEX: BeltColor[] = [
  "white",

  "grey_white",
  "grey",
  "grey_black",

  "yellow_white",
  "yellow",
  "yellow_black",

  "orange_white",
  "orange",
  "orange_black",

  "green_white",
  "green",
  "green_black",

  "blue",
  "purple",
  "brown",
  "black",

  "red_black",
  "red_white",
  "red",
];

interface AllBeltsDisplayProps {
  scale?: number;
}

export const AllBeltsDisplay: React.FC<AllBeltsDisplayProps> = ({
  scale = 1,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {BJJ_BELT_HEX.map((belt) => (
        <BeltIcon key={belt} belt={belt} stripes={6} scale={scale} />
      ))}
    </div>
  );
};
