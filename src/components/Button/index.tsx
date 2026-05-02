import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { themeColors } from "@/theme/base";

interface ButtonWidgetProps extends ButtonProps {
  width?: string;
  height?: string;
  radius?: string;
  variant?: "contained" | "outlined" | "text";
}

const ButtonWidget = styled(Button)<ButtonWidgetProps>(
  ({ theme, width, height, radius, variant }) => ({
    width,
    height,
    borderRadius: radius,
    textTransform: "none",

    color: themeColors.white,
    background: variant === "contained" ? themeColors.button : "transparent",
    border: variant === "outlined" ? `1px solid ${themeColors.button}` : "none",
    ...(variant === "contained" && {
      background: themeColors.button,
      color: themeColors.white,
      "&:hover": {
        background: themeColors.hover_button,
      },
      "&.Mui-disabled": {
        background: theme.palette.action.hover,
        color: themeColors.white,
        opacity: 0.7,
      },
    }),

    ...(variant === "outlined" && {
      border: `1px solid ${themeColors.button}`,
      color: themeColors.button,
      "&:hover": {
        border: `1px solid ${themeColors.hover_button}`,
        color: themeColors.hover_button,
      },
      "&.Mui-disabled": {
        border: `1px solid ${theme.palette.action.hover}`,
        color: theme.palette.action.hover,
        opacity: 0.7,
      },
    }),

    ...(variant === "text" && {
      background: "transparent",
      color: themeColors.button,
      "&:hover": {
        color: themeColors.hover_button,
      },
      "&.Mui-disabled": {
        color: theme.palette.action.hover,
        opacity: 0.7,
      },
    }),
  })
);

export default function ButtonPage() {
  return <></>;
}

export { ButtonWidget };