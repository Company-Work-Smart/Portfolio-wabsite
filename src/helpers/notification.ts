import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useCallback, useContext } from 'react';

export const useNotification = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  const sendNotification = (title: string, message: string, path: string) => {
    const today = new Date().toISOString().split('T')[0];
    const lastAlertDate = localStorage.getItem('lastExpireAlert');
    if (lastAlertDate === today) return;

    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: message,
        icon: '/static/logoApp.png'
      });
      notification.onclick = () => {
        window.open(`${window.location.origin}/${path}`, '_blank');
      };
      localStorage.setItem('lastExpireAlert', today);
    }
  };

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          showSnackbar({
            type: 'success',
            message: 'Notification permission granted.'
          });
        } else {
          showSnackbar({
            type: 'warning',
            message: 'Notification permission denied.'
          });
        }
      });
    }
  }, []);

  return { requestNotificationPermission, sendNotification };
};
