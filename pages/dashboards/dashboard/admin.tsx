import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  alpha,
  useTheme,
  styled,
} from '@mui/material';
import Head from 'next/head';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BugReportIcon from '@mui/icons-material/BugReport';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';

// Styled Components
const HeaderBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(4)};
  `
);

const WelcomeBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    gap: ${theme.spacing(2)};
  `
);

const StyledCard = styled(Card)(
  ({ theme }) => `
    background: ${
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.8)
        : theme.palette.background.paper
    };
    border-radius: ${theme.spacing(2)};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0 4px 20px ${alpha(theme.palette.common.black, 0.5)}`
        : `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`
    };
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? `0 8px 30px ${alpha(theme.palette.common.black, 0.6)}`
          : `0 8px 30px ${alpha(theme.palette.common.black, 0.12)}`
      };
    }
  `
);

const RiskCard = styled(Card)(
  ({ theme }) => `
    background: ${
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.8)
        : theme.palette.background.paper
    };
    border-radius: ${theme.spacing(2)};
    padding: ${theme.spacing(2)};
    text-align: center;
    position: relative;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  `
);

const IconWrapper = styled(Box)(
  ({ theme, bgcolor }) => `
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${bgcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};
    
    & .MuiSvgIcon-root {
      color: white;
      font-size: 28px;
    }
  `
);

const RiskPercentage = styled(Typography)(
  ({ theme }) => `
    font-size: 32px;
    font-weight: 700;
    color: ${theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary};
    margin-bottom: ${theme.spacing(0.5)};
  `
);

const RiskLabel = styled(Typography)(
  ({ theme }) => `
    font-size: 13px;
    color: ${theme.palette.text.secondary};
    font-weight: 500;
  `
);

const ScoreCard = styled(Card)(
  ({ theme }) => `
    background: ${
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.8)
        : theme.palette.background.paper
    };
    border-radius: ${theme.spacing(2)};
    padding: ${theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  `
);

function DashboardAdmin() {
  const title = 'Admin Dashboard';
  const theme = useTheme();

  // Mock data for threat summary chart
  // const threatData = [
  //   { month: 'Jan', threats: 280 },
  //   { month: 'Feb', threats: 320 },
  //   { month: 'Mar', threats: 380 },
  //   { month: 'Apr', threats: 420 },
  //   { month: 'May', threats: 480 },
  //   { month: 'Jun', threats: 540 },
  //   { month: 'Jul', threats: 600 },
  //   { month: 'Aug', threats: 680 },
  //   { month: 'Sep', threats: 720 },
  //   { month: 'Oct', threats: 580 },
  //   { month: 'Nov', threats: 420 },
  //   { month: 'Dec', threats: 280 }
  // ];

  // Mock data for virus pie chart
  const virusData = [
    { name: 'ILOVEYOU', value: 15, color: '#A855F7' },
    { name: 'Melissa', value: 20, color: '#EC4899' },
    { name: 'MyDoom', value: 45, color: '#06B6D4' },
    { name: 'Sasser', value: 20, color: '#3B82F6' }
  ];

  // Mock data for threat details
  const threatDetails = [
    {
      date: '12-05-2024',
      deviceId: 'crazyfish228',
      virus: 'Code Red',
      filePath: 'C:\\Users\\opened...',
      fileType: 'Jpeg'
    },
    {
      date: '11-05-2024',
      deviceId: 'angryswan732',
      virus: 'Stuxnet',
      filePath: '\\\\192.168.10.5\\...',
      fileType: 'Zip'
    },
    {
      date: '10-05-2024',
      deviceId: 'happybird441',
      virus: 'Conficker',
      filePath: 'D:\\Downloads\\...',
      fileType: 'Exe'
    }
  ];

  // Mock data for device threats
  const deviceThreats = [
    { id: 'crazyfish228', progress: 75 },
    { id: 'angryswan732', progress: 45 },
    { id: 'happybird441', progress: 90 }
  ];

  const riskItems = [
    { icon: BugReportIcon, value: '132%', label: 'Total Threats', color: '#EC4899' },
    { icon: VideoLibraryIcon, value: '16%', label: 'Video File Risk', color: '#A855F7' },
    { icon: ImageIcon, value: '43%', label: 'Image File Risk', color: '#EC4899' },
    { icon: DescriptionIcon, value: '7%', label: 'Docs File Risk', color: '#3B82F6' },
    { icon: FolderIcon, value: '66%', label: 'Folder File Risk', color: '#06B6D4' }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <HeaderBox>
          <WelcomeBox>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: theme.palette.grey[700]
              }}
            >
              KM
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                Welcome! Kathryn Murphy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Security is a process, not a product.
              </Typography>
            </Box>
          </WelcomeBox>
        </HeaderBox>

        {/* Current Risk Section */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Current Risk
            </Typography>
            <FormControl size="small">
              <Select defaultValue="daily" sx={{ minWidth: 120 }}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={3}>
            {/* Risk Cards */}
            {riskItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <RiskCard>
                  <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <IconWrapper bgcolor={item.color}>
                    <item.icon />
                  </IconWrapper>
                  <RiskPercentage>{item.value}</RiskPercentage>
                  <RiskLabel>{item.label}</RiskLabel>
                </RiskCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Threat Summary */}
          <Grid item xs={12} lg={8}>
            <StyledCard>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    Threat Summary
                  </Typography>
                  <FormControl size="small">
                    <Select defaultValue="yearly" sx={{ minWidth: 120 }}>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={threatData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 8
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="threats"
                      stroke="#A855F7"
                      strokeWidth={3}
                      dot={{ fill: '#A855F7', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer> */}
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Risk Score & Threats by Virus */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Risk Score */}
              <Grid item xs={12}>
                <ScoreCard>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Risk Score
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      {/* <ResponsiveContainer width={180} height={180}>
                        <PieChart>
                          <Pie
                            data={[{ value: 741 }, { value: 259 }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            <Cell fill="#F97316" />
                            <Cell fill={alpha(theme.palette.text.primary, 0.1)} />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer> */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center'
                        }}
                      >
                        <Typography variant="h3" fontWeight={700}>
                          741
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: '#F97316',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontWeight: 600
                          }}
                        >
                          High
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 3 }}>
                      <Typography variant="caption" color="text.secondary">
                        0
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        1000
                      </Typography>
                    </Box>
                  </Box>
                </ScoreCard>
              </Grid>

              {/* Threats by Virus */}
              <Grid item xs={12}>
                <StyledCard>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Typography variant="h6" fontWeight={700}>
                        Threats By Virus
                      </Typography>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* <ResponsiveContainer width={120} height={120}>
                        <PieChart>
                          <Pie
                            data={virusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            dataKey="value"
                          >
                            {virusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer> */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                          65%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          {virusData.map((virus, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: virus.color
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {virus.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Threat Details */}
          <Grid item xs={12} lg={8}>
            <StyledCard>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    Threat Details
                  </Typography>
                  <FormControl size="small">
                    <Select defaultValue="daily" sx={{ minWidth: 120 }}>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 2,
                      mb: 2,
                      minWidth: 600
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Date
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Device ID
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Virus name
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      File Path
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      File Type
                    </Typography>
                  </Box>
                  {threatDetails.map((threat, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 2,
                        py: 1.5,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        minWidth: 600
                      }}
                    >
                      <Typography variant="body2">{threat.date}</Typography>
                      <Typography variant="body2">{threat.deviceId}</Typography>
                      <Typography variant="body2">{threat.virus}</Typography>
                      <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {threat.filePath}
                      </Typography>
                      <Typography variant="body2">{threat.fileType}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Threat by Device */}
          <Grid item xs={12} lg={4}>
            <StyledCard>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    Threat by device
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                {deviceThreats.map((device, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: theme.palette.grey[700]
                        }}
                      >
                        🖥️
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Device ID
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {device.id}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          border: `3px solid ${device.progress > 70 ? '#F97316' : '#06B6D4'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="caption" fontWeight={700}>
                          {device.progress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DashboardAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardAdmin;