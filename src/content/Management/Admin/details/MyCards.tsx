import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControlLabel,
  Radio
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { HttpClient } from '@/services/http-client';

const cardTypes = ['Visa', 'MasterCard', 'Amex'];
const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled('img')(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.colors.alpha.white[100]};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.light};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.colors.error.light, 0.4)};
     }
`
);

const IconButtonEdit = styled(IconButton)(
  ({ theme }) => `
  color: ${theme.colors.info.main};
  padding: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(1)};

  &:hover {
    color: ${theme.colors.info.dark};
  }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.colors.alpha.black[5]};
     box-shadow: none;
`
);

function MyCards() {
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [expiryMonthError, setExpiryMonthError] = useState('');
  const [expiryYearError, setExpiryYearError] = useState('');
  const [expiryCardError, setExpiryCardError] = useState('');
  const [showFullNumberIds, setShowFullNumberIds] = useState<Set<string>>(new Set());
  const [selectedValue, setSelectedValue] = useState('');

  const handleChangeCard = (id) => {
    setSelectedValue(id);
  };

  const [form, setForm] = useState({
    cardHolderName: '',
    last4Digits: '',
    cardType: '',
    expiryMonth: '',
    expiryYear: '',
    currency: 'USD',
    status: 'Active',
    numberCard: ''
  });
  const getCard = async () => {
    const res = await http.get('AdminCardPayment');
    setDatasource(res);
  };

  const handleDelete = async (id: string) => {
    await http.delete(`AdminCardPayment/${id}`);
    await getCard();
  };
  const handleAdd = () => {
    setEditingCardId(null);
    setForm({
      cardHolderName: '',
      last4Digits: '',
      cardType: '',
      expiryMonth: '',
      expiryYear: '',
      currency: 'USD',
      status: 'Active',
      numberCard: ''
    });
    setExpiryMonthError('');
    setExpiryYearError('');
    setOpen(true);
  };

  const handleEdit = (card: any) => {
    setEditingCardId(card.id);
    setForm({
      cardHolderName: card.cardHolderName,
      last4Digits: card.last4Digits,
      cardType: card.cardType,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      currency: card.currency || 'USD',
      status: card.status || 'Active',
      numberCard: card.numberCard || ''
    });
    setExpiryMonthError('');
    setExpiryYearError('');
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditingCardId(null);
    setForm({
      cardHolderName: '',
      last4Digits: '',
      cardType: '',
      expiryMonth: '',
      expiryYear: '',
      currency: 'USD',
      status: 'Active',
      numberCard: ''
    });
    setExpiryMonthError('');
    setExpiryYearError('');
  };

  const toggleShowNumber = (id: string) => {
    setShowFullNumberIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = async () => {
    const monthNum = Number(form.expiryMonth);
    if (!/^\d{2}$/.test(form.expiryMonth) || monthNum < 1 || monthNum > 12) {
      setExpiryMonthError('Expiry month must be 2 digits between 01 and 12');
      return;
    } else {
      setExpiryMonthError('');
    }

    if (!/^\d{4}$/.test(form.expiryYear)) {
      setExpiryYearError('Expiry year must be exactly 4 digits');
      return;
    } else {
      setExpiryYearError('');
    }

    try {
      if (editingCardId) {
        await http.put(`AdminCardPayment/${editingCardId}`, form);
      } else {
        await http.post('AdminCardPayment', form);
      }
      handleDialogClose();
      await getCard();
    } catch (error) {
      console.error('Save card failed:', error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'last4Digits') {
      const formatted = formatCardNumberInput(value);
      setForm((prev) => ({ ...prev, [name]: formatted }));

      if (formatted.length < 19) {
        setExpiryCardError('Card number is too short');
      } else if (formatted.length > 20) {
        setExpiryCardError('Card number is too long');
      } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formatted)) {
        setExpiryCardError('Invalid card number format');
      } else {
        setExpiryCardError('');
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'expiryMonth') {
      const num = Number(value);
      if (!/^\d{1,2}$/.test(value) || num < 1 || num > 12) {
        setExpiryMonthError('Expiry month must be 01-12');
      } else if (value.length !== 2) {
        setExpiryMonthError('Month must be exactly 2 digits');
      } else {
        setExpiryMonthError('');
      }
    }

    if (name === 'expiryYear') {
      if (!/^\d{4}$/.test(value)) {
        setExpiryYearError('Expiry year must be exactly 4 digits');
      } else {
        setExpiryYearError('');
      }
    }
  };

  function formatCardNumberInput(value: string) {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(.{4})/g, '$1 ').trimEnd();
  }

  useEffect(() => {
    getCard();
  }, []);

  return (
    <>
      <Card>
        <CardHeader subheader={`${datasource.length} saved cards`} title="Cards" />
        <Divider />

        <Box p={3}>
          <Grid container spacing={3}>
            {datasource.map((item, index) => {
              const showFull = showFullNumberIds.has(item.id);
              const maskedNumber = `•••• ${
                item.last4Digits ? item.last4Digits.slice(-4) : item.last4Digits
              }`;

              return (
                <Grid item xs={12} sm={6} key={item.id || index}>
                  <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" flexGrow={1}>
                        {/* Card Logo */}
                        {item?.cardType === 'Visa' && (
                          <CardLogo src="/static/images/placeholders/logo/visa.png" alt="Visa" />
                        )}
                        {item?.cardType === 'MasterCard' && (
                          <CardLogo
                            src="/static/images/placeholders/logo/mastercard.png"
                            alt="MasterCard"
                          />
                        )}
                        {item?.cardType === 'Amex' && (
                          <CardLogo src="/static/images/placeholders/logo/amex.png" alt="Amex" />
                        )}

                        {/* Card Info */}
                        <Box ml={2}>
                          {item.cardHolderName && (
                            <Typography variant="subtitle1" fontWeight="medium">
                              {item.cardHolderName.toUpperCase()}
                            </Typography>
                          )}

                          <Typography
                            variant="h6"
                            fontWeight="normal"
                            sx={{ fontFamily: 'monospace' }}
                          >
                            {showFull ? item.last4Digits : maskedNumber}
                          </Typography>

                          <Typography variant="subtitle2">
                            Expires:{' '}
                            <Typography component="span" color="text.primary">
                              {item.expiryMonth}/{item.expiryYear}
                            </Typography>
                          </Typography>
                        </Box>

                        {/* Toggle visibility */}
                        <Tooltip arrow title={showFull ? 'Hide number' : 'Show full number'}>
                          <IconButton onClick={() => toggleShowNumber(item.id)} sx={{ ml: 2 }}>
                            {showFull ? (
                              <VisibilityOffIcon sx={{ fontSize: 20 }} />
                            ) : (
                              <VisibilityIcon sx={{ fontSize: 20 }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box pt={3} display="flex" alignItems="center" justifyContent="space-between">
                      <FormControlLabel
                        control={
                          <Radio
                            checked={selectedValue === item.id}
                            onChange={() => handleChangeCard(item.id)}
                            value={item.id}
                            color="primary"
                            name="primary-card"
                          />
                        }
                        label="Primary"
                      />
                      <Box display="flex">
                        <Tooltip arrow title="Edit this card">
                          <IconButtonEdit onClick={() => handleEdit(item)}>
                            <EditTwoToneIcon fontSize="small" />
                          </IconButtonEdit>
                        </Tooltip>

                        <Tooltip arrow title="Remove this card">
                          <IconButtonError onClick={() => handleDelete(item.id)}>
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButtonError>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardCc>
                </Grid>
              );
            })}

            <Grid item xs={12} sm={6}>
              <Tooltip arrow title="Click to add a new card">
                <CardAddAction onClick={handleAdd}>
                  <CardActionArea sx={{ px: 1 }}>
                    <CardContent>
                      <AvatarAddWrapper>
                        <AddTwoToneIcon fontSize="large" />
                      </AvatarAddWrapper>
                    </CardContent>
                  </CardActionArea>
                </CardAddAction>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            boxShadow: 6,
            backgroundColor: '#f9fafa'
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.25rem',
            pb: 0
          }}
        >
          {editingCardId ? 'Edit Card' : 'Add New Card'}
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Cardholder Name"
                name="cardHolderName"
                value={form.cardHolderName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Card Number"
                name="last4Digits"
                value={form.last4Digits}
                onChange={handleChange}
                fullWidth
                required
                placeholder="1234 5678 9012 3456"
                variant="outlined"
                helperText={expiryCardError || 'Enter card number'}
                error={!!expiryCardError}
                InputProps={{
                  sx: { borderRadius: 2, fontFamily: 'monospace' }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Card Type"
                name="cardType"
                select
                value={form.cardType}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              >
                {cardTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Month"
                name="expiryMonth"
                value={form.expiryMonth}
                onChange={handleChange}
                fullWidth
                placeholder="MM"
                required
                error={!!expiryMonthError}
                helperText={expiryMonthError}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Expiry Year"
                name="expiryYear"
                value={form.expiryYear}
                onChange={handleChange}
                fullWidth
                placeholder="YYYY"
                required
                error={!!expiryYearError}
                helperText={expiryYearError}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Currency"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ borderRadius: 2, boxShadow: 'none', textTransform: 'none' }}
          >
            {editingCardId ? 'Save Changes' : 'Add Card'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyCards;
