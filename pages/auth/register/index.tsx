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
import { AppKey } from '@/constant/key';
import { TextWidget } from '@/components/typographys';

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

const RegisterCard = styled(Card)(
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

function RegisterPage() {
  const { showSnackbar } = useContext(SnackbarContext);
  const theme = useTheme();
  const httpClient = new HttpClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    tel: '',
    email: '',
    password: ''
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await httpClient.post('AnonymousAuth/Register', formData);
      if (typeof response === 'string') {
        showSnackbar({ type: 'error', message: response });
        return;
      }
      if (response.accessToken) {
        localStorage.setItem(AppKey.userId, response.userId);
        localStorage.setItem(AppKey.accessToken, response.accessToken);
        localStorage.setItem(AppKey.role, response.role);
        localStorage.setItem(AppKey.username, response.username);
        showSnackbar({ type: 'success', message: 'Successfully registered!' });
        const role = `${response.role[0].toLowerCase()}${response.role.substring(1)}`;
        router.push(role === 'user' ? '/' : `/dashboards/dashboard/${role}`);
      } else {
        showSnackbar({ type: 'error', message: 'Invalid registration response' });
      }
    } catch {
      showSnackbar({ type: 'error', message: 'An error occurred during registration' });
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <PageWrapper>
      <RegisterCard>
        <Box textAlign="center" mb={4}>
          <TextWidget bold size={22}>
            Sign Up
          </TextWidget>
        </Box>
        <form onSubmit={submitForm}>
          <Box display="flex" gap={2} mb={3}>
            <Box flex={1}>
              <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>
                Username
              </TextWidget>
              <TextField
                fullWidth
                required
                placeholder="Enter username"
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
            <Box flex={1}>
              <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>
                Phone Number
              </TextWidget>
              <TextField
                fullWidth
                required
                placeholder="+855 102938475"
                name="tel"
                onChange={handleInput}
                inputProps={{ pattern: '^[0-9]{8,9}$', maxLength: 11 }}
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
          </Box>
          <Box mb={3}>
            <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Email Address
            </TextWidget>
            <TextField
              fullWidth
              required
              placeholder="abc@xyz.com"
              name="email"
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
            <TextWidget sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Password
            </TextWidget>
            <TextField
              fullWidth
              required
              type="password"
              placeholder="Enter password"
              name="password"
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <FormControlLabel
              control={<Checkbox sx={{ color: theme.palette.text.secondary }} />}
              label={
                <TextWidget sx={{ color: theme.palette.text.secondary }}>
                  Remember me
                </TextWidget>
              }
            />
            <TextWidget sx={{ color: theme.palette.text.secondary, cursor: 'pointer' }}>
              Forgot password?
            </TextWidget>
          </Box>
          <GradientButton type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              'Sign Up'
            )}
          </GradientButton>
          <Box textAlign="center" mt={4} my={4}>
            <TextWidget sx={{ mb: 2 }}>or sign up with</TextWidget>
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
              Already have an account?{' '}
              <TextWidget
                bold
                size={15}
                sx={{
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  display: 'inline',
                  '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() => router.push('/auth/login')}
              >
                Sign in
              </TextWidget>
            </TextWidget>
          </Box>
        </form>
      </RegisterCard>
    </PageWrapper>
  );
}

export default RegisterPage;