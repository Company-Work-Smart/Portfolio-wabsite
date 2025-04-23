import {
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  Grid,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Head from 'next/head';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { calculateNights } from '@/helpers/calulate';
import { PeopleRate } from '@/helpers/render';
import appColor from '@/theme/appColor';
import { AppKey } from '@/constant/key';
import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import RatingDialog, { renderStars } from '@/content/Widgets/Favorite/rating';

function FavoritePage() {
  const title = 'Favorite Page';
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  const getRate = async () => {
    if (!hasMore) return;
    const res = await http.get(
      `UserRate?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDataRate((prev) => [...prev, ...res]);
    setPageNumber((prev) => prev + 1);
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
    if (!hasMore) return;
    const res = await http.get(
      `UserFavorite?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDatasource((prev) => [...prev, ...res]);
  };
  useEffect(() => {
    getFavorite();
    const interval = setInterval(() => {
      getFavorite();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRoom = (id: any) => {
    router.push(`/view/detail/room/${id}`);
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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          backgroundColor: appColor.background
        }}
      >
        <Typography variant="h3" gutterBottom>
          Preferred Room for Future Reservations
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
          <Grid container justifyContent="center">
            {datasource.map((favorite, index) => {
              if (unique.has(favorite?.room?.place?.name)) return null;
              unique.add(favorite?.room?.place?.name);
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
                        favorite?.room?.images && favorite?.room?.images?.length
                          ? favorite?.room?.images.flatMap(
                              (item) => item.images
                            )[0]
                          : '/static/none_image.png'
                      }
                      alt={favorite?.room?.place?.name}
                      onClick={() => handleRoom(favorite.room.id)}
                    />
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() =>
                        toggleFavorite(favorite.room.id, favorite.id)
                      }
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: 'white' }
                      }}
                    >
                      {isFavorite[favorite.room.id] ? (
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
                        {favorite?.room?.place?.name}
                      </Typography>
                      <Typography
                        onClick={() => {
                          const rate = dataRate.find(
                            (rt) => rt.room?.id === favorite.room?.id
                          );
                          handleRate(favorite.room.id, rate?.id);
                          setOpen(true);
                        }}
                        sx={{
                          width: 150,
                          textAlign: 'right',
                          cursor: 'pointer'
                        }}
                      >
                        {favorite?.room?.rates &&
                        favorite?.room?.rates.length > 0
                          ? renderStars(
                              favorite?.room?.rates.reduce(
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
                      {favorite?.room?.place?.location?.address} •{' '}
                      {favorite?.room?.place?.location?.city}{' '}
                      <Typography
                        component="a"
                        href={`https://www.google.com/maps?q=${favorite?.room?.place?.location?.latitude},${favorite?.room?.place?.location?.longitude}`}
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
                      {favorite?.room?.place?.foods?.length ? (
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
                      {favorite?.room?.place?.facilitys?.length ? (
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
                      {favorite?.room?.amenities?.length ? (
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
                        {favorite?.room?.available?.checkIn &&
                        favorite?.room?.available?.checkOut ? (
                          <Typography variant="body1">
                            {calculateNights(
                              favorite.room.available.checkIn,
                              favorite.room.available.checkOut
                            )}{' '}
                            {calculateNights(
                              favorite.room.available.checkIn,
                              favorite.room.available.checkOut
                            ) === 1
                              ? 'night'
                              : 'nights'}
                          </Typography>
                        ) : (
                          <Typography variant="body1">none</Typography>
                        )}
                      </Typography>
                      , {favorite.room.adult} Adult
                      {favorite.room.adult > 1 ? 's' : ''}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        fontWeight: 400
                      }}
                    >
                      {favorite.room.price?.pricing ||
                      favorite.room.price?.discount ? (
                        <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end',
                              gap: 1
                            }}
                          >
                            {favorite.room.price.discount &&
                            favorite.room.price.discount !== '0' &&
                            favorite.room.price.discount !== 0 ? (
                              <>
                                <Typography
                                  sx={{
                                    textDecoration: 'line-through',
                                    color: appColor.textprice,
                                    fontSize: 12
                                  }}
                                >
                                  ${Number(favorite.room.price.pricing).toLocaleString()}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: appColor.textblack,
                                    fontSize: 12
                                  }}
                                >
                                  $
                                  {(
                                    Number(favorite.room.price.pricing) -
                                    Number(favorite.room.price.discount) +
                                    Number(favorite.room.price.taxes)
                                  ).toLocaleString()}
                                  {Number(favorite.room.price.taxes) > 0
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
                                  Number(favorite.room.price.pricing) +
                                  Number(favorite.room.price.taxes)
                                ).toLocaleString()}
                                {Number(favorite.room.price.taxes) > 0
                                  ? ' /night (incl. tax)'
                                  : ' /night'}
                              </Typography>
                            )}
                          </Box>
                      ) : (
                        <Typography
                          sx={{
                            color: appColor.textgray,
                            fontWeight: 400,
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
                      {favorite?.room?.price?.taxes > 0 ? (
                        <>Includes taxes</>
                      ) : (
                        <></>
                      )}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '8px',
                        width: '100%'
                      }}
                      onClick={() => handleRoom(favorite.room.id)}
                    >
                      See availability
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <FooterPage />
    </>
  );
}
FavoritePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default FavoritePage;
