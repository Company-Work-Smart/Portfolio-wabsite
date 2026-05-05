import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

interface AvatarsProps {
  width?: string;
  height?: string;
  radius?: string;
  shadow?: boolean;
  background?: string;
}

const AvatarWidget = styled(Avatar)<AvatarsProps>(
  ({ theme, width, height, radius, shadow, background }) => ({
    width: width,
    height: height,
    borderRadius: radius || '50%',
    background: background || theme.mode.avatar[0],
    boxShadow: shadow ? theme.colors.shadows.card : 'none'
  })
);

export default function AvatarPage() {
  return <></>;
}

export { AvatarWidget };
