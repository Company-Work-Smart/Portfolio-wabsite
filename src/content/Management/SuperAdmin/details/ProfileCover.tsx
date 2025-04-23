import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { UserBoxProps } from '@/constant/my-app';

const Input = styled('input')({ display: 'none' });

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
  position: relative;
  overflow: visible;
  display: inline-block;
  margin-top: -${theme.spacing(9)};
  margin-left: ${theme.spacing(2)};

  .MuiAvatar-root {
    width: ${theme.spacing(16)};
    height: ${theme.spacing(16)};
  }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
  position: absolute;
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  bottom: -${theme.spacing(1)};
  right: -${theme.spacing(1)};

  .MuiIconButton-root {
    border-radius: 100%;
    background: ${theme.colors.primary.main};
    color: ${theme.palette.primary.contrastText};
    box-shadow: ${theme.colors.shadows.primary};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    padding: 0;

    &:hover {
      background: ${theme.colors.primary.dark};
    }
  }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
  position: relative;

  .MuiCardMedia-root {
    height: ${theme.spacing(26)};
  }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
  position: absolute;
  right: ${theme.spacing(2)};
  bottom: ${theme.spacing(2)};
`
);

const ProfileCover = () => {

  const http = new HttpClient();
  const router = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);
  const [user, setUser] = useState<UserBoxProps>({});
  const [datasource, setDatasource] = useState<any>(null);
  const [formData, setFormData] = useState({
    photo: null as File | null,
    coverPhoto: null as File | null
  });

  const getUser = async () => {
    const res = await http.get(`SuperAdmin/${user.userId}`);
    setDatasource(res);
  };

  const submitForm = async (isAvatar: boolean) => {
    const file = isAvatar ? formData.photo : formData.coverPhoto;

    if (!file) {
      showSnackbar({
        type: 'error',
        message: 'Image file is required.'
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('Photo', file);

    try {
      await http.putuploadFile(
        `SuperAdmin/update-profile/${user?.userId}`,
        formPayload
      );
      const res = await http.get(`SuperAdmin/${user.userId}`);
      setDatasource(res);
      showSnackbar({
        type: 'success',
        message: 'File uploaded successfully!'
      });
      setFormData({ photo: null, coverPhoto: null });
    } catch (error) {
      showSnackbar({
        type: 'error',
        message: 'File upload failed. Please try again.'
      });
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isAvatar: boolean
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isAvatar) {
        setFormData({ ...formData, photo: file });
      } else {
        setFormData({ ...formData, coverPhoto: file });
      }
    }
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username),
      role: localStorage.getItem(AppKey.role)
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={() => router.push('/dashboards/dashboard/superAdmin')}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {user?.username?.toUpperCase()}
          </Typography>
          <Typography variant="subtitle2">
            This is a profile page. Easy to modify, always blazing fast
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia
          image={
            formData.coverPhoto
              ? URL.createObjectURL(formData.coverPhoto)
              : datasource?.photo || '/static/none_image.png'
          }
        />
        <CardCoverAction>
          <Input
            accept="image/*"
            id="change-cover"
            type="file"
            onChange={(e) => handleFileChange(e, false)}
            style={{ display: 'none' }}
          />
          <label htmlFor="change-cover">
            <Button variant="outlined" component="span">
              <UploadTwoToneIcon />
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <CardMedia
          component="img"
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '10px',
            aspectRatio: '1',
            objectFit: 'cover'
          }}
          image={datasource?.photo || '/static/none_image.png'}
        />

        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => handleFileChange(e, true)}
          />
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => submitForm(false)}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default ProfileCover;
