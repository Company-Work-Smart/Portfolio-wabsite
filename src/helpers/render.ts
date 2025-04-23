import { Button, OutlinedInput, styled } from '@mui/material';
import { useEffect, useState } from 'react';

export const PeopleRate = {
  number: 100,
  default: 1
};

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

interface UseManualLoadProps {
  onLoadMore: () => void;
}

export function useManualLoad({ onLoadMore }: UseManualLoadProps) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    onLoadMore();
  }, [pageNumber]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { pageNumber };
}


export const useGuestCount = () => {
  const [adult, setAdult] = useState('');
  const [children, setChildren] = useState('');
  const [date, setDate] = useState('');

  const increaseAdult = () => {
    setAdult((prev) => (prev === '' ? '1' : String(parseInt(prev) + 1)));
  };

  const decreaseAdult = () => {
    setAdult((prev) =>
      prev === '' || parseInt(prev) <= 1 ? '' : String(parseInt(prev) - 1)
    );
  };

  const increaseChildren = () => {
    setChildren((prev) => (prev === '' ? '1' : String(parseInt(prev) + 1)));
  };

  const decreaseChildren = () => {
    setChildren((prev) =>
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
    children,
    setChildren,
    date,
    setDate,
    increaseAdult,
    decreaseAdult,
    increaseChildren,
    decreaseChildren,
    dateChange,
  };
};

