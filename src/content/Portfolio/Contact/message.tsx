import { ButtonWidget } from '@/components/Button';
import { CardWidget } from '@/components/Card';
import { Send } from '@mui/icons-material';
import { TextWidget } from '@/components/Text';
import { TextFieldWidget } from '@/components/TextField';
import { CardContent, Grid } from '@mui/material';
import { useState } from 'react';

export const SendMessage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <CardWidget>
        <CardContent sx={{ p: 4 }}>
          <TextWidget bold size={20} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            Send Message
          </TextWidget>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {['name', 'email', 'subject'].map((field) => (
                <Grid item xs={12} key={field}>
                  <TextFieldWidget
                    fullWidth
                    required
                    label={
                      field === 'name'
                        ? 'Full Name'
                        : field === 'email'
                        ? 'Email Address'
                        : 'Subject'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleInput}
                    type={field === 'email' ? 'email' : 'text'}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextFieldWidget
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleInput}
                  required
                  placeholder="Tell me about your project, timeline, and how I can help you..."
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <ButtonWidget variant="contained" type="submit" startIcon={<Send />}>
                  Send Message
                </ButtonWidget>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </CardWidget>
    </>
  );
};

export default SendMessage;
