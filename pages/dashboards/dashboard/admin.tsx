'use client';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { TrendingUp, TrendingDown, Payments, ArrowForward, Tune } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import SidebarLayout from '@/layouts/SidebarLayout';
import { HttpClient } from '@/services/http-client';

interface Holding {
  ticker: string;
  company: string;
  price: string;
  change: number;
  value: string;
  rating: 'Buy' | 'Hold' | 'Sell';
}

interface ActivityItem {
  type: 'buy' | 'sell' | 'dividend';
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  positive: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const holdings: Holding[] = [
  {
    ticker: 'AAPL',
    company: 'Apple Inc.',
    price: '$189.42',
    change: 1.24,
    value: '$92,400',
    rating: 'Buy'
  },
  {
    ticker: 'MSFT',
    company: 'Microsoft',
    price: '$415.20',
    change: 0.87,
    value: '$83,040',
    rating: 'Buy'
  },
  {
    ticker: 'NVDA',
    company: 'NVIDIA Corp.',
    price: '$875.60',
    change: -2.1,
    value: '$70,048',
    rating: 'Hold'
  },
  {
    ticker: 'GOOGL',
    company: 'Alphabet Inc.',
    price: '$162.80',
    change: 0.45,
    value: '$65,120',
    rating: 'Buy'
  },
  {
    ticker: 'AMZN',
    company: 'Amazon.com',
    price: '$191.30',
    change: -0.33,
    value: '$57,390',
    rating: 'Hold'
  }
];

const activities: ActivityItem[] = [
  {
    type: 'buy',
    title: 'Bought AAPL',
    subtitle: '50 shares @ $187.80',
    amount: '+$9,390',
    time: '2h ago',
    positive: true
  },
  {
    type: 'dividend',
    title: 'Dividend — MSFT',
    subtitle: 'Q1 payout received',
    amount: '+$412',
    time: '1d ago',
    positive: true
  },
  {
    type: 'sell',
    title: 'Sold META',
    subtitle: '30 shares @ $512.40',
    amount: '$15,372',
    time: '3d ago',
    positive: false
  }
];

const allocations = [
  { label: 'Equities', value: 60, color: '#00e5a0', amount: '$508K' },
  { label: 'Fixed Income', value: 30, color: '#4d9fff', amount: '$254K' },
  { label: 'Alternative', value: 20, color: '#9b7fff', amount: '$169K' },
  { label: 'Cash', value: 8, color: '#f5a623', amount: '$67K' }
];

const risks = [
  { label: 'Volatility', value: 42, display: '14.2%', color: '#f5a623' },
  { label: 'Beta', value: 54, display: '1.08', color: '#4d9fff' },
  { label: 'Sharpe Ratio', value: 74, display: '1.84', color: '#00e5a0' },
  { label: 'Max Drawdown', value: 28, display: '-8.4%', color: '#ff5a5a' }
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  change,
  icon,
  accentColor,
  changePositive
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  accentColor: string;
  changePositive: boolean;
}) {
  return (
    <Card sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          bgcolor: accentColor,
          opacity: 0.8
        }}
      />
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            opacity: 0.15,
            color: accentColor,
            fontSize: 28
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.disabled',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'block',
            mb: 1
          }}
        >
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '-0.5px', mb: 0.75 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {changePositive ? (
            <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
          ) : (
            <TrendingDown sx={{ fontSize: 14, color: 'error.main' }} />
          )}
          <Typography
            variant="caption"
            sx={{ color: changePositive ? 'success.main' : 'error.main' }}
          >
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function RatingChip({ rating }: { rating: 'Buy' | 'Hold' | 'Sell' }) {
  const map = {
    Buy: { bg: alpha('#00e5a0', 0.1), color: '#00e5a0' },
    Hold: { bg: alpha('#4d9fff', 0.1), color: '#4d9fff' },
    Sell: { bg: alpha('#ff5a5a', 0.1), color: '#ff5a5a' }
  };
  return (
    <Chip
      label={rating}
      size="small"
      sx={{
        bgcolor: map[rating].bg,
        color: map[rating].color,
        fontSize: 10,
        height: 20,
        borderRadius: 1
      }}
    />
  );
}

