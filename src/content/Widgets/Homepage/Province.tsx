import LoadingPage from '@/layouts/PageLayout/Loading';
import { HttpClient } from '@/services/http-client';
import appColor from '@/theme/appColor';
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function ProvincePage() {
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [datasourceVideo, setDatasourceVideo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getPlace = async () => {
    setLoading(true);
    const res = await http.get(`AnonymousPlace?pageNumber=${1}&pageSize=${12}`);
    setDatasource(res);
    setLoading(false);
  };

  const getVideo = async () => {
    const res = await http.get(`AnonymoussPreview`);
    setDatasourceVideo(res);
  };

  useEffect(() => {
    getPlace();
    getVideo();
  }, []);

  return (
    <>
      <Box sx={{ py: 5, px: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {datasourceVideo?.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: '50%',
                p: 2,
                alignItems: 'center'
              }}
            >
              <video
                controls
                autoPlay
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
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
            </Box>
          ))}
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {datasource?.slice(0, 12)?.map((place, index) => {
            if (unique.has(place?.category)) return null;
            unique.add(place?.category);
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <Box
                    position="relative"
                    sx={{
                      '&:hover .favorite-icon': { opacity: 1 },
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '10px'
                    }}
                  >
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{
                        position: 'absolute',
                        top: 30,
                        left: 30,
                        fontSize: 20,
                        color: appColor.white
                      }}
                    >
                      {place.category}
                    </Typography>

                    <CardMedia
                      onClick={() => router.push(`/view/place/${place.id}`)}
                      component="img"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      image={
                        place.rooms?.length &&
                        place.rooms.some((room) => room.images?.length)
                          ? place.rooms
                              .flatMap((room) => room.images)
                              .flatMap((imageObj) => imageObj.images)
                              .slice(-1)[0]
                          : '/static/none_image.png'
                      }
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {loading && <LoadingPage />}
      </Box>
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

export default ProvincePage;
