import { CardWidget } from '@/components/Card';
import {
  Box,
  CardHeader,
  useTheme
} from '@mui/material';

function RecentActivity() {
  const theme = useTheme();

  return (
    <CardWidget
      sx={{
        height: '500px',
        overflow: 'auto',
        background: theme.palette.secondary.main
      }}
    >
      <CardHeader title="Recently reserved" />
      <Box px={2} py={2} display="flex" alignItems="flex-start"></Box>
    </CardWidget>
  );
}

export default RecentActivity;
