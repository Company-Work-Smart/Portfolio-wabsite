import {  useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';
import { SnackbarContext } from '@/contexts/SnackbarContext';

export default function PaymentSuccess() {
  const router = useRouter();
  const http = new HttpClient();
  const { id } = router.query;
  const { showSnackbar } = useContext(SnackbarContext);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    userId: '',
    amount: '',
    currency: '',
    transactionId: '',
    status: 'Completed'
  });

  const processPayment = async () => {
    if (!id) return;
    const paddle = await http.get(`UserPayment/paddle/price/${id}`);
    
    if (paddle?.data) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userId,
        amount: paddle.data.unit_price.amount,
        currency: paddle.data.unit_price.currency_code,
        transactionId: paddle.meta.request_id
      }));
    }
  };

  const postPayment = async () => {
    try {
      const response = await http.post(`UserPayment`, formData);
      if (typeof response === 'string') {
        showSnackbar({ type: 'error', message: response });
        return;
      }

      if (response.accessToken) {
        signOutUser();
        localStorage.setItem(AppKey.userId, response.userId);
        localStorage.setItem(AppKey.accessToken, response.accessToken);
        localStorage.setItem(AppKey.refreshToken, response.refreshToken);
        localStorage.setItem(AppKey.role, response.role);
        localStorage.setItem(AppKey.username, response.username);

        showSnackbar({ type: 'success', message: 'Successfully logged in!' });

        const role = `${response.role[0].toLowerCase()}${response.role.substring(
          1
        )}`;
        router.push(`/dashboards/dashboard/${role}`);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Invalid login response from server'
        });
      }
    } catch (error) {
      showSnackbar({
        type: 'error',
        message: 'An error occurred during login'
      });
    }
  };
  const signOutUser = () => {
    localStorage.removeItem(AppKey.userId);
    localStorage.removeItem(AppKey.username);
    localStorage.removeItem(AppKey.role);
    localStorage.removeItem(AppKey.accessToken);
    localStorage.removeItem(AppKey.refreshToken);
  };
  useEffect(() => {
    processPayment();
  }, [router.query]);

  useEffect(() => {
    postPayment();
  }, [formData]);

  useEffect(() => {
    setUserId(localStorage.getItem(AppKey.userId));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#28a745',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        flexDirection: 'column'
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Payment Successful! 🎉
      </h1>
      <p
        style={{
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '10px'
        }}
      >
        Your transaction was completed successfully. We're doing a little happy
        dance on your behalf!
      </p>
    </div>
  );
}
