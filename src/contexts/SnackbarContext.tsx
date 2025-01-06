import {createContext, ReactNode, useState} from 'react';

type snackbarType = 'error' | 'info' | 'warning' | 'success';

interface SnackbarContextProps {
  message?: string;
  type: snackbarType,
}

type SnackbarContext = {
  snackbar: SnackbarContextProps;
  showSnackbar: (payload: SnackbarContextProps) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContext>(
  {} as SnackbarContext
);

type Props = {
  children: ReactNode;
};

export function SnackbarProvider({children}: Props) {
  const [snackbar, setSnackbar] = useState<SnackbarContextProps>();
  const showSnackbar = (payload: SnackbarContextProps) => {
    setSnackbar(payload);
  };

  const closeSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider
      value={{snackbar, showSnackbar, closeSnackbar}}
    >
      {children}
    </SnackbarContext.Provider>
  );
}
