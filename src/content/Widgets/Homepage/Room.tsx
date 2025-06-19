import { Pagination } from '@/constant/gagination';
import { calculateNights } from '@/helpers/calulate';
import { HttpClient } from '@/services/http-client';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import appColor from '@/theme/appColor';
import { PeopleRate, renderStars } from '../Favorite/rating';
import LoadingPage from '@/layouts/PageLayout/Loading';

function RoomPage() {
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getRooms = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await http.get(
      `AnonymousRoom?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setDatasource((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMore(false);
    else setPageNumber((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      {datasource && datasource.length > 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, sm: 5 },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 5 }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'left'
                }}
              >
                Explore Available Booking Options
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.8rem',
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'left'
                }}
              >
                Search Functionality: Users can explore different places or
                rooms based on specific filters like location, date, capacity,
                price range, and type (e.g., hotel, event venue).
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() => router.push(`/view/explore`)}
              sx={{
                marginTop: { xs: 2, sm: 0 },
                width: { xs: '100%', sm: 'auto' },
                textAlign: 'center'
              }}
            >
              View All
            </Button>
          </Box>
          <Box sx={{ py: 2, px: 3 }}>
            <Grid container justifyContent="center">
              {datasource?.slice(0, 30)?.map((room, index) => {
                if (unique.has(room?.place?.name)) return null;
                unique.add(room?.place?.name);
                return (
                  <Card
                    key={index}
                    sx={{
                      maxWidth: 280,
                      borderRadius: '10px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      m: 2,
                      transition:
                        'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={() =>
                        router.push(`/view/detail/room/${room.id}`)
                      }
                      image={
                        room?.images && room?.images?.length
                          ? room?.images.flatMap((item) => item.images)[0]
                          : '/static/none_image.png'
                      }
                      alt={room?.place?.name}
                    />

                    <Box
                      sx={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                      }}
                    >
                      <Box
                        onClick={() =>
                          router.push(`/view/detail/room/${room.id}`)
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            pr: 2,
                            fontSize: 13
                          }}
                        >
                          {room?.place?.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: 'block',
                            textAlign: 'left'
                          }}
                        >
                          {room?.place?.location?.address}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            cursor: 'pointer'
                          }}
                        >
                          {room?.rates && room?.rates.length > 0
                            ? renderStars(
                                room?.rates.reduce(
                                  (id, rate) => id + parseFloat(rate.rating),
                                  0
                                ) / PeopleRate.number
                              )
                            : renderStars(PeopleRate.default)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: 'right', mb: 1 }}
                        >
                          {room?.available?.checkIn &&
                          room?.available?.checkOut ? (
                            <Typography variant="body1">
                              {calculateNights(
                                room.available.checkIn,
                                room.available.checkOut
                              )}{' '}
                              {calculateNights(
                                room.available.checkIn,
                                room.available.checkOut
                              ) === 1
                                ? 'night'
                                : 'nights'}
                            </Typography>
                          ) : (
                            <Typography variant="body1">none</Typography>
                          )}
                        </Typography>
                        {room.price?.pricing ? (
                          <Box
                            sx={{
                              display: 'flex',
                              textAlign: 'end'
                            }}
                          >
                            {room.price.discount &&
                            room.price.discount !== '0' &&
                            room.price.discount !== 0 ? (
                              <>
                                <Typography
                                  sx={{
                                    textDecoration: 'line-through',
                                    color: appColor.textprice,
                                    fontSize: 12
                                  }}
                                >
                                  ${Number(room.price.pricing).toLocaleString()}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: appColor.textblack,
                                    fontSize: 12
                                  }}
                                >
                                  $
                                  {(
                                    Number(room.price.pricing) -
                                    Number(room.price.discount) -
                                    Number(room.price.taxes)
                                  ).toLocaleString()}
                                  {Number(room.price.taxes) > 0
                                    ? ' /night (incl. tax)'
                                    : ' /night'}
                                </Typography>
                              </>
                            ) : (
                              <Typography
                                sx={{
                                  color: appColor.textblack,
                                  fontSize: 12
                                }}
                              >
                                $
                                {(
                                  Number(room.price.pricing) -
                                  Number(room.price.taxes)
                                ).toLocaleString()}
                                {Number(room.price.taxes) > 0
                                  ? ' /night (incl. tax)'
                                  : ' /night'}
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography
                            sx={{
                              color: appColor.textgray,
                              fontSize: 12,
                              display: 'flex',
                              justifyContent: 'end'
                            }}
                          >
                            None
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Grid>
          </Box>
          {loading && <LoadingPage />}
          {!loading && hasMore && (
            <Button
              variant="contained"
              onClick={() => getRooms()}
              disabled={loading}
              style={{ marginTop: '16px' }}
            >
              Load More
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default RoomPage;
