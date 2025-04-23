import {
  Box,
  Card,
  CardHeader,
  Divider
} from '@mui/material';



function RecentActivity() {
 
  return (
    <Card sx={{ height: '500px', overflow: 'auto' }}>
      <CardHeader title="Recently reserved" />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <Divider />
        
      </Box>
      <Divider />
      
    </Card>
  );
}

export default RecentActivity;
