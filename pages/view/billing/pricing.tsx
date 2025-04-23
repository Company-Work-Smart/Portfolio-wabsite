import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Card
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { MyApp } from '@/constant/my-app';
import { SnackbarContext } from '@/contexts/SnackbarContext';

interface PricingPlanProps {
  icon: JSX.Element;
  title: string;
  price: string;
  topup: string;
  description: string;
  features: string[];
  priceId: string;
}

const PricingPlanCard: React.FC<PricingPlanProps> = ({
  icon,
  title,
  price,
  topup,
  description,
  features,
  priceId
}) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: MyApp.tokenPaymen
    })
      .then((paddle) => setPaddle(paddle))
      .catch((e) =>
        showSnackbar({
          type: 'error',
          message: `Paddle Init Error: ${e}`
        })
      );
  }, [paddle, showSnackbar]);

  const handleCheckout = (priceId: string) => {
    if (!paddle)
      return showSnackbar({
        type: 'warning',
        message: `Paddle not initialized`
      });

    paddle.Checkout.open({
      items: [
        {
          priceId,
          quantity: 1
        }
      ],     
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: `http://localhost:3000/view/billing/${priceId}`
      }
    });
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        padding: '24px',
        width: '400px',
        margin: '0 auto',
        textAlign: 'left'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton>{icon}</IconButton>
        <Typography variant="h6" sx={{ marginLeft: '8px' }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {price}
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey', marginBottom: '24px' }}>
        per user/year
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '24px' }}>
        {description}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ marginBottom: '24px' }}
        onClick={() => handleCheckout(priceId)}
        disabled={!paddle}
      >
        {topup}
      </Button>

      {(features ?? []).map((feature, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox checked disabled />}
          label={<Typography>{feature}</Typography>}
          sx={{ display: 'flex', marginBottom: '8px' }}
        />
      ))}
    </Card>
  );
};

export default PricingPlanCard;

export const StarterPlan = {
  icon: <ThumbUpOutlinedIcon />,
  title: 'Starter Plan',
  price: '$12.00/month',
  topup: 'Get Started',
  description:
    'Ideal for individuals who want to get started with simple design tasks.',
  features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
  priceId: 'pri_01jpccwp6xqq7328yvx5qa7jks'
};

export const ProPlan = {
  icon: <StarIcon />,
  title: 'Pro Plan',
  price: '$100.00/year',
  topup: 'Upgrade Now',
  description:
    'Perfect for professionals who need additional design tools and more workspaces.',
  features: [
    '5 workspaces',
    'Full collaboration',
    'Export to PNG, SVG, and PDF',
    'Priority support'
  ],
  priceId: 'pri_01jpcaypxzr93d9gy0e4qq91yd'
};

export const AdvancedPlan = {
  icon: <WorkspacePremiumIcon />,
  title: 'Advanced Plan',
  price: '$270.00/ 3year',
  topup: 'Upgrade Now',
  description:
    'Best for teams and organizations who need advanced features and unlimited workspaces.',
  features: [
    'Unlimited workspaces',
    'Advanced collaboration',
    'Export to PNG, SVG, PDF, and AI',
    'Dedicated account manager'
  ],
  priceId: 'pri_01jpccyy5vwwv67brn713qq8pd'
};
