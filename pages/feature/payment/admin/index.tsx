import { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  Divider,
  CircularProgress,
  Alert,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  IconButton
} from '@mui/material';
import { HttpClient } from '@/services/http-client';
import SidebarLayout from '@/layouts/SidebarLayout';
import { datetimeDisplay } from '@/helpers/datetime';
import { AppKey } from '@/constant/key';
import { UserBoxProps } from '@/constant/my-app';
import { useNotification } from '@/helpers/notification';
import ConfirmDialog from '@/components/ConfirmDialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useRouter } from 'next/router';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BillingManagement = () => {
  const title = 'Billing Page';
  const http = new HttpClient();
  const router = useRouter();
  const today = new Date();
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState<UserBoxProps>({});
  const [datasource, setDatasource] = useState<any[]>([]);
  const [datasourceUser, setDatasourceUser] = useState<any>({});
  const { sendNotification } = useNotification();

  const getPayment = async () => {
    const res = await http.get(`AdminPayment`);
    setDatasource(res);
  };
  const onConfirm = async (id: string) => {
    await http.delete(`AdminPayment/${id}`);
    await getPayment();
  };

  const getAdmin = async () => {
    const res = await http.get(`AdminAdmin/${user.userId}`);
    setDatasourceUser(res);
  };

  const handleTabChange = (_event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username),
      role: localStorage.getItem(AppKey.role)
    });
  }, []);

  useEffect(() => {
    getPayment();
  }, []);

  useEffect(() => {
    getAdmin();
  }, [user]);

  const checkExpireSoon = () => {
    if (!datasourceUser?.blockedAt) return;

    const now = new Date();
    const expiredAt = new Date(datasourceUser?.blockedAt);

    const warning = new Date(expiredAt);
    warning.setDate(warning.getDate() - 7);

    const diffInDays = now >= warning;
    if (diffInDays) {
      sendNotification(
        'Your plan will expire soon!',
        `Your subscription expires in ${diffInDays} day(s). Please renew.`,
        'feature/payment/admin/makepayment'
      );
    }
  };

  useEffect(() => {
    checkExpireSoon();
  }, [datasourceUser?.blockedAt]);

  const expiredAt = new Date(datasourceUser?.blockedAt);
  const isExpired = expiredAt <= today;
  const expireWarning = new Date(expiredAt);
  expireWarning.setDate(expireWarning.getDate() - 7);
  const ShowPayment = today >= expireWarning;

  return (
    <>
      <Grid item sx={{ p: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              {ShowPayment ? (
                <CardHeader
                  action={
                    <Box>
                      <Button
                        href="/feature/payment/admin/makepayment"
                        variant="contained"
                      >
                        Make a payment
                      </Button>
                    </Box>
                  }
                  title={title}
                />
              ) : (
                <CardHeader title={title} />
              )}

              <Divider />
              <Grid item>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      mb: 2
                    }}
                    centered
                  >
                    <Tab label="Overview" />
                    <Tab label="History" />
                    <Tab label="Settings" />
                  </Tabs>
                </Box>

                {ShowPayment && !isExpired && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Your plan will expire soon! Please renew to avoid service
                      disruption.{' '}
                      <a
                        onClick={() =>
                          router.push(`/feature/payment/admin/makepayment`)
                        }
                        style={{
                          cursor: 'pointer',
                          color: 'blue',
                          textDecoration: 'underline'
                        }}
                      >
                        click here
                      </a>
                    </Alert>
                  </Box>
                )}

                {isExpired && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Alert severity="error" sx={{ mt: 2 }}>
                      Your plan has expired and your account has been blocked.
                      Please renew your plan to restore access.{' '}
                      <a
                        onClick={() =>
                          router.push(`/feature/payment/admin/makepayment`)
                        }
                        style={{
                          cursor: 'pointer',
                          color: 'blue',
                          textDecoration: 'underline'
                        }}
                      >
                        click here
                      </a>
                    </Alert>
                  </Box>
                )}

                <TabPanel value={tab} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card sx={{ p: 3 }}>
                        <CardHeader title="Estimated Due" />
                        {!datasource ? (
                          <CircularProgress />
                        ) : (
                          <>
                            <Typography variant="h2" color="primary">
                              ${datasource[0]?.amount}
                            </Typography>
                            <Typography color="textSecondary" sx={{ mb: 2 }}>
                              This is an estimate of the amount you owe based on
                              your current month-to-date usage after credits &
                              prepayments.
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  Credits applied
                                </Typography>
                                <Typography variant="body1">$0.00</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  Prepayments
                                </Typography>
                                <Typography variant="body1">$0.00</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  Total usage
                                </Typography>
                                <Typography variant="body1">$0.00</Typography>
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      <Card sx={{ p: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                          These charges are factored into your account balance.
                        </Typography>

                        <Alert severity="info" sx={{ mt: 2 }}>
                          No costs to display for this billing period. When you
                          use services, the associated costs will appear here
                          the following day.
                        </Alert>

                        <Typography variant="body2" sx={{ mt: 2 }}>
                          View past invoices in your{' '}
                          <a
                            onClick={() => setTab(1)}
                            style={{
                              cursor: 'pointer',
                              color: 'blue',
                              textDecoration: 'underline'
                            }}
                          >
                            Billing History
                          </a>
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={tab} index={1}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Billing History
                  </Typography>

                  <TableContainer
                    sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  >
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f9fafb' }}>
                        <TableRow>
                          <TableCell>Plan</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {datasource.map((item, index) => (
                          <TableRow key={index} hover>
                            <TableCell>
                              {item.amount === '12.00' && (
                                <Typography>Starter Plan</Typography>
                              )}
                              {item.amount === '100.00' && (
                                <Typography>Pro Plan</Typography>
                              )}
                              {item.amount === '290.00' && (
                                <Typography>Advanced Plan</Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              {datetimeDisplay(item.createdAt)}
                            </TableCell>
                            <TableCell>
                              <a
                                href={item.descriptionLink}
                                style={{ color: '#0077cc', cursor: 'pointer' }}
                              >
                                Download invoices
                              </a>
                              {/* {item.descriptionLink ? (
                                <a
                                  href={item.descriptionLink}
                                  style={{ color: '#0077cc' }}
                                >
                                  {item.description}
                                </a>
                              ) : (
                                item.description
                              )} */}
                            </TableCell>
                            <TableCell>
                              {item.amount < 0 ? (
                                <Typography color="error">
                                  $ {item.amount}
                                </Typography>
                              ) : (
                                <Typography>$ {item.amount}</Typography>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              <ConfirmDialog
                                message="Are you sure to delete this item?"
                                onConfirm={() => onConfirm(item.id)}
                              >
                                <IconButton color="error" size="small">
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </ConfirmDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>

                <TabPanel value={tab} index={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={checkExpireSoon}
                  >
                    test
                  </Button>
                </TabPanel>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

BillingManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default BillingManagement;
