import {
  Tooltip,
  IconButton,
  Box,
  styled,
  InputBase,
  useTheme
} from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(15)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

function BottomBarContent() {
  const theme = useTheme();
  return (
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
      <form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box flexGrow={1} display="flex" alignItems="center">
          <MessageInputWrapper
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
              sx={{ fontSize: theme.typography.pxToRem(20) }}
              color="primary"
            >
              <SendTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
}

export default BottomBarContent;
