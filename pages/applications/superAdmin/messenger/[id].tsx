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
  InputBase,
  CircularProgress
} from '@mui/material';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import SuperAdminSidebarLayoutChat from '@/content/Widgets/Messenger/SuperAdmin/SidebarLayoutChat';
import { datatimeMessenger } from '@/helpers/datetime';
import appColor from '@/theme/appColor';

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

function SuperAdminChatContent() {
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderId: '',
    receiverId: id,
    message: ''
  });

  const getUser = async () => {
    const res = await http.get(`SuperAdmin/${user?.id}`);
    setDatasourceUser(res);
  };

  const getItem = async (id: any) => {
    const res = await http.get(`UserChat/User/${id}`);
    setDatasource(res);
  };

  const getMessages = async () => {
    if (!user?.id || !id) return;
    const res = await http.get(
      `Messenger?senderId=${user.id}&receiverId=${id}`
    );

    setMessages(res);
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setLoading(true);

    try {
      if (editingMessageId) {
        await http.put(`Messenger/${editingMessageId}`, {
          message: formData.message
        });
        setEditingMessageId(null);
      } else if (id && id !== '0') {
        const res = await http.post(`Messenger`, formData);
        setMessages((prev) => [...prev, res]);
      }

      setFormData((prev) => ({
        ...prev,
        message: ''
      }));

      await getMessages();
    } finally {
      setLoading(false);
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
    const messageToEdit = messages.find((msg) => msg.id === selectedId);
    if (messageToEdit) {
      setFormData((prev) => ({
        ...prev,
        message: messageToEdit.message
      }));
      setEditingMessageId(selectedId);
    }
    handleMenuClose();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user?.id && id && id !== '0') {
      setFormData((prev) => ({
        ...prev,
        receiverId: id,
        senderId: user.id
      }));
    }
  }, [user?.id, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 1000);
    return () => clearInterval(interval);
  }, [user?.id, id, messages]);

  useEffect(() => {
    if (id && id !== '0') getItem(id);
  }, [id]);

  useEffect(() => {
    getUser();
  }, [user]);

  useEffect(() => {
    const id = localStorage.getItem(AppKey.userId);
    const username = localStorage.getItem(AppKey.username);
    if (id) {
      setUser({ id, username });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Messenger - Chat</title>
      </Head>

      <Box p={3} pb={10}>
        <DividerWrapper>Chat Messages</DividerWrapper>
        {messages?.map((message, index) => {
          const isSender = message.senderId === user?.id;
          return (
            <Box
              key={index}
              display="flex"
              alignItems="flex-start"
              justifyContent={isSender ? 'flex-end' : 'flex-start'}
              py={2}
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
                <Box
                  onClick={(event) => handleMenuOpen(event, message.id)}
                  sx={{ padding: '4px' }}
                >
                  <MoreVertIcon />
                </Box>
              )}

              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                ml={2}
                mr={2}
                sx={{
                  backgroundColor: isSender ? '#DCF8C6' : '#FFFFFF',
                  padding: '10px',
                  borderRadius: '10px',
                  maxWidth: '60%',
                  border: message.isPinned
                    ? `2px solid ${theme.palette.primary.main}`
                    : 'none'
                }}
              >
                <Typography variant="body1">{message.message}</Typography>
                <Typography fontSize={10} color={appColor.lightgray}>
                  {datatimeMessenger(message.createdAt)}
                </Typography>
              </Box>

              {isSender && (
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
              )}
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      {/* Input */}
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
            {editingMessageId && (
              <Typography color="secondary" mr={2}>
             Editing message...
              </Typography>
            )}
            <MessageInputWrapper
              value={formData.message}
              onChange={handleInput}
              autoFocus
              placeholder="Write your message..."
              fullWidth
            />
          </Box>
          <Box>
            <Tooltip title={editingMessageId ? 'Update' : 'Send'}>
              <IconButton type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : <SendTwoToneIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </form>
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditMessage}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
      </Menu>
    </>
  );
}

const SuperAdminChatLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <SuperAdminSidebarLayoutChat id={id}>
      {children}
    </SuperAdminSidebarLayoutChat>
  );
};

SuperAdminChatContent.getLayout = (page: React.ReactNode) => (
  <SuperAdminChatLayout>{page}</SuperAdminChatLayout>
);

export default SuperAdminChatContent;
