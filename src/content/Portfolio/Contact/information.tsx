import { CardWidget } from '@/components/Card';
import { TextWidget } from '@/components/Text';
import { availability, contact, social } from '@/database/contact';
import { AccessTime } from '@mui/icons-material';
import { Box, CardContent, Divider, IconButton, styled, useTheme } from '@mui/material';

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: 8,
  width: 56,
  height: 56,
  transition: 'all 0.3s ease',
  '&:hover': { transform: 'translateY(-3px) scale(1.1)' }
}));

export const Information = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <CardWidget>
          <CardContent sx={{ p: 3 }}>
            <TextWidget
              bold
              size={20}
              sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}
            >
              Quick Contact
            </TextWidget>
            {contact.map((method, idx) => (
              <Box
                key={idx}
                component={method.action ? 'a' : 'div'}
                href={method.action}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  textDecoration: 'none',
                  background: theme.mode.background.default,
                  transition: 'all 0.3s ease',
                  '&:hover': { background: theme.mode.action.hover }
                }}
              >
                {method.icon}
                <Box>
                  <TextWidget bold>{method.title}</TextWidget>
                  <TextWidget>{method.value}</TextWidget>
                </Box>
              </Box>
            ))}
          </CardContent>
        </CardWidget>

        <CardWidget>
          <CardContent sx={{ p: 3 }}>
            <TextWidget bold size={20} sx={{ mb: 3, textAlign: 'center' }}>
              Follow Me
            </TextWidget>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {social.map((item, index) => (
                <IconButton
                  key={index}
                  onClick={() => window.open(item.url, '_blank')}
                  sx={{
                    color: theme.mode.text.default,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 20px 40px ${theme.mode.shadow[50]}`
                    }
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </CardContent>
        </CardWidget>

        <CardWidget>
          <CardContent sx={{ p: 3 }}>
            <TextWidget
              bold
              size={20}
              sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <AccessTime /> Availability
            </TextWidget>
            {availability.map((slot, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <TextWidget bold>{slot.day}</TextWidget>
                <TextWidget sx={{ color: theme.palette.text.secondary }}>{slot.time}</TextWidget>
                {idx < availability.length - 1 && (
                  <Divider sx={{ mt: 1, background: theme.palette.primary.main }} />
                )}
              </Box>
            ))}
          </CardContent>
        </CardWidget>
      </Box>
    </>
  );
};

export default Information;
