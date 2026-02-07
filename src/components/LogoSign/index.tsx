import { AppKey } from '@/constant/key';
import { UserBoxProps } from '@/constant/my-app';
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'src/components/Link';
import Image from 'next/image';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const [user, setUser] = useState<UserBoxProps>({});

  useEffect(() => {
    setUser({
      role: localStorage.getItem(AppKey.role)
    });
  }, []);
  return (
    <TooltipWrapper title="JabJit Booking" arrow>
      {user?.role?.toLowerCase() === 'admin' ? (
        <>
          <LogoWrapper href="/dashboards/dashboard/admin">
            <Image
              src="/static/LogoApp.png"
              alt="App Logo"
              width={100}
              height={100}
            />
          </LogoWrapper>
        </>
      ) : user?.role?.toLowerCase() === 'superadmin' ? (
        <>
          <LogoWrapper href="/dashboards/dashboard/superAdmin">
            <Image
              src="/static/LogoApp.png"
              alt="App Logo"
              width={100}
              height={100}
            />
          </LogoWrapper>
        </>
      ) : (
        <>
          <LogoWrapper href="/">
            <Image
              src="/static/LogoApp.png"
              alt="App Logo"
              width={100}
              height={100}
            />
          </LogoWrapper>
        </>
      )}
    </TooltipWrapper>
  );
}

export default Logo;
