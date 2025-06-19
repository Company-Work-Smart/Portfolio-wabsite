import {
  Typography,
  Button,
  Card,
  Grid,
  Box,
  Dialog,
  DialogContent,
  TextField,
  CardMedia,
  IconButton
} from '@mui/material';
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView
} from '@react-google-maps/api';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { MyApp, UserBoxProps } from '@/constant/my-app';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Icons } from '@/constant/icons';
import { datetimeAvailable } from '@/helpers/datetime';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Head from 'next/head';
import dayjs, { Dayjs } from 'dayjs';
import appColor from '@/theme/appColor';
import WatchListImage from '@/content/Widgets/Details/WatchListImage';
import { AppKey } from '@/constant/key';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { Pagination } from '@/constant/gagination';
import { calculateNights } from '@/helpers/calulate';
import { useGuestCount } from '@/helpers/render';
import ListTime from '@/content/Widgets/Details/ListTime';
import { toggleFavorite } from '@/content/Widgets/Favorite';
import RatingDialog, {
  PeopleRate,
  renderStars
} from '@/content/Widgets/Favorite/rating';

const containerStyle = {
  width: '100%',
  height: '470px'
};

function DetailRoomPage() {
  const title = 'DetailRoomPage';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useContext(SnackbarContext);
  const [user, setUser] = useState<UserBoxProps>({});
  // const [placeId, setPlaceId] = useState<any>({});
  const [datasource, setDatasource] = useState<any>({});
  const [datasourceList, setDatasourceList] = useState([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [comment, setComment] = useState<any[]>([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [selectId, setSelectId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreRF, setHasMoreRF] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreComment, setHasMoreComment] = useState(true);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState<any>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [formComment, setFormComment] = useState({
    userId: '',
    placeId: '',
    comments: ''
  });

  const [formData, setFormData] = useState({
    userId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    number: ''
  });
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
    const userId = localStorage.getItem(AppKey.userId);
    const res = await http.get(`UserRoom/${id}`);
    setDatasource(res);
    if (res.place.name) {
      getRooms(res.place.name);
      getComment(res.place.name);
      setFormComment((prev) => ({
        ...prev,
        userId: userId,
        placeId: res.place.id
      }));
    }
  };

  const getRooms = async (placeName: string) => {
    if (!hasMore || !placeName) return;
    const res = await http.get(
      `UserRoom/filtered?Name=${placeName}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setDatasourceList((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMore(false);
    else setPageNumber((prev) => prev + 1);
  };

  const submmitComment = async () => {
    if (editingComment) {
      await http.put(`UserComment/${editingComment}`, formComment);
      setComment((prev) =>
        prev.map((c) =>
          c.id === editingComment ? { ...c, comments: formComment.comments } : c
        )
      );
    } else {
      const res = await http.post(`UserComment`, formComment);
      setComment((prev) => {
        if (prev.find((c) => c.id === res.id)) return prev;
        return [res, ...prev];
      });
    }

    setFormComment((prev) => ({ ...prev, comments: '' }));
    setEditingComment(null);
  };

  const getComment = async (placeName: string) => {
    if (!hasMoreComment) return;
    const res = await http.get(
      `AnonymousComment?Name=${placeName}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    setComment((prev) => [...prev, ...res]);
    if (res.length < pageSize) setHasMoreComment(false);
    else setPageNumber((prev) => prev + 1);
  };

  const handleEditComment = (id: string) => {
    const edit = comment.find((msg) => msg.id === id);
    if (edit) {
      setFormComment({ ...formComment, comments: edit.comments });
      setEditingComment(id);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (id) {
      await http.delete(`UserComment/${id}`);
      setComment((prev) => prev.filter((item) => item.id !== id));
    }
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

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.roomId) return;
    await http.post('UserBooking', formData);
    showSnackbar({ type: 'success', message: 'Booking successfully!' });
    setOpenDialog(false);
    await router.push(`/applications/user/profile?refresh=true`);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormComment((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    if (newValue) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue.format('YYYY-MM-DD')
      }));
    }
  };

  const handleDialogOpen = (id: string) => {
    setSelectId(id);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setSelectId(null);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
    const userId = localStorage.getItem(AppKey.userId);
    setFormData((prev) => ({
      ...prev,
      userId: userId,
      roomId: selectId
    }));
  }, [id, selectId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps) {
      setIcon({
        url: Icons.destination,
        scaledSize: new window.google.maps.Size(40, 40)
      });
    }
  }, []);

  const lat = parseFloat(datasource.place?.location?.latitude);
  const lng = parseFloat(datasource.place?.location?.longitude);

  const isValidLat = !isNaN(lat);
  const isValidLng = !isNaN(lng);

  const mapCenter =
    isValidLat && isValidLng ? { lat, lng } : { lat: 0, lng: 0 };

  useEffect(() => {
    setUser({ userId: localStorage.getItem(AppKey.userId) });
  }, []);

  useEffect(() => {
    getRate();
    getFavorite();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          px: 5,
          backgroundColor: appColor.background
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container justifyContent="center" maxWidth="lg">
            <WatchListImage />
            <Grid
              item
              xs={12}
              md={4}
              sx={{ pl: { md: 2 }, mt: { xs: 2, md: 0 } }}
            >
              <Card sx={{ mb: 2 }}>
                <Box p={2}>
                  <Typography variant="h6">Reserve Now</Typography>
                  <Typography variant="body2" mt={1}>
                    Check availability and book your stay.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pt: 2
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left',
                        justifyContent: 'start',
                        pl: 2,
                        mb: 1
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          color: appColor.textgray
                        }}
                      >
                        {datasource.bed} bed
                        {datasource.bed > 1 ? 's' : ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'flex',
                          color: appColor.textgray
                        }}
                      >
                        {datasource.adult} Adult
                        {datasource.adult > 1 ? 's' : ''}
                      </Typography>
                      <Typography
                        sx={{
                          display: 'flex',
                          color: appColor.textgray
                        }}
                      >
                        {datasource.children}
                        {datasource.children > 1 ? ' Childrens' : ' Children'}
                      </Typography>
                      <Typography
                        sx={{
                          display: 'flex',
                          color: appColor.textgray
                        }}
                      >
                        {datetimeAvailable(datasource?.available?.checkIn)} -
                        {datetimeAvailable(datasource?.available?.checkOut)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: 'primary.main',
                          display: 'flex',
                          justifyContent: 'end',
                          fontSize: '1.25rem'
                        }}
                      >
                        {datasource?.price?.pricing ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end',
                              gap: 1
                            }}
                          >
                            {datasource?.price.discount &&
                            datasource?.price.discount !== '0' &&
                            datasource?.price.discount !== 0 ? (
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
                                    datasource?.price.pricing
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
                                    Number(datasource?.price.pricing) -
                                    Number(datasource?.price.discount) -
                                    Number(datasource?.price.taxes)
                                  ).toLocaleString()}
                                  {Number(datasource?.price.taxes) > 0
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
                                  Number(datasource?.price.pricing) -
                                  Number(datasource?.price.taxes)
                                ).toLocaleString()}
                                {Number(datasource?.price.taxes) > 0
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
                        {datasource?.price?.taxes > 0 ? (
                          <>Includes taxes</>
                        ) : (
                          <></>
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          display: 'flex',
                          justifyContent: 'end',
                          color: appColor.textgray
                        }}
                      >
                        {datasource?.available?.status}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex ' }}>
                    <Button
                      onClick={() => handleDialogOpen(datasource.id)}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, mx: 1 }}
                    >
                      Check Availability
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(
                          `/applications/user/messenger/${datasource.place.user.id}`
                        )
                      }
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, mx: 1 }}
                    >
                      Contact me
                    </Button>
                  </Box>
                </Box>
              </Card>
              <Card>
                <Box p={1}>
                  <LoadScript
                    googleMapsApiKey={MyApp.googleMapsApiKey}
                    mapIds={[MyApp.googleMapsId]}
                  >
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={mapCenter}
                      zoom={12}
                    >
                      {isValidLat && isValidLng && (
                        <>
                          <Marker
                            icon={icon}
                            position={{ lat, lng }}
                            onClick={() =>
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
                                '_blank'
                              )
                            }
                          />
                          <OverlayView
                            position={{ lat, lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                          >
                            <div
                              style={{
                                backgroundColor: 'white',
                                padding: '5px 5px',
                                borderRadius: '5px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                color: appColor.black,
                                transform: 'translateX(20px)',
                                whiteSpace: 'nowrap',
                                display: 'inline-block'
                              }}
                            >
                              {datasource.place?.name || 'Unknown Location'}
                            </div>
                          </OverlayView>
                        </>
                      )}
                    </GoogleMap>
                    ;
                  </LoadScript>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box
          p={2}
          mb={2}
          mt={2}
          border={1}
          borderColor="grey.200"
          borderRadius={2}
        >
          {datasourceList && datasourceList.length > 0 && (
            <Box sx={{ py: 5 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 2
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
                        ? `${Number(adult)} Adult${
                            Number(adult) > 1 ? 's' : ''
                          }`
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
              <Grid container spacing={4} justifyContent="center" pt={5}>
                {datasourceList
                  ?.filter(
                    (item) =>
                      (!adult || item.adult === adult) &&
                      (!bed || item.bed === bed) &&
                      (!date ||
                        (item.available &&
                          dayjs(item.available.checkIn).format('YYYY/MM/DD') ===
                            date))
                  )
                  .map((room, index) => (
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
                            sx={{ textAlign: 'right' }}
                          >
                            {room?.available?.checkIn &&
                            room?.available?.checkOut ? (
                              <Typography variant="body1">
                                {calculateNights(
                                  room.available.checkIn,
                                  room.available.checkOut
                                )}
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
                  ))}
              </Grid>
            </Box>
          )}
          {hasMore && (
            <Button
              variant="contained"
              onClick={() => getRooms(datasource.place.name)}
              style={{ marginTop: '16px' }}
            >
              Load More
            </Button>
          )}

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Comments
          </Typography>

          <Box
            display="flex"
            gap={4}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            {comment?.length > 0 ? (
              <Box flex={2}>
                {comment.map((comment, index) => (
                  <Box key={index} mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        image={
                          comment?.user?.photo || '/static/user-modified.png'
                        }
                      />
                      <Box textAlign="start">
                        <Box
                          p={1}
                          mb={1}
                          borderRadius={2}
                          sx={{ backgroundColor: appColor.light }}
                        >
                          <Typography variant="h6" fontWeight="bold">
                            {comment?.user?.username.charAt(0).toUpperCase() +
                              comment?.user?.username.slice(1)}
                          </Typography>
                          <Typography variant="body2">
                            {comment?.comments}
                          </Typography>
                        </Box>

                        {user?.userId === comment?.user?.id && (
                          <Box display="flex" textAlign="start">
                            <Typography
                              onClick={() => handleEditComment(comment.id)}
                              sx={{
                                cursor: 'pointer',
                                color: appColor.lightgray
                              }}
                            >
                              edit
                            </Typography>
                            <Typography
                              onClick={() => handleDeleteComment(comment.id)}
                              sx={{
                                cursor: 'pointer',
                                color: appColor.error,
                                px: 2
                              }}
                            >
                              delete
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" flex={2}>
                No comments yet.
              </Typography>
            )}
            <Box flex={2}>
              <TextField
                multiline
                fullWidth
                rows={3}
                name="comments"
                value={formComment.comments}
                onChange={handleInputComment}
                placeholder="Write your comment here..."
                variant="outlined"
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                {editingComment && (
                  <Button
                    onClick={() => {
                      setEditingComment(null);
                      setFormComment((prev) => ({ ...prev, comments: '' }));
                    }}
                    sx={{ ml: 1 }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={formComment.comments.trim() === ''}
                  onClick={() => submmitComment()}
                >
                  <SendTwoToneIcon />
                </Button>
              </Box>
            </Box>
          </Box>
          {hasMoreComment && (
            <Typography
              onClick={() => getComment(datasource.place.name)}
              variant="h4"
              fontWeight="bold"
              sx={{ cursor: 'pointer' }}
            >
              More comment...
            </Typography>
          )}
        </Box>
        <ListTime id={datasource.id} />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            Reserve Now
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '45ch',
                  lg: '50ch'
                }
              }
            }}
            noValidate
            autoComplete="off"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="CheckIn"
                inputFormat="YYYY-MM-DD"
                value={dayjs(formData.checkIn)}
                onChange={(newValue) => handleDateChange(newValue, 'checkIn')}
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
              />
              <DesktopDatePicker
                label="CheckOut"
                inputFormat="YYYY-MM-DD"
                value={dayjs(formData.checkOut)}
                onChange={(newValue) => handleDateChange(newValue, 'checkOut')}
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Number Room"
              name="number"
              value={formData.number}
              onChange={handleInput}
            />
          </Box>
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Booking Now
          </Button>
        </DialogContent>
      </Dialog>
      <FooterPage />
    </>
  );
}

DetailRoomPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default DetailRoomPage;
