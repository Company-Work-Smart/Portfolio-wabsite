import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { themeColors } from '@/theme/base';

interface ButtonWidgetProps extends ButtonProps {
  width?: string;
  height?: string;
  radius?: string;
  variant?: 'contained' | 'outlined' | 'text';
}

const ButtonWidget = styled(Button)<ButtonWidgetProps>(
  ({ theme, width, height, radius, variant }) => ({
    width,
    height,
    borderRadius: radius,
    textTransform: 'none',

    color: themeColors.white,
    background: variant === 'contained' ? theme.mode.button[100] : 'transparent',
    border: variant === 'outlined' ? `1px solid ${theme.mode.button[100]}` : 'none',
    ...(variant === 'contained' && {
      background: theme.mode.button[100],
      color: themeColors.white,
      '&:hover': {
        background: theme.mode.button[70]
      },
      '&.Mui-disabled': {
        background: theme.palette.action.hover,
        color: themeColors.white,
        opacity: 0.7
      }
    }),

    ...(variant === 'outlined' && {
      border: `1px solid ${theme.mode.button[100]}`,
      color: theme.mode.button[100],
      '&:hover': {
        border: `1px solid ${theme.mode.button[70]}`,
        color: theme.mode.button[70]
      },
      '&.Mui-disabled': {
        border: `1px solid ${theme.palette.action.hover}`,
        color: theme.palette.action.hover,
        opacity: 0.7
      }
    }),

    ...(variant === 'text' && {
      background: 'transparent',
      color: theme.mode.button[100],
      '&:hover': {
        color: theme.mode.button[70]
      },
      '&.Mui-disabled': {
        color: theme.palette.action.hover,
        opacity: 0.7
      }
    })
  })
);

export default function ButtonPage() {
  return <></>;
}

export { ButtonWidget };
