import { Pagination } from '@/constant/gagination';
import HeaderPage from '@/layouts/PageLayout/Header';
import { HttpClient } from '@/services/http-client';
import {
  Typography,
  Button,
  Box,
  Grid,
  CardMedia,
  Card,
  IconButton,
  TextField
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { calculateNights } from '@/helpers/calulate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PeopleRate, useGuestCount, useManualLoad } from '@/helpers/render';
import appColor from '@/theme/appColor';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { AppKey } from '@/constant/key';
import RatingDialog, { renderStars } from '@/content/Widgets/Favorite/rating';

function ProvincePage() {
  const title = 'ProvincePage';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const unique = new Set();
  const [datasource, setDatasource] = useState<any>([]);
  const [datasourceList, setDatasourceList] = useState<any>([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumberR, setPageNumberR] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [open, setOpen] = useState(false);
  const {
    adult,
    setAdult,
    children,
    setChildren,
    date,
    increaseAdult,
    decreaseAdult,
    increaseChildren,
    decreaseChildren,
    dateChange
  } = useGuestCount();

  const getItem = async (id: any) => {
    const res = await http.get(`UserPlace/${id}`);
    setDatasource(res);
  };

  const getRooms = async () => {
    // if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `UserRoom/Province?Category=${datasource?.category}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    // if (res.length < pageSize) {
    //   setHasMore(false);
    // }
    setDatasourceList((prev) => [...prev, ...res]);
    setLoading(false);
  };
  const { pageNumber } = useManualLoad({ onLoadMore: getRooms });

  const handleViewRoom = (id: string) => {
    router.push(`/view/detail/room/${id}`);
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

  const toggleFavorite = async (roomId: string, favoriteId: string) => {
    const userId = localStorage.getItem(AppKey.userId);
    if (!userId) return;

    try {
      let updatedFavorites = { ...isFavorite };
      if (isFavorite[roomId]) {
        await http.delete(`UserFavorite/${favoriteId}`);
        delete updatedFavorites[roomId];
      } else {
        await http.post(`UserFavorite`, {
          userId,
          roomId,
          save: 'save'
        });
        updatedFavorites[roomId] = true;
      }

      setIsFavorite(updatedFavorites);
      localStorage.setItem(AppKey.isFavorite, JSON.stringify(updatedFavorites));

      await router.push(`/view/favorite?refresh=true`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem(AppKey.isFavorite);
    if (savedFavorites) {
      setIsFavorite(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    getFavorite();
  }, []);

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    if (datasource?.category) {
      getRooms();
    }
  }, [datasource, pageSize]);

  return (
    <>
      <Head>
        <title>
          {title} {id}
        </title>
      </Head>
      <Box sx={{ textAlign: 'center', py: 10, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" gutterBottom>
          Effortless Room Search and Instant Booking in {datasource?.category}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 5
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '4px',
              width: 300,
              height: 60
            }}
          >
            <IconButton onClick={decreaseAdult} size="small">
              <RemoveIcon />
            </IconButton>
            <TextField
              value={
                adult
                  ? `${Number(adult)} Adult${Number(adult) > 1 ? 's' : ''}`
                  : 'All Adults'
              }
              onChange={(e) => setAdult(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '300px', textAlign: 'center' }}
            />
            <IconButton onClick={increaseAdult} size="small">
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '4px',
              width: 300,
              height: 60
            }}
          >
            <IconButton onClick={decreaseChildren} size="small">
              <RemoveIcon />
            </IconButton>
            <TextField
              value={
                children
                  ? `${Number(children)} Children${
                      Number(children) > 1 ? 's' : ''
                    }`
                  : 'All Childrens'
              }
              onChange={(e) => setChildren(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '300px', textAlign: 'center' }}
            />
            <IconButton onClick={increaseChildren} size="small">
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '4px',
              width: 300,
              height: 60
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="YYYY/MM/DD"
                value={date ? dayjs(date, 'YYYY/MM/DD') : null}
                onChange={dateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    sx={{ width: '300px', textAlign: 'center' }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
          <Grid container justifyContent="center">
            {datasourceList
              ?.filter(
                (item) =>
                  (!adult || item.adult === adult) &&
                  (!children || item.children === children) &&
                  (!date ||
                    dayjs(item.available.checkIn).format('YYYY/MM/DD') === date)
              )
              .map((room, index) => {
                if (unique.has(room.place?.name)) return null;
                unique.add(room.place?.name);
                return (
                  <Card
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: '16px',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      p: 1,
                      m: 2,
                      width: 800
                    }}
                  >
                    <Box sx={{ position: 'relative', minWidth: 200 }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 200,
                          height: '100%',
                          borderRadius: '10px',
                          aspectRatio: '1',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        image={
                          room?.images && room?.images?.length
                            ? room?.images.flatMap((item) => item.images)[0]
                            : '/static/none_image.png'
                        }
                        alt={room?.place?.name}
                        onClick={() => handleViewRoom(room.id)}
                      />
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                          const favorite = dataFavorite.find(
                            (fav) => fav.room?.id === room?.id
                          );
                          toggleFavorite(room.id, favorite?.id);
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
                    </Box>

                    <Box sx={{ flex: 3, p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            fontWeight: 'bold'
                          }}
                        >
                          {room?.place?.name}
                        </Typography>
                        <Typography
                          onClick={() => {
                            const rate = dataRate.find(
                              (rt) => rt.room?.id === room?.id
                            );
                            handleRate(room.id, rate?.id);
                            setOpen(true);
                          }}
                          sx={{
                            width: 150,
                            textAlign: 'right',
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
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: appColor.textlocation,
                          mt: 0.5,
                          display: 'flex',
                          justifyContent: 'start',
                          gap: 1
                        }}
                      >
                        {room?.place?.location?.address} •{' '}
                        {room?.place?.location?.city}{' '}
                        <Typography
                          component="a"
                          href={`https://www.google.com/maps?q=${room?.place?.location?.latitude},${room?.place?.location?.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: appColor.textlocation,
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Show on map
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          justifyContent: 'start',
                          fontWeight: 'bold',
                          fontSize: 15,
                          paddingY: '5px'
                        }}
                      >
                        Room
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          justifyContent: 'start',
                          color: appColor.textfacility,
                          fontWeight: 400
                        }}
                      >
                        {room?.place?.foods?.length ? (
                          <>✓ Food included</>
                        ) : (
                          <></>
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          justifyContent: 'start',
                          color: appColor.textfacility,
                          fontWeight: 400
                        }}
                      >
                        {room?.place?.facilitys?.length ? (
                          <>✓ Facility included</>
                        ) : (
                          <></>
                        )}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          justifyContent: 'start',
                          color: appColor.textfacility,
                          fontWeight: 400
                        }}
                      >
                        {room?.amenities?.length ? (
                          <>✓ Amenities included</>
                        ) : (
                          <></>
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flex: 1.5,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'column' },
                        alignItems: 'flex-end',
                        gap: 1
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          justifyContent: 'end',
                          color: appColor.textgray
                        }}
                      >
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
                        , {room.adult} Adult{room.adult > 1 ? 's' : ''}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          display: 'flex',
                          justifyContent: 'end',
                          fontWeight: 400
                        }}
                      >
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
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'flex',
                          justifyContent: 'end',
                          color: appColor.textgray
                        }}
                      >
                        {room?.price?.taxes > 0 ? <>Includes taxes</> : <></>}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 1,
                          borderRadius: '8px',
                          width: '100%'
                        }}
                        onClick={() => handleViewRoom(room.id)}
                      >
                        See availability
                      </Button>
                    </Box>
                  </Card>
                );
              })}
          </Grid>
        </Box>
        {loading && <LoadingPage />}
      </Box>
    </>
  );
}

ProvincePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default ProvincePage;
