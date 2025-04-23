import {
  Typography,
  Button,
  Box,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';

import CloseIcon from '@mui/icons-material/Close';

function WatchListVideo({ id }) {
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getItem = async (id: any) => {
    const res = await http.get(`UserRoom/${id}`);
    setDatasource(res);
  };

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  return (
    <>
      <Box>
        <Box
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
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '90%',
              aspectRatio: '1',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '10px'
            }}
            src={
              datasource.place?.videos?.length
                ? datasource.place.videos[0]
                : '/static/none_image.png'
            }
            alt={datasource.place?.description || 'Video'}
            onClick={() => setSelectedVideo(datasource.place.videos[0])}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: 'left',
              fontSize: 13,
              width: '100%',
              mt: 1
            }}
          >
            {datasource.place?.description}
          </Typography>
        </Box>
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

export default WatchListVideo;
