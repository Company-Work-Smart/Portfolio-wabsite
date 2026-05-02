import * as React from 'react';
import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export type DialogVariant =
  | 'success'
  | 'warning'
  | 'info'
  | 'delete'
  | 'confirm';

interface AppDialogProps {
  variant: DialogVariant;
  message: string;
  title?: string;
  children: ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
}

const variantConfig: Record<
  DialogVariant,
  {
    color: string;
    icon: ReactNode;
    defaultTitle: string;
    confirmLabel: string;
    showCancel: boolean;
    cancelLabel?: string;
  }
> = {
  success: {
    color: '#2e7d32',
    icon: <CheckCircleIcon sx={{ fontSize: 26 }} />,
    defaultTitle: 'Success',
    confirmLabel: 'Done',
    showCancel: false
  },
  warning: {
    color: '#ed6c02',
    icon: <WarningAmberIcon sx={{ fontSize: 26 }} />,
    defaultTitle: 'Warning',
    confirmLabel: 'Proceed',
    showCancel: true,
    cancelLabel: 'Cancel'
  },
  info: {
    color: '#0288d1',
    icon: <InfoOutlinedIcon sx={{ fontSize: 26 }} />,
    defaultTitle: 'Information',
    confirmLabel: 'Got it',
    showCancel: false
  },
  delete: {
    color: '#d32f2f',
    icon: <DeleteOutlineIcon sx={{ fontSize: 26 }} />,
    defaultTitle: 'Delete',
    confirmLabel: 'Delete',
    showCancel: true,
    cancelLabel: 'Cancel'
  },
  confirm: {
    color: '#1976d2',
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 26 }} />,
    defaultTitle: 'Confirmation',
    confirmLabel: 'Confirm',
    showCancel: true,
    cancelLabel: 'Cancel'
  }
};

const DialogWidget: FC<AppDialogProps> = ({
  variant,
  message,
  title,
  children,
  onConfirm,
  onClose
}) => {
  const [open, setOpen] = React.useState(false);

  const config = variantConfig[variant];
  const resolvedTitle = title ?? config.defaultTitle;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  const handleConfirm = () => {
    setOpen(false);
    onConfirm?.();
  };

  return (
    <React.Fragment>
      <span onClick={handleClickOpen}>{children}</span>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="app-dialog-title"
        aria-describedby="app-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 380,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderTop: `4px solid ${config.color}`
          }
        }}
      >
        <DialogTitle
          id="app-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pt: 3,
            pb: 1,
            fontWeight: 700,
            fontSize: '1.1rem',
            color: config.color,
            '& .MuiSvgIcon-root': { color: config.color }
          }}
        >
          {config.icon}
          {resolvedTitle}
        </DialogTitle>

        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText
            id="app-dialog-description"
            sx={{ color: 'text.secondary' }}
          >
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: config.color,
              '&:hover': { filter: 'brightness(0.88)', bgcolor: config.color }
            }}
          >
            {config.confirmLabel}
          </Button>

          {config.showCancel && (
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: config.color,
                color: config.color,
                '&:hover': {
                  borderColor: config.color,
                  bgcolor: `${config.color}0a`
                }
              }}
            >
              {config.cancelLabel}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogWidget;
