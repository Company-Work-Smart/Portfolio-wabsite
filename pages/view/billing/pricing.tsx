import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Card
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const verifyPlace = (priceId: any) => {
    router.push(`/view/verify-place/${priceId}`);
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
        onClick={() => verifyPlace(priceId)}
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
  priceId: '68fe533d-33dd-43f5-be8a-17fcd68bd4b7_$12'
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
  priceId: '56d983fc-0ca4-46cf-8458-c40f10471e4f_$100'
};

export const AdvancedPlan = {
  icon: <WorkspacePremiumIcon />,
  title: 'Advanced Plan',
  price: '$290.00/ 3year',
  topup: 'Upgrade Now',
  description:
    'Best for teams and organizations who need advanced features and unlimited workspaces.',
  features: [
    'Unlimited workspaces',
    'Advanced collaboration',
    'Export to PNG, SVG, PDF, and AI',
    'Dedicated account manager'
  ],
  priceId: '32ae3cbd-fac8-4d23-ba97-d3f325ee559d_$290'
};
