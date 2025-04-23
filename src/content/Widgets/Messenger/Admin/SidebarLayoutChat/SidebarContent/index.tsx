import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

import {
  Box,
  Drawer,
  styled,
  useTheme,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  ListItemButton,
  Tab,
  Tabs,
  ListItemAvatar,
  ListItemText,
  List
} from '@mui/material';

import { useRouter } from 'next/router';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';
import { UserBoxProps } from '@/constant/my-app';
import { Pagination } from '@/constant/gagination';
import appColor from '@/theme/appColor';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from '@/components/Label';

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
`
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

const SidebarContent = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const http = new HttpClient();
  const theme = useTheme();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [user, setUser] = useState<UserBoxProps>({});
  const [datasourceUser, setDatasourceUser] = useState<any>(null);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'archived', label: 'Archived' }
  ];

  const getUserChat = async (reset = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await http.get(
      `UserChat?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res && Array.isArray(res)) {
      setDatasource((prev) => (reset ? res : [...prev, ...res]));

      if (res.length < pageSize) {
        setHasMore(false);
      } else {
        setPageNumber((prev) => prev + 1);
      }
    }
    setLoading(false);
  };

  const getUser = async () => {
    const res = await http.get(`AdminAdmin/${user.userId}`);
    setDatasourceUser(res);
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username),
      role: localStorage.getItem(AppKey.role)
    });
  }, []);

  useEffect(() => {
    if (user?.userId) getUser();
  }, [user]);

  useEffect(() => {
    getUserChat(true);
    const interval = setInterval(() => {
      getUserChat(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          background: theme.colors.alpha.white[50],
          position: 'fixed',
          left: 0,
          top: 0,
          px: 2,
          py: 1
        }}
      >
        <Scrollbar>
          <Box display="flex" alignItems="flex-start" pt={1}>
            <CardMedia
              component="img"
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              onClick={() => router.push(`/applications/admin/profile`)}
              image={datasourceUser?.photo || '/static/user-modified.png'}
            />
            <Box
              sx={{
                ml: 1.5,
                flex: 1
              }}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/applications/admin/profile`)}
                >
                  <Typography variant="h5" color={appColor.textblack}>
                    {user.username?.toLocaleUpperCase()}
                  </Typography>

                  <Typography variant="subtitle1" color={appColor.textblack}>
                    {user.role}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    p: 1
                  }}
                  size="small"
                  color="primary"
                >
                  <SettingsTwoToneIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mt: 2,
              mb: 1
            }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search..."
          />

          <Typography
            sx={{
              mb: 1,
              mt: 2
            }}
            variant="h3"
          >
            Chats
          </Typography>

          <TabsContainerWrapper>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </TabsContainerWrapper>

          <Box mt={2}>
            {datasource
              ?.filter(
                (item) =>
                  !search.trim() ||
                  item.user.username
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
              )
              ?.map((user, index) => {
                return (
                  <List
                    disablePadding
                    component="div"
                    key={index}
                    onClick={() =>
                      router.push(
                        `/applications/admin/messenger/${user.user.id}`
                      )
                    }
                  >
                    <ListItemWrapper>
                      <ListItemAvatar>
                        <CardMedia
                          component="img"
                          sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '20px',
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                          image={user?.user?.photo || '/static/user-modified.png'}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          mr: 1
                        }}
                        primaryTypographyProps={{
                          color: 'textPrimary',
                          variant: 'h5',
                          noWrap: true
                        }}
                        secondaryTypographyProps={{
                          color: 'textSecondary',
                          noWrap: true
                        }}
                        primary={user?.user?.username}
                        secondary={user?.messenger?.message}
                      />
                      <Label color="primary">
                        <b>2</b>
                      </Label>
                    </ListItemWrapper>
                  </List>
                );
              })}
          </Box>
        </Scrollbar>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper py={1} px={2}>
          <Scrollbar>
            <Box display="flex" alignItems="flex-start" pt={1}>
              <CardMedia
                component="img"
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => router.push(`/applications/admin/profile`)}
                image={datasourceUser?.photo || '/static/user-modified.png'}
              />
              <Box
                sx={{
                  ml: 1.5,
                  flex: 1
                }}
              >
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/applications/admin/profile`)}
                  >
                    <Typography variant="h5" color={appColor.textblack}>
                      {user.username?.toLocaleUpperCase()}
                    </Typography>

                    <Typography variant="subtitle1" color={appColor.textblack}>
                      {user.role}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      p: 1
                    }}
                    size="small"
                    color="primary"
                  >
                    <SettingsTwoToneIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mt: 2,
                mb: 1
              }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
              placeholder="Search..."
            />

            <Typography
              sx={{
                mb: 1,
                mt: 2
              }}
              variant="h3"
            >
              Chats
            </Typography>

            <TabsContainerWrapper>
              <Tabs
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </TabsContainerWrapper>

            <Box mt={2}>
              {datasource
                ?.filter(
                  (item) =>
                    !search.trim() ||
                    item.user.username
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((user, index) => {
                  return (
                    <List
                      disablePadding
                      component="div"
                      key={index}
                      onClick={() =>
                        router.push(
                          `/applications/admin/messenger/${user.user.id}`
                        )
                      }
                    >
                      <ListItemWrapper>
                        <ListItemAvatar>
                          <CardMedia
                            component="img"
                            sx={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '20px',
                              objectFit: 'cover',
                              cursor: 'pointer'
                            }}
                            image={
                              user?.user?.photo || '/static/user-modified.png'
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{
                            mr: 1
                          }}
                          primaryTypographyProps={{
                            color: 'textPrimary',
                            variant: 'h5',
                            noWrap: true
                          }}
                          secondaryTypographyProps={{
                            color: 'textSecondary',
                            noWrap: true
                          }}
                          primary={user?.user?.username}
                          secondary={user.messenger?.message}
                        />
                        <Label color="primary">
                          <b>2</b>
                        </Label>
                      </ListItemWrapper>
                    </List>
                  );
                })}
            </Box>
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
};

export default SidebarContent;
