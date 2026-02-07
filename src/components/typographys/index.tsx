import { styled, Typography, TypographyProps } from "@mui/material";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  `
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  `
);

interface TextWigetProps extends TypographyProps {
  bold?: boolean;
  size?: number;
}

const TextWidget = styled((props: TextWigetProps) => <Typography {...props} />)(
  ({ theme, bold, size }) => ({
    fontSize: size
      ? theme.typography.pxToRem(size)
      : theme.typography.pxToRem(13),
    fontFamily: "Roboto, sans-serif",
    fontWeight: bold ? "bold" : "normal",
    color: theme.palette.text.primary,
    userSelect: "none",
  })
);

export { TypographyH1, TypographyH2, TextWidget };
