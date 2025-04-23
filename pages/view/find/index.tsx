import {
  ButtonSearch,
  PeopleRate,
  useManualLoad
} from '@/helpers/render';
import HeaderPage from '@/layouts/PageLayout/Header';
import {
  Typography,
  Box,
  InputAdornment,
  FormControl,
  CardMedia,
  Grid,
  Card,
  IconButton,
  Autocomplete,
  TextField
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Pagination } from '@/constant/gagination';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import appColor from '@/theme/appColor';
import { calculateNights } from '@/helpers/calulate';
import FooterPage from '@/layouts/PageLayout/Fooder';
import Head from 'next/head';
import { AppKey } from '@/constant/key';
import { toggleFavorite } from '@/content/Widgets/Favorite';
import { provinces } from '@/helpers';
import RatingDialog, { renderStars } from '@/content/Widgets/Favorite/rating';

function FindPage() {
  const title = 'Find Page';
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumberR, setPageNumberR] = useState(1);
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { pageNumber } = useManualLoad({
    onLoadMore: () => {
      getRooms();
      getFavorite();
    }
  });

  const getRooms = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `UserRoom?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log(res.length);
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDatasource((prev) => [...prev, ...res]);
    setLoading(false);
  };

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

  useEffect(() => {
    const savedFavorites = localStorage.getItem(AppKey.isFavorite);
    if (savedFavorites) {
      setIsFavorite(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: appColor.background,
          py: 10
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Discover amazing features and seamless booking experiences.
        </Typography>
        <FormControl
          variant="outlined"
          sx={{
            width: { xs: '100%', sm: '75%', md: '50%' },
            pt: 3,
            px: 2
          }}
        >
          <Autocomplete
            freeSolo
            options={provinces}
            value={search}
            onInputChange={(_event, newInputValue) => setSearch(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search province..."
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <ButtonSearch variant="contained" size="small">
                        Search
                      </ButtonSearch>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </FormControl>
        {datasource && datasource.length > 0 && (
          <>
            <Box sx={{ py: 2, px: 3 }}>
              <Grid container justifyContent="center">
                {datasource
                  ?.filter(
                    (item) =>
                      !search.trim() ||
                      item.place.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      !search.trim() ||
                      item.place.category
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  )
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
                            transform: 'scale(1.02)'
                          }
                        }}
                      >
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
                              sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                const rate = dataRate.find(
                                  (rt) => rt.room?.id === room?.id
                                );
                                handleRate(room.id, rate?.id);
                                setOpen(true);
                              }}
                            >
                              {room?.rates && room?.rates.length > 0
                                ? renderStars(
                                    room?.rates.reduce(
                                      (id, rate) =>
                                        id + parseFloat(rate.rating),
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
                                <Typography variant="body1">none</Typography>
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
                                        color: appColor.textprice,
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
                                        color: appColor.textblack,
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
                                      color: appColor.textblack,
                                      fontSize: 12,
                                      display: 'flex',
                                      justifyContent: 'end'
                                    }}
                                  >
                                    $
                                    {Number(
                                      room.price.pricing
                                    ).toLocaleString()}
                                    /night
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
          </>
        )}
      </Box>
      <FooterPage />
    </>
  );
}

FindPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default FindPage;
