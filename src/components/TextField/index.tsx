import { styled, TextField } from '@mui/material';

interface TextFieldsProps {
  width?: string;
  height?: string;
  radius?: string;
}

export const TextFieldWidget = styled(TextField)<TextFieldsProps>(
  ({ width, height, radius, theme }) => ({
    width: width,
    height: height,
    borderRadius: radius || '10px',

    '& .MuiOutlinedInput-root': {
      background: theme.mode.background.default,
      '& fieldset': { borderColor: theme.mode.text.default },
      '&:hover fieldset': { borderColor: theme.mode.background.default },
      '&.Mui-focused fieldset': {
        borderColor: theme.mode.background.default,
        borderWidth: '2px'
      },

      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.mode.border[70]
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[400]
      }
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.text.disabled
    }
  })
);