function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const map = {
    buy: { bg: alpha('#00e5a0', 0.1), color: '#00e5a0', icon: <TrendingUp fontSize="small" /> },
    sell: { bg: alpha('#ff5a5a', 0.1), color: '#ff5a5a', icon: <TrendingDown fontSize="small" /> },
    dividend: { bg: alpha('#f5a623', 0.1), color: '#f5a623', icon: <Payments fontSize="small" /> }
  };
  const { bg, color, icon } = map[type];
  return (
    <Avatar sx={{ bgcolor: bg, color, width: 32, height: 32, borderRadius: 2 }}>{icon}</Avatar>
  );
}

function DashboardAdmin() {
  const http = new HttpClient();
  const [wallets, setWallets] = useState<any[]>([]);

  const getWallet = async () => {
    const res = await http.get('dashboard/wallet');
    setWallets(res);
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
          <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
            {wallets.map((wallet) => (
              <Grid item xs={12} sm={6} md={3} key={wallet.label}>
                <MetricCard
                  {...wallet}
                  accentColor={wallet.color}
                  changePositive={wallet.positive}
                />
              </Grid>
            ))}
          </Grid>

          {/* Performance Chart + Allocation */}
          <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent sx={{ p: 2.25 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                      Portfolio Performance
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: 11,
                        color: 'secondary.main',
                        cursor: 'pointer'
                      }}
                    >
                      vs S&P 500 <ArrowForward sx={{ fontSize: 11 }} />
                    </Box>
                  </Box>
                  <Box sx={{ position: 'relative', height: 160 }}>
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 580 160"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line
                        x1="0"
                        y1="120"
                        x2="580"
                        y2="120"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="0"
                        y1="80"
                        x2="580"
                        y2="80"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="0"
                        y1="40"
                        x2="580"
                        y2="40"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M0,130 C30,125 50,110 80,105 C110,100 130,90 160,80 C190,70 210,75 240,60 C270,45 290,55 320,40 C350,25 370,35 400,20 C430,8 450,15 480,10 C510,5 540,8 580,5"
                        stroke="#00e5a0"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M0,130 C30,125 50,110 80,105 C110,100 130,90 160,80 C190,70 210,75 240,60 C270,45 290,55 320,40 C350,25 370,35 400,20 C430,8 450,15 480,10 C510,5 540,8 580,5 L580,160 L0,160 Z"
                        fill="url(#g1)"
                      />
                      <path
                        d="M0,135 C30,132 50,122 80,118 C110,114 130,110 160,100 C190,90 210,95 240,85 C270,75 290,80 320,70 C350,60 370,65 400,55 C430,45 450,48 480,42 C510,36 540,38 580,35"
                        stroke="#4d9fff"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 3"
                        opacity={0.6}
                      />
                      <circle cx="480" cy="10" r="4" fill="#00e5a0" />
                      <circle cx="480" cy="10" r="8" fill="#00e5a0" opacity={0.15} />
                    </svg>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
                      <Typography key={m} sx={{ fontSize: 11, color: 'text.disabled' }}>
                        {m}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box sx={{ width: 20, height: 2, bgcolor: '#00e5a0', borderRadius: 1 }} />
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        Portfolio
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 0,
                          borderTop: '1.5px dashed #4d9fff',
                          opacity: 0.6
                        }}
                      />
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        S&P 500
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2.25 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                      Asset Allocation
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: 11,
                        color: 'secondary.main',
                        cursor: 'pointer'
                      }}
                    >
                      <Tune sx={{ fontSize: 13 }} /> Rebalance
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <svg width="90" height="90" viewBox="0 0 90 90">
                      <circle
                        cx="45"
                        cy="45"
                        r="36"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="36"
                        fill="none"
                        stroke="#00e5a0"
                        strokeWidth="12"
                        strokeDasharray="135 91"
                        strokeDashoffset="0"
                        transform="rotate(-90 45 45)"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="36"
                        fill="none"
                        stroke="#4d9fff"
                        strokeWidth="12"
                        strokeDasharray="68 158"
                        strokeDashoffset="-135"
                        transform="rotate(-90 45 45)"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="36"
                        fill="none"
                        stroke="#9b7fff"
                        strokeWidth="12"
                        strokeDasharray="45 181"
                        strokeDashoffset="-203"
                        transform="rotate(-90 45 45)"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="36"
                        fill="none"
                        stroke="#f5a623"
                        strokeWidth="12"
                        strokeDasharray="18 208"
                        strokeDashoffset="-248"
                        transform="rotate(-90 45 45)"
                      />
                    </svg>
                    <Typography sx={{ fontSize: 11, color: 'text.disabled', lineHeight: 1.8 }}>
                      Diversified
                      <br />
                      across
                      <br />4 classes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    {allocations.map((a) => (
                      <Box key={a.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: a.color,
                            flexShrink: 0
                          }}
                        />
                        <Typography sx={{ fontSize: 12, flex: 1 }}>{a.label}</Typography>
                        <Box sx={{ width: 80 }}>
                          <LinearProgress
                            variant="determinate"
                            value={a.value}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'rgba(255,255,255,0.06)',
                              '& .MuiLinearProgress-bar': { bgcolor: a.color, borderRadius: 2 }
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: 'text.secondary',
                            minWidth: 34,
                            textAlign: 'right'
                          }}
                        >
                          {a.value}%
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: 'text.disabled',
                            minWidth: 40,
                            textAlign: 'right'
                          }}
                        >
                          {a.amount}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Holdings + Activity/Risk */}
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent sx={{ p: 2.25 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, flex: 1 }}>
                      Top Holdings
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: 11,
                        color: 'secondary.main',
                        cursor: 'pointer'
                      }}
                    >
                      View all <ArrowForward sx={{ fontSize: 11 }} />
                    </Box>
                  </Box>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {holdings.map((h) => (
                        <TableRow
                          key={h.ticker}
                          sx={{ '&:hover td': { bgcolor: 'rgba(255,255,255,0.02)' } }}
                        >
                          <TableCell>
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                              {h.ticker}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                              {h.company}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{h.price}</TableCell>
                          <TableCell align="right">
                            <Typography
                              sx={{
                                fontSize: 12,
                                color: h.change >= 0 ? 'success.main' : 'error.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: 0.25
                              }}
                            >
                              {h.change >= 0 ? (
                                <TrendingUp sx={{ fontSize: 12 }} />
                              ) : (
                                <TrendingDown sx={{ fontSize: 12 }} />
                              )}
                              {h.change >= 0 ? '+' : ''}
                              {h.change}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{h.value}</TableCell>
                          <TableCell align="right">
                            <RatingChip rating={h.rating} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Grid container direction="column" spacing={1.5} sx={{ height: '100%' }}>
                {/* Risk */}
                <Grid item>
                  <Card>
                    <CardContent sx={{ p: 2.25 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, mb: 2 }}>
                        Risk Metrics
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {risks.map((r) => (
                          <Box key={r.label}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
                              <Typography sx={{ fontSize: 12 }}>{r.label}</Typography>
                              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                                {r.display}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={r.value}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: 'rgba(255,255,255,0.06)',
                                '& .MuiLinearProgress-bar': { bgcolor: r.color, borderRadius: 3 }
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Activity */}
                <Grid item>
                  <Card>
                    <CardContent sx={{ p: 2.25 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, mb: 1 }}>
                        Recent Activity
                      </Typography>
                      <List disablePadding>
                        {activities.map((a, i) => (
                          <Box key={i}>
                            <ListItem disableGutters sx={{ alignItems: 'flex-start', py: 1.25 }}>
                              <ListItemAvatar sx={{ minWidth: 44 }}>
                                <ActivityIcon type={a.type} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                    {a.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                                    {a.subtitle}
                                  </Typography>
                                }
                              />
                              <Box sx={{ textAlign: 'right', ml: 1 }}>
                                <Typography
                                  sx={{
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: a.positive ? 'success.main' : 'text.primary'
                                  }}
                                >
                                  {a.amount}
                                </Typography>
                                <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                                  {a.time}
                                </Typography>
                              </Box>
                            </ListItem>
                            {i < activities.length - 1 && (
                              <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />
                            )}
                          </Box>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

DashboardAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default DashboardAdmin;
