import { Button, OutlinedInput, styled } from '@mui/material';
import { useState } from 'react';

export const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
  `
);

export const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
  `
);

export const useGuestCount = () => {
  const [adult, setAdult] = useState('');
  const [bed, setBed] = useState('');
  const [date, setDate] = useState('');

  const increaseAdult = () => {
    setAdult((prev) => (prev === '' ? '1' : String(parseInt(prev) + 1)));
  };

  const decreaseAdult = () => {
    setAdult((prev) =>
      prev === '' || parseInt(prev) <= 1 ? '' : String(parseInt(prev) - 1)
    );
  };

  const increaseBed = () => {
    setBed((prev) => (prev === '' ? '1' : String(parseInt(prev) + 1)));
  };

  const decreaseBed = () => {
    setBed((prev) =>
      prev === '' || parseInt(prev) <= 1 ? '' : String(parseInt(prev) - 1)
    );
  };

  const dateChange = (date) => {
    if (date) {
      setDate(date.format('YYYY/MM/DD'));
    } else {
      setDate('');
    }
  };

  return {
    adult,
    setAdult,
    bed,
    setBed,
    date,
    setDate,
    increaseAdult,
    decreaseAdult,
    increaseBed,
    decreaseBed,
    dateChange
  };
};
