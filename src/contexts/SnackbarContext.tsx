import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { Alert } from '@mui/material';

type SnackbarType = 'error' | 'info' | 'warning' | 'success';

interface SnackbarContextProps {
  message?: string;
  type: SnackbarType;
}

type SnackbarContextType = {
  snackbar: SnackbarContextProps | null;
  showSnackbar: (payload: SnackbarContextProps) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

type Props = {
  children: ReactNode;
};

export function SnackbarProvider({ children }: Props) {
  const [snackbar, setSnackbar] = useState<SnackbarContextProps | null>(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = (payload: SnackbarContextProps) => {
    setSnackbar(payload);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
    setTimeout(() => setSnackbar(null), 300);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, closeSnackbar }}>
      {children}

      {snackbar && (
        <Alert
          severity={snackbar.type}
          onClose={closeSnackbar}
          sx={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            boxShadow: 3,
            borderRadius: 2,
            minWidth: 280
          }}
        >
          {snackbar.message}
        </Alert>
      )}
    </SnackbarContext.Provider>
  );
}
