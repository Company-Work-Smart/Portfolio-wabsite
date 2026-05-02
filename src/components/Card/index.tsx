import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

interface CardsProps {
  width?: string;
  height?: string;
  radius?: string;
  shadow?: boolean;
}

const CardWidget = styled(Card)<CardsProps>(
  ({ theme, width, height, radius, shadow }) => ({
    width: width,
    height: height,
    borderRadius: radius || "10px",
    boxShadow: shadow ? theme.colors.shadows.card : "none",
  }),
);

export default function CardPage() {
  return <></>;
}

export { CardWidget };