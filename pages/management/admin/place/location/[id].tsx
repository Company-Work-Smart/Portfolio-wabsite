'use client';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import { MyApp } from '@/constant/my-app';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 11.5563738,
  lng: 104.9282099
};

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    placeId: '',
    address: '',
    city: '',
    latitude: '',
    longitude: ''
  });

  const [Position, setPosition] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (id) {
      const placeId = Array.isArray(id) ? id[0] : id;
      setFormData((prevState) => ({
        ...prevState,
        placeId
      }));
    }
  }, [id]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setPosition({ lat, lng });
      setFormData((prevState) => ({
        ...prevState,
        latitude: lat.toString(),
        longitude: lng.toString()
      }));
    }
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat() || 0;
        const lng = place.geometry.location?.lng() || 0;
        setPosition({ lat, lng });
        setFormData((prevState) => ({
          ...prevState,
          latitude: lat.toString(),
          longitude: lng.toString(),
          address: place.formatted_address || '',
          city:
            place.address_components?.find((comp) =>
              comp.types.includes('locality')
            )?.long_name || ''
        }));
      }
    }
  };

  const onLoadAutocomplete = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const submitForm = async () => {
    setLoading(true);
    if (formData.placeId) {
      await http.post(`AdminLocation`, formData);
      
      setLoading(false);
      const path = `/management/admin/place`;
      await router.push(`${path}?refresh=true`);
    }
  };

  return (
    <>
      <Head>
        <title>
          {title} {id}
        </title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {loading && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader
                action={
                  <Box>
                    <Button
                      variant="contained"
                      onClick={submitForm}
                      disabled={loading}
                    >
                      {id === '0' ? 'Post' : 'Save'}
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInput}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInput}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <LoadScript
                    googleMapsApiKey={MyApp.googleMapsApiKey}
                    libraries={['places']}
                  >
                    <Box sx={{ pb: 3, padding: 1 }}>
                      <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={handlePlaceChanged}
                      >
                        <TextField
                          fullWidth
                          label="Search for a location"
                          placeholder="Type to search for a location..."
                        />
                      </Autocomplete>
                    </Box>

                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={Position}
                      zoom={12}
                      onClick={handleMapClick}
                    >
                      <Marker position={Position} />
                    </GoogleMap>
                  </LoadScript>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

AdminAdminFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminAdminFormManagement;
