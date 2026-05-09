import {
  Box,
  Button,
  Card,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  styled,
  CircularProgress,
  useTheme
} from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { TextWidget } from '@/components/Text';
import { MyApp } from '@/constant/my-app';

const PageWrapper = styled(Box)(
  ({ theme }) => `
    min-height: 100vh;
    background: ${theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(4)};
  `
);

const LoginCard = styled(Card)(
  ({ theme }) => `
    width: 100%;
    max-width: 420px;
    background: ${theme.palette.background.default};
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    box-shadow: 0 20px 60px ${theme.palette.text.disabled};
    padding: ${theme.spacing(5)};
  `
);

const GradientButton = styled(Button)(
  ({ theme }) => `
    background: ${theme.palette.text.primary};
    color: ${theme.palette.background.default};
    padding: ${theme.spacing(1.6)} ${theme.spacing(4)};
    border-radius: 14px;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    transition: all 0.3s ease;
    &:hover {
      background: ${theme.palette.text.secondary};
      transform: translateY(-2px);
    }
  `
);

const SocialButton = styled(IconButton)(
  ({ theme }) => `
    background: #fff;
    color: #000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    margin: 0 ${theme.spacing(1)};
    width: 44px;
    height: 44px;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-3px);
      background: #f2f2f2;
    }
  `
);

function LoginPage() {
  const { showSnackbar } = useContext(SnackbarContext);
  const theme = useTheme();
  const httpClient = new HttpClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await httpClient.get(`anonymous/login`);
      const foundUser = response.find(
        (u: any) => u.username === formData.username && u.password === formData.password
      );
      if (typeof response === 'string') {
        showSnackbar({ type: 'error', message: response });
        setLoading(false);
        return;
      }

      if (foundUser.accessToken) {
        localStorage.setItem(MyApp.UserInfo().userId, foundUser.userId);
        localStorage.setItem(MyApp.UserInfo().accessToken, foundUser.accessToken);
        localStorage.setItem(MyApp.UserInfo().role, foundUser.role);
        localStorage.setItem(MyApp.UserInfo().username, foundUser.username);

        showSnackbar({ type: 'success', message: 'Successfully logged in!' });
        const role = `${foundUser.role[0].toLowerCase()}${foundUser.role.substring(1)}`;
        if (role === 'user') router.push(`/`);
        else router.push(`/dashboards/dashboard/${role}`);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Invalid login response from server'
        });
        setLoading(false);
      }
    } catch {
      showSnackbar({
        type: 'error',
        message: 'An error occurred during login'
      });
      setLoading(false);
    }
  };

  const handleInput = (e: any) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <PageWrapper>
      <LoginCard>
        <Box textAlign="center" mb={4}>
          <TextWidget bold size={20}>
            Sign In
          </TextWidget>
        </Box>

        <form onSubmit={submitForm}>
          <Box mb={3}>
            <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>Username</TextWidget>
            <TextField
              fullWidth
              required
              placeholder="username"
              name="username"
              onChange={handleInput}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '& fieldset': {
                    borderColor: theme.palette.text.primary
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px'
                  }
                }
              }}
            />
          </Box>

          <Box mb={3}>
            <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>Password</TextWidget>
            <TextField
              fullWidth
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleInput}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  '& fieldset': {
                    borderColor: theme.palette.text.primary
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px'
                  }
                }
              }}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <FormControlLabel
              control={<Checkbox sx={{ color: theme.palette.text.secondary }} />}
              label={
                <TextWidget sx={{ color: theme.palette.text.secondary }}>Remember me</TextWidget>
              }
            />
            <TextWidget
              variant="body2"
              sx={{ color: theme.palette.text.secondary, cursor: 'pointer' }}
            >
              Forgot password?
            </TextWidget>
          </Box>

          <GradientButton type="submit" size="large" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: theme.palette.background.default, mr: 1 }} />
            ) : (
              'Log in'
            )}
          </GradientButton>

          <Box textAlign="center" mt={4} my={4}>
            <TextWidget>or connect with</TextWidget>
            <Box mt={2}>
              <SocialButton>
                <FacebookIcon />
              </SocialButton>
              <SocialButton>
                <GoogleIcon />
              </SocialButton>
            </Box>
          </Box>

          <Box textAlign="center">
            <TextWidget sx={{ display: 'inline' }}>
              Don't have an account?{' '}
              <TextWidget
                bold
                size={15}
                sx={{
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  display: 'inline',
                  '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() => router.push('/auth/register')}
              >
                Sign up
              </TextWidget>
            </TextWidget>
          </Box>
        </form>
      </LoginCard>
    </PageWrapper>
  );
}

export default LoginPage;
