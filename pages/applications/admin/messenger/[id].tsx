import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Box,
  Typography,
  styled,
  Divider,
  CardMedia,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  useTheme,
  InputBase
} from '@mui/material';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import AdminSidebarLayoutChat from '@/content/Widgets/Messenger/Admin/SidebarLayoutChat';
import { datatimeMessenger } from '@/helpers/datetime';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
    .MuiDivider-wrapper {
      border-radius: ${theme.general.borderRadiusSm};
      text-transform: none;
      background: ${theme.palette.background.default};
      font-size: ${theme.typography.pxToRem(13)};
      color: ${theme.colors.alpha.black[50]};
    }
`
);

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(15)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

function AdminChatContent() {
  const theme = useTheme();
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [datasource, setDatasource] = useState<any>(null);
  const [datasourceUser, setDatasourceUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedMessage] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const bottomRef = useRef(null);
  const [formData, setFormData] = useState({
    senderId: '',
    receiverId: id,
    message: ''
  });

  const getUser = async () => {
    const res = await http.get(`AdminAdmin/${user?.userId}`);
    setDatasourceUser(res);
  };

  const getItem = async (id: any) => {
    const res = await http.get(`UserChat/User/${id}`);
    console.log(res);
    setDatasource(res);
  };

  const getMessages = async () => {
    if (!user?.userId || !id) return;
    const res = await http.get(
      `Messenger?senderId=${user.userId}&receiverId=${id}`
    );
    setMessages(res);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (id && id !== '0' && formData.message.trim()) {
      await http.post(`Messenger`, formData);
      setFormData((prev) => ({
        ...prev,
        message: ''
      }));
      setTimeout(async () => {
        await getMessages();
        setTimeout(scrollToBottom, 200);
      }, 100);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      message: e.target.value
    }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async () => {
    if (selectedId) {
      await http.delete(`Messenger/${selectedId}`);
      setMessages(messages.filter((item) => item.id !== selectedId));
      handleMenuClose();
    }
  };

  const handleEditMessage = () => {
    handleMenuClose();
  };

  const handlePinMessage = () => {
    handleMenuClose();
  };

  useEffect(() => {
    if (user?.userId && id && id !== '0') {
      setFormData((prev) => ({
        ...prev,
        receiverId: id,
        senderId: user.userId
      }));
    }
  }, [user?.userId, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.userId && id) {
        getMessages();
      }
    }, 800);
    return () => clearInterval(interval);
  }, [user?.userId, id]);

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    const userId = localStorage.getItem(AppKey.userId);
    const username = localStorage.getItem(AppKey.username);
    if (userId) {
      setUser({ userId: userId, username: username });
    }
  }, []);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Messenger - Applications {id}</title>
      </Head>
      <Box p={3} pb={10}>
        <DividerWrapper>Chat Messages</DividerWrapper>
        {messages?.map((message, index) => {
          const isSender = message.senderId === user?.userId;
          return (
            <Box
              key={index}
              display="flex"
              alignItems="flex-start"
              justifyContent={isSender ? 'flex-end' : 'flex-start'}
              py={2}
              sx={{
                cursor: 'pointer'
              }}
            >
              {!isSender && (
                <CardMedia
                  component="img"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  image={datasource?.photo || '/static/user-modified.png'}
                />
              )}
              {isSender && (
                <>
                  <Box
                    onClick={(event) => handleMenuOpen(event, message.id)}
                    sx={{
                      fontSize: 18,
                      padding: '4px'
                    }}
                  >
                    <MoreVertIcon />
                  </Box>
                </>
              )}

              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                justifyContent="flex-start"
                ml={2}
                mr={2}
                sx={{
                  backgroundColor: isSender ? '#DCF8C6' : '#FFFFFF',
                  padding: '10px',
                  borderRadius: '10px',
                  maxWidth: '60%'
                }}
              >
                <Typography variant="body1">{message.message}</Typography>
                <Typography
                  variant="caption"
                  sx={{ pt: 1, display: 'flex', alignItems: 'center' }}
                >
                  <ScheduleTwoToneIcon sx={{ mr: 1 }} fontSize="small" />
                  {datatimeMessenger(message.createdAt)}
                </Typography>
              </Box>

              {isSender && (
                <>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    image={datasourceUser?.photo || '/static/user-modified.png'}
                  />
                </>
              )}
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>
      <Box
        sx={{
          background: theme.colors.alpha.white[50],
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: {
            xs: '100%',
            lg: `calc(100% - ${theme.sidebar.width})`
          },
          p: 2
        }}
      >
        <form
          onSubmit={submitForm}
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <Box flexGrow={1} display="flex" alignItems="center">
            <MessageInputWrapper
              value={formData.message}
              onChange={handleInput}
              autoFocus
              placeholder="Write your message here..."
              fullWidth
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Tooltip arrow placement="top" title="">
              <IconButton
                sx={{ fontSize: theme.typography.pxToRem(20) }}
                color="primary"
              >
                😀
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="top" title="">
              <IconButton
                onClick={submitForm}
                sx={{ fontSize: theme.typography.pxToRem(20) }}
                color="primary"
              >
                <SendTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </form>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditMessage}>Edit</MenuItem>
        <MenuItem onClick={handlePinMessage}>Pin</MenuItem>
        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
      </Menu>
    </>
  );
}

const AdminChatLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = router.query;

  return <AdminSidebarLayoutChat id={id}>{children}</AdminSidebarLayoutChat>;
};

AdminChatContent.getLayout = (page: React.ReactNode) => (
  <AdminChatLayout>{page}</AdminChatLayout>
);

export default AdminChatContent;
