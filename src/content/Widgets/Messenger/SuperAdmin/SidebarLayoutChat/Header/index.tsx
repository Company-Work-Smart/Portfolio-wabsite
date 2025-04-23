import { useState, SyntheticEvent, useEffect, useContext } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
  useTheme,
  CardMedia,
  alpha
} from '@mui/material';
import { formatDistance, subMinutes } from 'date-fns';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';
import { UserBoxProps } from '@/constant/my-app';
import { SidebarContext } from '@/contexts/SidebarContext';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        background-color: ${alpha(theme.header.background, 0.5)};
        right: 0;
        z-index: 6;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent({ id }) {
  const theme = useTheme();
  const http = new HttpClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [datasource, setDatasource] = useState<any>(null);
  const [datasourceUser, setDatasourceUser] = useState<any>(null);
  const [user, setUser] = useState<UserBoxProps>({});
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = useState<string | false>('section1');

  const handleChange =
    (section: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? section : false);
    };

  const getItem = async (id: any) => {
    const res = await http.get(`UserChat/User/${id}`);
    setDatasource(res);
  };

  const getUser = async () => {
    const res = await http.get(`SuperAdmin/${user?.userId}`);
    setDatasourceUser(res);
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username)
    });
  }, []);

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [user]);
  return (
    <>
      <HeaderWrapper display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box
            component="span"
            sx={{
              m: 1,
              display: { lg: 'none', xs: 'inline-block' }
            }}
          >
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary" onClick={toggleSidebar}>
                {!sidebarToggle ? (
                  <MenuTwoToneIcon fontSize="small" />
                ) : (
                  <CloseTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          {datasource?.photo?.length || datasource?.username?.length ? (
            <>
              <CardMedia
                component="img"
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  objectFit: 'cover'
                }}
                image={datasource?.photo || '/static/user-modified.png'}
              />
              <Box ml={1}>
                <Typography variant="h4">{datasource?.username}</Typography>
                <Typography variant="subtitle1">
                  {formatDistance(subMinutes(new Date(), 8), new Date(), {
                    addSuffix: true
                  })}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  objectFit: 'cover'
                }}
                image={datasourceUser?.photo || '/static/user-modified.png'}
              />
              <Box ml={1}>
                <Typography variant="h4">{user.username}</Typography>
                <Typography variant="subtitle1">
                  {formatDistance(subMinutes(new Date(), 8), new Date(), {
                    addSuffix: true
                  })}
                </Typography>
              </Box>
            </>
          )}
        </Box>
        {datasource?.photo?.length ? (
          <>
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' }
              }}
            >
              <Tooltip placement="bottom" title="Start a voice call">
                <IconButton color="primary">
                  <CallTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip placement="bottom" title="Conversation information">
                <IconButton color="primary" onClick={handleDrawerToggle}>
                  <InfoTwoToneIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          <></>
        )}
      </HeaderWrapper>

      <Drawer
        sx={{
          display: { xs: 'none', md: 'flex' }
        }}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={9}
      >
        <Box
          sx={{
            minWidth: 360
          }}
          p={2}
        >
          <Box
            sx={{
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                width: theme.spacing(12),
                height: theme.spacing(12)
              }}
              variant="rounded"
              alt="Zain Baptista"
              src="/static/images/avatars/1.jpg"
            />
            <Typography variant="h4">seng Baptista</Typography>
            <Typography variant="subtitle2">
              Active{' '}
              {formatDistance(subMinutes(new Date(), 7), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
          <Divider
            sx={{
              my: 3
            }}
          />

          <Accordion
            expanded={expanded === 'section1'}
            onChange={handleChange('section1')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Customize Chat</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <SearchTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Search in Conversation"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <ColorLensTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Change Theme Styling"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <EmojiEmotionsTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Choose Default Emoji"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'section2'}
            onChange={handleChange('section2')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Privacy & Support</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <NotificationsOffTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Turn off notifications"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <CancelTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Ignore all messages"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <BlockTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Block user"
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <WarningTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="Something's Wrong"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="Report the conversation and provide feedback"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'section3'}
            onChange={handleChange('section3')}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5">Shared Files</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component="nav">
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="HolidayPictures.zip"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="You opened in the past year"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="2021Screenshot.jpg"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="You edited this file yesterday"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    primary="PresentationDeck.pdf"
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary="Never opened"
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
}

export default TopBarContent;
