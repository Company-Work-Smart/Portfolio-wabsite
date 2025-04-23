import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import {
  Typography,
  CardMedia,
  FormControl,
  InputAdornment,
  Grid,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import Head from 'next/head';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import appColor from '@/theme/appColor';
import { ButtonSearch, useManualLoad } from '@/helpers/render';
import LoadingPage from '@/layouts/PageLayout/Loading';
import { provinces } from '@/helpers';

function ProvincePage() {
  const title = 'ProvincePage';
  const http = new HttpClient();
  const router = useRouter();
  const unique = new Set();
  const [datasource, setDatasource] = useState([]);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const getPlace = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await http.get(
      `AnonymousPlace?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (res.length < pageSize) {
      setHasMore(false);
    }
    setDatasource((prev) => [...prev, ...res]);
    setLoading(false);
  };
  const { pageNumber } = useManualLoad({ onLoadMore: getPlace });

  const handleProvince = (id: string) => {
    router.push(`/view/place/${id}`);
  };

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
        <Typography variant="h3" gutterBottom>
          Effortless Room Search and Instant Booking
        </Typography>
        <FormControl
          variant="outlined"
          sx={{
            width: { xs: '100%', sm: '75%', md: '50%' },
            pt: 3
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
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
          <Grid container spacing={4} justifyContent="center">
            {datasource
              ?.filter(
                (item) =>
                  !search.trim() ||
                  item.category?.toLowerCase().includes(search.toLowerCase())
              )
              .map((place, index) => {
                if (unique.has(place?.category)) return null;
                unique.add(place?.category);
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    >
                      <Box
                        position="relative"
                        sx={{
                          '&:hover .favorite-icon': { opacity: 1 },
                          width: '100%',
                          aspectRatio: '1 / 1',
                          overflow: 'hidden',
                          borderRadius: '10px'
                        }}
                      >
                        <Typography
                          variant="h3"
                          gutterBottom
                          sx={{
                            position: 'absolute',
                            top: 30,
                            left: 30,
                            fontSize: 20,
                            color: appColor.white
                          }}
                        >
                          {place.category}
                        </Typography>

                        <CardMedia
                          onClick={() => handleProvince(place.id)}
                          component="img"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          image={
                            place.rooms?.length &&
                            place.rooms.some((room) => room.images?.length)
                              ? place.rooms
                                  .flatMap((room) => room.images)
                                  .flatMap((imageObj) => imageObj.images)
                                  .slice(-2)[0]
                              : '/static/none_image.png'
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
        
        {loading && <LoadingPage />}
      </Box>
      <FooterPage />
    </>
  );
}

ProvincePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default ProvincePage;
