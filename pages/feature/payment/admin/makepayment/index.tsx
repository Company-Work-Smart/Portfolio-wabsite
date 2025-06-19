import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  Divider,
  CardHeader
} from '@mui/material';
import SidebarLayout from '@/layouts/SidebarLayout';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { MyApp } from '@/constant/my-app';

const priceMap: { [key: string]: string } = {
  '12.00': 'pri_01jpccwp6xqq7328yvx5qa7jks',
  '100.00': 'pri_01jpcaypxzr93d9gy0e4qq91yd',
  '290.00': 'pri_01jpccyy5vwwv67brn713qq8pd'
};

function MakePaymentPage() {
  const title = 'Make a payment';
  const { showSnackbar } = useContext(SnackbarContext);

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paddle, setPaddle] = useState<Paddle>();
  const [idPrice, setIdPrice] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    amount: ''
  });

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = () => {
    if (!paddle || !idPrice) {
      return showSnackbar({
        type: 'warning',
        message: `Paddle not initialized or no price selected.`
      });
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: idPrice,
          quantity: 1
        }
      ],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: `${window.location.origin}/feature/payment/admin/${idPrice}`
      }
    });
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: MyApp.tokenPayment
    })
      .then((paddle) => setPaddle(paddle))
      .catch((e) =>
        showSnackbar({
          type: 'error',
          message: `Paddle Init Error: ${e}`
        })
      );
  }, [paddle, showSnackbar]);

  useEffect(() => {
    const priceId = priceMap[formData.amount];
    if (priceId) {
      setIdPrice(priceId);
    }
  }, [formData.amount]);

  return (
    <Grid item sx={{ p: 3 }}>
      <Card>
        <CardHeader
          action={
            <Button href="/admin/0" variant="contained">
              Post
            </Button>
          }
          title={title}
        />
        <Divider />
        <Box sx={{ p: 3 }}>
          <FormControl sx={{ mb: 3, width: '50%' }}>
            <InputLabel>Select a plan</InputLabel>
            <Select
              name="amount"
              value={formData.amount}
              onChange={handleInput}
              label="Select a plan"
            >
              <MenuItem value="12.00">$12.00/month</MenuItem>
              <MenuItem value="100.00">$100.00/year</MenuItem>
              <MenuItem value="290.00">$290.00/3 years</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Payment Methods
          </Typography>

          <RadioGroup
            aria-label="payment-method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ mr: 1, color: '#1976d2' }} />
                  <Typography>Credit/Debit Card</Typography>
                </Box>
              }
            />

            <FormControl sx={{ mb: 3, width: '50%' }}>
              <InputLabel>Saved Card</InputLabel>
              <Select label="Select a plan">
                <MenuItem value="4242424242424242">
                  Visa ending in 4242
                </MenuItem>
                <MenuItem value="100.00">Visa ending in 6998</MenuItem>
                <MenuItem value="270.00">Visa ending in 6998</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              value="googlePay"
              control={<Radio />}
              label={<Typography>Google Pay</Typography>}
            />

            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label={<Typography>PayPal</Typography>}
            />
          </RadioGroup>

          <Box
            sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button variant="outlined">Add Payment Method</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={!formData.amount}
            >
              Submit Payment
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

MakePaymentPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default MakePaymentPage;
