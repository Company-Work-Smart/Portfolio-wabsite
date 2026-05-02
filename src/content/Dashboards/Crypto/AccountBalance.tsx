import {
  Button,
  Card,
  Box,
  Grid,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { TextWidget } from '@/components/Text';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.white[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.white[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const theme = useTheme();
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [totalItem, setTotalItem] = useState<number>(0);

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.white[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.white[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
    legend: {
      labels: {
        colors: theme.colors.alpha.white[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];
  const totalAmount = datasource?.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  const BalencePayment = async () => {
    const res = await http.get(`SuperAdminPayment`);
    setDatasource(res.item);
    setTotalItem(res.total);
  };

  useEffect(() => {
    BalencePayment();
    const interval = setInterval(() => {
      BalencePayment();
    }, 1000);
    return () => clearInterval(interval);
  }, [router.query.refresh]);

  return (
    <>
      <Card>
        <Grid spacing={0} container>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <TextWidget
                sx={{
                  pb: 3
                }}
                variant="h4"
              >
                Account Balance
              </TextWidget>
              <Box>
                <TextWidget variant="h1" gutterBottom>
                  ${totalAmount?.toFixed(2)}
                </TextWidget>
                <TextWidget
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                >
                  {totalItem} Balance
                </TextWidget>
                <Box
                  display="flex"
                  sx={{
                    py: 4
                  }}
                  alignItems="center"
                >
                  <AvatarSuccess
                    sx={{
                      mr: 2
                    }}
                    variant="rounded"
                  >
                    <TrendingUp fontSize="large" />
                  </AvatarSuccess>
                  <Box>
                    <TextWidget variant="h4">
                      + ${totalAmount?.toFixed(2)}
                    </TextWidget>
                    <TextWidget variant="subtitle2" noWrap>
                      this month
                    </TextWidget>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid sm item>
                  <Button fullWidth variant="outlined">
                    Send
                  </Button>
                </Grid>
                <Grid sm item>
                  <Button fullWidth variant="contained">
                    Receive
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            sx={{
              position: 'relative'
            }}
            display="flex"
            alignItems="center"
            item
            xs={12}
            md={6}
          >
            <Box
              component="span"
              sx={{
                display: { xs: 'none', md: 'inline-block' }
              }}
            >
              <Divider absolute orientation="vertical" />
            </Box>
            <Box py={4} pr={4} flex={1}>
              <Grid container spacing={0}>
                <Grid
                  xs={12}
                  sm={5}
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chart
                    height={250}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                  />
                </Grid>
                <Grid xs={12} sm={7} item display="flex" alignItems="center">
                  <List
                    disablePadding
                    sx={{
                      width: '100%'
                    }}
                  >
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="BTC"
                          src="/static/images/placeholders/logo/bitcoin.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="BTC"
                        primaryTypographyProps={{
                          variant: 'h5',
                          noWrap: true
                        }}
                        secondary="Bitcoin"
                      />
                      <Box>
                        <TextWidget align="right" variant="h4" noWrap>
                          20%
                        </TextWidget>
                        <TextWidget color="success">+2.54%</TextWidget>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="XRP"
                          src="/static/images/placeholders/logo/ripple.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="XRP"
                        primaryTypographyProps={{
                          variant: 'h5',
                          noWrap: true
                        }}
                        secondary="Ripple"
                      />
                      <Box>
                        <TextWidget align="right" variant="h4" noWrap>
                          10%
                        </TextWidget>
                        <TextWidget color="error">-1.22%</TextWidget>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="ADA"
                          src="/static/images/placeholders/logo/cardano.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="ADA"
                        primaryTypographyProps={{
                          variant: 'h5',
                          noWrap: true
                        }}
                        secondary="Cardano"
                      />
                      <Box>
                        <TextWidget align="right" variant="h4" noWrap>
                          40%
                        </TextWidget>
                        <TextWidget color="success">+10.50%</TextWidget>
                      </Box>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="ETH"
                          src="/static/images/placeholders/logo/ethereum.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="ETH"
                        primaryTypographyProps={{
                          variant: 'h5',
                          noWrap: true
                        }}
                        secondary="Ethereum"
                      />
                      <Box>
                        <TextWidget align="right" variant="h4" noWrap>
                          30%
                        </TextWidget>
                        <TextWidget color="error">-12.38%</TextWidget>
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default AccountBalance;
