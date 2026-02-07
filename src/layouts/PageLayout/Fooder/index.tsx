import { AppBar, Box, useTheme } from '@mui/material';
import { TextWidget } from '@/components/typographys';

function FooterPage() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.text.primary,
        boxShadow: 'none',
        top: 'auto',
        bottom: 0
      }}
    >
      <Box
        sx={{
          background: theme.palette.text.primary,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/static/cambodia.png"
            alt="Cambodia Flag"
            style={{ width: 24, height: 'auto' }}
          />
          <TextWidget
            variant="body2"
            sx={{ fontWeight: 500, color: theme.palette.background.default }}
          >
            Cambodia
          </TextWidget>
        </Box>

        <TextWidget
          variant="body2"
          sx={{
            fontWeight: 400,
            color: theme.palette.background.default,
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
