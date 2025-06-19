import { useContext, useEffect, useState } from 'react';
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
    const paddle = await http.get(`AdminPayment/paddle/price/${id}`);

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
    await http.post(`AdminPayment`, formData);
    showSnackbar({ type: 'success', message: 'Successfully logged in!' });
    router.push(`/feature/payment/admin`);
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
