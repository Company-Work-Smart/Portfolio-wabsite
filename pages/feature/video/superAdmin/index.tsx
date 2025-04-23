import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';

function VideoSuperAdminManagement() {
  const title = 'Video Management';
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getVideo = async () => {
    const res = await http.get(`SuperAdminPreview`);
    setDatasource(res.item);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`SuperAdminPreview/${id}`);
    setDatasource((prev) => prev.filter((video) => video.id !== id));
    await getVideo();
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader
                action={
                  <Box>
                    <Button href="superAdmin/0" variant="contained">
                      Post
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                {datasource?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '500px',
                      height: '500px',
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <ConfirmDialog
                      message="Are you sure to delete this item?"
                      onConfirm={() => onConfirm(item.id)}
                    >
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 30,
                          right: 30,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'red'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ConfirmDialog>
                    
                    <video
                      controls
                      autoPlay
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '90%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedVideo(item?.videos?.[0])}
                    >
                      <source
                        src={
                          item?.videos?.length
                            ? item.videos[0]
                            : '/static/none_image.png'
                        }
                        type="video/mp4"
                      />
                    </video>

                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: 'left',
                        fontSize: 13,
                        width: '100%',
                        mt: 1
                      }}
                    >
                      {item?.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Video Preview
          <IconButton
            aria-label="close"
            onClick={() => setSelectedVideo(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedVideo && (
            <video
              controls
              autoPlay
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedVideo(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

VideoSuperAdminManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default VideoSuperAdminManagement;
