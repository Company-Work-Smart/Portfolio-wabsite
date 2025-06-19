import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Button
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { calculateNights } from '@/helpers/calulate';
import { datetime1week } from '@/helpers/datetime';
import { toggleFavorite } from '../Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RatingDialog, { PeopleRate, renderStars } from '../Favorite/rating';
import appColor from '@/theme/appColor';
import LoadingPage from '@/layouts/PageLayout/Loading';

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
  const [pageNumber, setPageNumber] = useState(1);
  const { start, end } = datetime1week();
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreRF, setHasMoreRF] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    setDatasourceList((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMore(false);
    else setPageNumber((prev) => prev + 1);
    setLoading(false);
  };

  const getRate = async () => {
    if (!hasMoreRF) return;
    const res = await http.get(
      `UserRate?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setDataRate((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMoreRF(false);
    else setPageNumber((prev) => prev + 1);
  };

  const handleRate = async (roomId: string, rateId: string) => {
    setRatingId(rateId);
    setRoomId(roomId);
  };

  const getFavorite = async () => {
    if (!hasMoreRF) return;
    const res = await http.get(
      `UserFavorite?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setDataFavorite((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMoreRF(false);
    else setPageNumber((prev) => prev + 1);
  };

  const Favorites = async (roomId: string, favoriteId: string) => {
    await toggleFavorite(roomId, favoriteId);
    router.push(`/view/favorite`);
  };

  useEffect(() => {
    if (id) {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    getRooms();
    getRate();
    getFavorite();
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
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          const favorite = dataFavorite.find(
                            (fav) => fav.room?.id === room?.id
                          );
                          Favorites(room.id, favorite?.id);
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
                        {(() => {
                          const favorite = dataFavorite.find(
                            (fav) => fav.room?.id === room?.id
                          );
                          if (favorite?.save) {
                            return <FavoriteIcon color="error" />;
                          } else {
                            return <FavoriteBorderIcon />;
                          }
                        })()}
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
                                    $
                                    {Number(
                                      room.price.pricing
                                    ).toLocaleString()}
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
        )}
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
  );
}

export default ListTime;
