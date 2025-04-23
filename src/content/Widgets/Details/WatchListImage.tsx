import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import appColor from '@/theme/appColor';
import { useEffect, useRef, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { toggleFavorite } from '../Favorite';
import { AppKey } from '@/constant/key';
import { Pagination } from '@/constant/gagination';
import RatingDialog, { renderStars } from '../Favorite/rating';

function WatchListImage() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const [datasource, setDatasource] = useState<any>([]);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const [ratingId, setRatingId] = useState({});
  const [roomId, setRoomId] = useState({});
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState<{ [key: string]: boolean }>({});
  const thumbnailsRef = useRef(null);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [openRate, setOpenRate] = useState(false);

  const visibleThumbnails = 5;
  const imagesList = datasource?.images
    ? datasource.images.flatMap((item) => item.images)
    : [];

  const getItem = async (id: any) => {
    const res = await http.get(`UserRoom/${id}`);
    setDatasource(res);
  };

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailWidth = 64;
      const scrollPosition = currentIndex * thumbnailWidth;
      const scrollThreshold = visibleThumbnails - 1;

      if (currentIndex >= scrollThreshold) {
        thumbnailsRef.current.scrollTo({
          left: scrollPosition - scrollThreshold * thumbnailWidth,
          behavior: 'smooth'
        });
      } else {
        thumbnailsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const getVisibleThumbnails = () => {
    let start = 0;
    let end = visibleThumbnails;

    if (currentIndex >= visibleThumbnails) {
      start = currentIndex - (visibleThumbnails - 1);
      end = currentIndex + 1;
    }

    return imagesList.slice(start, end);
  };

  const getFavorite = async () => {
    if (!hasMore) return;
    const res = await http.get(
      `UserFavorite?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDataFavorite((prev) => [...prev, ...res]);
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    getFavorite();
    const interval = setInterval(() => {
      getFavorite();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  return (
    <>
      <Grid item xs={12} md={8}>
        <Card>
          <Box position="relative">
            <Grid container spacing={1}>
              <Grid item xs={8} sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={
                    imagesList.length > 0
                      ? imagesList[0]
                      : '/static/none_image.png'
                  }
                  alt={datasource?.place?.name}
                  sx={{ borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => handleOpen(0)}
                />
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    const favorite = dataFavorite.find(
                      (fav) => fav.room?.id === datasource?.id
                    );
                    Favorite(datasource.id, favorite?.id);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 10,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    '&:hover': { backgroundColor: 'white' }
                  }}
                >
                  {isFavorite[datasource.id] ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={4} container direction="column" spacing={1}>
                {imagesList.slice(1, 3).map((image, index) => (
                  <Grid item key={index} sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="195"
                      image={image || '/static/none_image.png'}
                      alt={datasource?.place?.name}
                      sx={{ borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => handleOpen(index + 1)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} container spacing={1}>
                {imagesList.slice(3, 7).map((image, index) => (
                  <Grid item xs={2.3} key={index} sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={image || '/static/none_image.png'}
                      alt={datasource?.place?.name}
                      sx={{ borderRadius: '8px', cursor: 'pointer' }}
                      onClick={() => handleOpen(index + 3)}
                    />
                  </Grid>
                ))}
                {imagesList.length > 7 && (
                  <Grid item xs={2.3} sx={{ position: 'relative' }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100px"
                      bgcolor="rgba(0, 0, 0, 0.5)"
                      color="white"
                      borderRadius="8px"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleOpen(7)}
                    >
                      +{imagesList.length - 7} photos
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogContent
                sx={{
                  position: 'relative',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Typography variant="subtitle1">Gallery</Typography>
                  <Box>
                    <Typography variant="subtitle1" pl={4}>
                      {datasource?.place?.name}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>

                <CardMedia
                  component="img"
                  image={imagesList[currentIndex] || '/static/none_image.png'}
                  alt="Full View"
                  sx={{
                    maxHeight: '70%',
                    maxWidth: 'auto',
                    borderRadius: '10px',
                    mb: 2
                  }}
                />
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {currentIndex + 1}/{imagesList.length}
                </Typography>
                <Grid
                  container
                  spacing={1}
                  sx={{ mt: 2, justifyContent: 'center' }}
                >
                  <div
                    ref={thumbnailsRef}
                    style={{
                      display: 'flex',
                      overflowX: 'auto',
                      marginTop: '16px',
                      paddingBottom: '8px'
                    }}
                  >
                    {getVisibleThumbnails().map((image) => {
                      const actualIndex = imagesList.indexOf(image);
                      return (
                        <Grid
                          item
                          key={actualIndex}
                          style={{ flexShrink: 0, marginRight: '8px' }}
                        >
                          <CardMedia
                            component="img"
                            image={image || '/static/none_image.png'}
                            alt={`Thumbnail ${actualIndex + 1}`}
                            onClick={() => setCurrentIndex(actualIndex)}
                            sx={{
                              width: 60,
                              height: 40,
                              borderRadius: '5px',
                              cursor: 'pointer',
                              border:
                                currentIndex === actualIndex
                                  ? '2px solid primary'
                                  : 'none'
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </div>
                </Grid>
              </DialogContent>
            </Dialog>
          </Box>

          <Box p={2}>
            <Typography variant="h5" component="div">
              {datasource.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'left'
                }}
              >
                {datasource?.place?.name}
              </Typography>
              <Typography
                onClick={() => {
                  const rate = dataRate.find(
                    (rt) => rt.room?.id === datasource?.id
                  );
                  handleRate(datasource.id, rate?.id);
                  setOpenRate(true);
                }}
                sx={{
                  pt: 0.8,
                  pl: 2,
                  cursor: 'pointer'
                }}
              >
                {datasource?.rates && datasource?.rates.length > 0
                  ? renderStars(
                      datasource?.rates.reduce(
                        (id, rate) => id + parseFloat(rate.rating),
                        0
                      ) / 10
                    )
                  : renderStars(1)}
              </Typography>
              <RatingDialog
                roomId={roomId}
                rateId={ratingId}
                open={openRate}
                onClose={() => setOpenRate(false)}
              />
            </Box>
            <Typography variant="body1" sx={{ textAlign: 'left', my: 2 }}>
              {datasource?.place?.description}
            </Typography>
            <Divider />
            <Typography variant="h6" mt={1} fontWeight="bold">
              Most popular facilities
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  color: appColor.black,
                  fontWeight: 400,
                  gap: 2,
                  pt: 1
                }}
              >
                {datasource?.place?.foods?.map((food, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        color: appColor.icon,
                        pr: 1
                      }}
                    >
                      ✓
                    </Typography>
                    <span>{food.item}</span>
                  </div>
                ))}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  color: appColor.black,
                  fontWeight: 400,
                  gap: 2,
                  pt: 1
                }}
              >
                {datasource?.place?.facilitys?.map((facility, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        color: appColor.icon,
                        pr: 1
                      }}
                    >
                      ✓
                    </Typography>
                    <span>{facility.item}</span>
                  </div>
                ))}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  color: appColor.black,
                  fontWeight: 400,
                  gap: 2,
                  pt: 1
                }}
              >
                {datasource?.amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        color: appColor.icon,
                        pr: 1
                      }}
                    >
                      ✓
                    </Typography>
                    <span>{amenity.item}</span>
                  </div>
                ))}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default WatchListImage;
