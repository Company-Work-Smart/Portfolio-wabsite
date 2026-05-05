import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ChipsProps {
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  background?: string;
  color?: string;
  border?: string;
}

const ChipWidget = styled(Chip)<ChipsProps>(
  ({ theme, margin, padding, fontSize, fontWeight, background, color, border }) => ({
    margin: margin || '4px',
    padding: padding || '8px',
    fontSize: fontSize || '14px',
    fontWeight: fontWeight || 500,
    background: background || theme.mode.background.default,
    color: color || theme.mode.text.default,
    border: border || `2px solid ${theme.mode.border[30]}`
  })
);

export default function CardPage() {
  return <></>;
}

export { ChipWidget };
