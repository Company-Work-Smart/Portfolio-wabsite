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
import { useGuestCount } from '@/helpers/render';
import appColor from '@/theme/appColor';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import RatingDialog, {
  PeopleRate,
  renderStars
} from '@/content/Widgets/Favorite/rating';
import { toggleFavorite } from '@/content/Widgets/Favorite';

function ProvincePage() {
  const title = 'ProvincePage';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const unique = new Set();
  const [item, setItem] = useState<any>({});
  const [datasource, setDatasource] = useState<any>([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreRF, setHasMoreRF] = useState(true);
  const [open, setOpen] = useState(false);
  const {
    adult,
    setAdult,
    bed,
    setBed,
    date,
    increaseAdult,
    decreaseAdult,
    increaseBed,
    decreaseBed,
    dateChange
  } = useGuestCount();

  const getItem = async (id: any) => {
    const res = await http.get(`UserPlace/${id}`);
    setItem(res);
    getRooms(res.category);
  };

  const getRooms = async (province: string) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await http.get(
      `UserRoom/Province?Category=${province}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setDatasource((prev) => [...prev, ...res]);
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
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  useEffect(() => {
    getRate();
    getFavorite();
  }, []);

  return (
    <>
      <Head>
        <title>
          {title} {id}
        </title>
      </Head>
      <Box sx={{ textAlign: 'center', py: 10, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" gutterBottom>
          Effortless Room Search and Instant Booking in {item?.category}
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
            <IconButton onClick={decreaseBed} size="small">
              <RemoveIcon />
            </IconButton>
            <TextField
              value={
                bed
                  ? `${Number(bed)} Bed${Number(bed) > 1 ? 's' : ''}`
                  : 'All Bed'
              }
              onChange={(e) => setBed(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '300px', textAlign: 'center' }}
            />
            <IconButton onClick={increaseBed} size="small">
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
            {datasource
              ?.filter(
                (item) =>
                  (!adult || item.adult === adult) &&
                  (!bed || item.bed === bed) &&
                  (!date ||
                    (item.available &&
                      dayjs(item.available.checkIn).format('YYYY/MM/DD') ===
                        date))
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
                        onClick={() =>
                          router.push(`/view/detail/room/${room.id}`)
                        }
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
                        {room?.place?.location?.address}
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
                        , {room.bed} Bed{room.bed > 1 ? 's' : ''}
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
                        onClick={() =>
                          router.push(`/view/detail/room/${room.id}`)
                        }
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
        {!loading && hasMore && (
          <Button
            variant="contained"
            onClick={() => getItem(id)}
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
            Load More
          </Button>
        )}
      </Box>
    </>
  );
}

ProvincePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default ProvincePage;
