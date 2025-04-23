import { Pagination } from '@/constant/gagination';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { HttpClient } from '@/services/http-client';
import appColor from '@/theme/appColor';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ProvincePage() {
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber] = useState<number>(0);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [loading, setLoading] = useState(false);

  const getPlace = async () => {
    setLoading(true);
    const res = await http.get(
      `AnonymousPlace?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res);
    setLoading(false);
  };

  const handleProvince = (id: string) => {
    router.push(`/view/place/${id}`);
  };

  useEffect(() => {
    getPlace();
  }, [pageNumber, pageSize, router.query.refresh]);

  return (
    <>
      <Box sx={{ py: 5, px: 5 }}>
        <Box
          sx={{
            p: 5,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            alignItems: 'center'
          }}
        >
          <Box>
            <iframe
              src="https://www.youtube.com/embed/gh8Hg-aj0oA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>

          <Box>
            <iframe
              src="https://www.youtube.com/embed/gh8Hg-aj0oA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
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
                      onClick={() => handleProvince(place.id)}
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
    </>
  );
}

export default ProvincePage;
