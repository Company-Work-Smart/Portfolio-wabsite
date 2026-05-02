import { Box, Container, Link, styled } from '@mui/material';
import { TextWidget } from '../Text';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <TextWidget variant="subtitle1">
            ® 2025 SENG VICHET. All rights reserved.
          </TextWidget>
        </Box>
        <TextWidget
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Crafted by{' '}
          <Link
            href={'https://jabjit.site'}
            target="_blank"
            rel="noopener noreferrer"
          >
            sengvichet.com
          </Link>
        </TextWidget>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
