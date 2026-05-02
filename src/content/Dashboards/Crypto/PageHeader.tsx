import { MyApp, UserBoxProps } from '@/constant/my-app';
import { HttpClient } from '@/services/http-client';
import { Typography, Grid, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

function PageHeader() {
  const theme = useTheme();
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any>(null);
  const [user, setUser] = useState<UserBoxProps>({});

  const getUser = async () => {
    const res = await http.get(`SuperAdmin/${user.userId}`);
    setDatasource(res);
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(MyApp.UserInfo().userId),
      username: localStorage.getItem(MyApp.UserInfo().username),
      role: localStorage.getItem(MyApp.UserInfo().role)
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <CardMedia
          component="img"
          sx={{
            width: theme.spacing(8),
            height: theme.spacing(8),
            borderRadius: '10px',
            aspectRatio: '1',
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          image={datasource?.photo || '/static/user-modified.png'}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom px={2}>
          Welcome, {user.username?.toUpperCase()}!
        </Typography>
        <Typography variant="subtitle2" px={2}>
          Today is a good day to start trading crypto assets!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
