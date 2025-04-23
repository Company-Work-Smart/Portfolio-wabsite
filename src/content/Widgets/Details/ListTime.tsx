import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  IconButton
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { calculateNights } from '@/helpers/calulate';
import { datetime1week } from '@/helpers/datetime';
import { PeopleRate, useManualLoad } from '@/helpers/render';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { AppKey } from '@/constant/key';
import { toggleFavorite } from '../Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RatingDialog, { renderStars } from '../Favorite/rating';

function ListTime({ id }: { id: string | null }) {
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState<any>({});
  const [datasourceList, setDatasourceList] = useState([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumberR, setPageNumberR] = useState(1);
  const { start, end } = datetime1week();
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { pageNumber } = useManualLoad({
    onLoadMore: () => {
      getRooms();
      getFavorite();
    }
  });

  const getItem = async (id: string) => {
    const res = await http.get(`UserRoom/${id}`);
    setDatasource(res);
  };

  const getRooms = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `UserRoom/available/now?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDatasourceList((prev) => [...prev, ...res]);
    setLoading(false);
  };

  const getRate = async () => {
    if (!hasMore) return;
    const res = await http.get(
      `UserRate?pageNumber=${pageNumberR}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDataRate((prev) => [...prev, ...res]);
    setPageNumberR((prev) => prev + 1);
  };

  useEffect(() => {
    getRate();
    const interval = setInterval(() => {
      getRate();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRate = async (roomId: string, rateId: string) => {
    setRatingId(rateId);
    setRoomId(roomId);
  };

  const getFavorite = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `UserFavorite?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDataFavorite((prev) => [...prev, ...res]);
    setLoading(false);
  };

  const Favorite = async (roomId: string, favoriteId: string) => {
    const { updatedFavorites, wasAdded } = await toggleFavorite(
      roomId,
      favoriteId,
      isFavorite
    );
    if (updatedFavorites) {
      setIsFavorite(updatedFavorites);

      if (wasAdded) {
        await router.push(`/view/favorite?refresh=true`);
      }
    }
  };

  const handleViewRoom = (id: string) => {
    router.push(`/view/detail/room/${id}`);
  };

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(AppKey.isFavorite);
    if (savedFavorites) {
      setIsFavorite(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <>
      <Box sx={{ py: 2 }}>
        {datasourceList && datasourceList.length > 0 && (
          <Box sx={{ py: 2 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                display: 'flex',
                justifyContent: 'start',
                textAlign: 'left',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                pb: 2
              }}
            >
              Similar properties available for your dates {start} to {end}
            </Typography>

            <Grid container justifyContent="center">
              {datasourceList
                ?.filter((item) =>
                  datasource?.place?.category
                    ? item.place.category === datasource?.place?.category
                    : true
                )
                .slice(0, 30)
                .map((room, index) => {
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
                        onClick={() => handleViewRoom(room.id)}
                        image={
                          room?.images && room?.images?.length
                            ? room?.images.flatMap((item) => item.images)[0]
                            : '/static/none_image.png'
                        }
                        alt={room?.place?.name}
                      />
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          const favorite = dataFavorite.find(
                            (fav) => fav.room?.id === room?.id
                          );
                          Favorite(room.id, favorite?.id);
                        }}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          '&:hover': { backgroundColor: 'white' }
                        }}
                      >
                        {isFavorite[room.id] ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <Box
                        sx={{
                          padding: '10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start'
                        }}
                      >
                        <Box
                          onClick={() => handleViewRoom(room.id)}
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
                            onClick={() => {
                              const rate = dataRate.find(
                                (rt) => rt.room?.id === room?.id
                              );
                              handleRate(room.id, rate?.id);
                              setOpen(true);
                            }}
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
                          <RatingDialog
                            roomId={roomId}
                            rateId={ratingId}
                            open={open}
                            onClose={() => setOpen(false)}
                          />
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
                              <Typography variant="body1">None</Typography>
                            )}
                          </Typography>
                          {room.price?.pricing ? (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
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
                                      color: 'red',
                                      fontSize: 12,
                                      display: 'flex',
                                      justifyContent: 'end'
                                    }}
                                  >
                                    $
                                    {Number(
                                      room.price.pricing
                                    ).toLocaleString()}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: 'black',
                                      fontSize: 12,
                                      display: 'flex',
                                      justifyContent: 'end'
                                    }}
                                  >
                                    $
                                    {Number(
                                      room.price.discount
                                    ).toLocaleString()}
                                    /night
                                  </Typography>
                                </>
                              ) : (
                                <Typography
                                  sx={{
                                    color: 'black',
                                    fontSize: 12,
                                    display: 'flex',
                                    justifyContent: 'end'
                                  }}
                                >
                                  ${Number(room.price.pricing).toLocaleString()}
                                  /night
                                </Typography>
                              )}
                            </Box>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  );
                })}
            </Grid>
          </Box>
        )}
      </Box>
      {loading && <LoadingPage />}
    </>
  );
}

export default ListTime;
