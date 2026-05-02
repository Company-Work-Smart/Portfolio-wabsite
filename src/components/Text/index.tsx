import { styled, Typography, TypographyProps } from '@mui/material';
interface TextWidgetProps extends TypographyProps {
  bold?: boolean;
  size?: number;
}

const StyledText = styled(Typography)<TextWidgetProps>(
  ({ theme, bold, size }) => ({
    fontSize: size
      ? theme.typography.pxToRem(size)
      : theme.typography.pxToRem(13),
    fontFamily: 'Inter, sans-serif',
    fontWeight: bold ? 'bold' : 'normal',
    color: theme.mode.text.default,
    userSelect: 'none'
  })
);
const StyledH1 = styled(Typography)<TextWidgetProps>(
  ({ theme, bold, size }) => ({
    fontSize: size
      ? theme.typography.pxToRem(size)
      : theme.typography.pxToRem(30),
    fontFamily: 'Inter, sans-serif',
    fontWeight: bold ? 'bold' : 700,
    color: theme.mode.text.default,
    userSelect: 'none'
  })
);
const StyledH2 = styled(Typography)<TextWidgetProps>(
  ({ theme, bold, size }) => ({
    fontSize: size
      ? theme.typography.pxToRem(size)
      : theme.typography.pxToRem(17),
    fontFamily: 'Inter, sans-serif',
    fontWeight: bold ? 'bold' : 500,
    color: theme.mode.text.default,
    userSelect: 'none'
  })
);

const TextWidget = (props: TextWidgetProps) => {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
};

const TextWidgetH1 = (props: TextWidgetProps) => {
  const { children, ...rest } = props;
  return <StyledH1 {...rest}>{children}</StyledH1>;
};

const TextWidgetH2 = (props: TextWidgetProps) => {
  const { children, ...rest } = props;
  return <StyledH2 {...rest}>{children}</StyledH2>;
};

export { TextWidget, TextWidgetH1, TextWidgetH2 };
