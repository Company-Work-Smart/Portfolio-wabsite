import { TextWidget } from '@/components/Text';
import { AppBar, Box, useTheme } from '@mui/material';

function FooterPage() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        background: theme.mode.background.header,
        boxShadow: 'none',
        top: 'auto',
        bottom: 0
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextWidget>Cambodia</TextWidget>
        </Box>

        <TextWidget
          sx={{
            fontWeight: 400,
            textAlign: 'center',
            flexGrow: 1
          }}
        >
          ® 2025 SENG VICHET. All rights reserved.
        </TextWidget>
      </Box>
    </AppBar>
  );
}

export default FooterPage;
