import React from 'react';
import { OutlinedInput, InputAdornment, FormControl, styled, useTheme } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { ButtonWidget } from '../Button';

const OutlinedInputWrapper = styled(OutlinedInput)<{
  radius?: string;
  height?: string;
}>(({ theme, radius, height }) => ({
  backgroundColor: theme.mode.background.default,
  userSelect: 'none',
  borderRadius: radius || '10px',
  height: height
}));

interface SearchBarProps {
  placeholder?: string;
  width?: string;
  height?: string;
  radius?: string;
  onSearch?: (query: string) => void;
}

const SearchWidget: React.FC<SearchBarProps> = ({
  placeholder = 'Search here...',
  width,
  height,
  radius,
  onSearch
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      } else {
        setSearchQuery('');
      }
    }
  };

  return (
    <FormControl sx={{ width: width }}>
      <OutlinedInputWrapper
        height={height}
        radius={radius}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        type="text"
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <SearchTwoToneIcon sx={{ color: theme.mode.text.disabled }} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" style={{ display: 'flex' }}>
            {searchQuery && (
              <ButtonWidget variant="outlined" height="30px" onClick={() => setSearchQuery('')}>
                Clear
              </ButtonWidget>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchWidget;
