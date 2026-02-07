import {
  Box,
  Card,
  CardHeader,
  useTheme
} from '@mui/material';

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '500px',
        overflow: 'auto',
        background: theme.palette.secondary.main
      }}
    >
      <CardHeader title="Recently reserved" />
      <Box px={2} py={2} display="flex" alignItems="flex-start"></Box>
    </Card>
  );
}

export default RecentActivity;
