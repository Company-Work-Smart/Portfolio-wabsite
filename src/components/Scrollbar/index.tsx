import { FC, ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PropTypes from 'prop-types';

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

const Scrollbar: FC<ScrollbarProps> = ({ className, children, ...rest }) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      universal
      renderThumbVertical={() => (
        <Box
          sx={{
            width: 5,
            background: `${theme.palette.grey[400]}`,
            borderRadius: `${theme.shape.borderRadius}px`,
            transition: theme.transitions.create(['background']),
            '&:hover': {
              background: `${theme.palette.grey[600]}`
            }
          }}
        />
      )}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Scrollbar;
