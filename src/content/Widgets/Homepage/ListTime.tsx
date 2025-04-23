import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import { Typography, Box, Grid, Card, CardMedia } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { calculateNights } from '@/helpers/calulate';
import { datetime2week } from '@/helpers/datetime';
import { PeopleRate, useManualLoad } from '@/helpers/render';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { renderStars } from '../Favorite/rating';
import appColor from '@/theme/appColor';

function ListTime() {
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState([]);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const { start, end } = datetime2week();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { pageNumber } = useManualLoad({
    onLoadMore: () => {
      getRooms();
    }
  });

  const getRooms = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `AnonymousRoom/available/now?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDatasource((prev) => [...prev, ...res]);
    setLoading(false);
  };

  const handleRoom = (id: string) => {
    router.push(`/view/detail/room/${id}`);
  };

  return (
    <>
      {datasource && datasource.length > 0 && (
        <>
          <Box sx={{ py: 2, px: { xs: 2, sm: 5 } }}>
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
                Deals for the weekend
              </Typography>

              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'left',
                  fontSize: '0.8rem'
                }}
              >
                Save on stays for {start} to {end}
              </Typography>
            </Box>
            <Grid container justifyContent="center">
              {datasource?.slice(0, 20)?.map((room, index) => {
                if (unique.has(room.place?.name)) return null;
                unique.add(room.place?.name);
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
                        color: 'black',
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
                      onClick={() => handleRoom(room.id)}
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
                        onClick={() => handleRoom(room.id)}
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
                            display: 'flex',
                            justifyContent: 'start'
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
                              alignItems: 'center',
                              justifyContent: 'end',
                              gap: 1
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
                                    Number(room.price.discount) +
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
                                  Number(room.price.pricing) +
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
        </>
      )}
    </>
  );
}

export default ListTime;
