import Head from 'next/head';
import { MyApp } from '@/constant/my-app';
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { Icons } from '@/constant/icons';
import { HttpClient } from '@/services/http-client';
import { Pagination } from '@/constant/gagination';
import HeaderPage from '@/layouts/PageLayout/Header';
import appColor from '@/theme/appColor';

function LocationPage() {
  const title = 'Location Page';
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber, setPageNumber] = useState(0);
  const [icon, setIcon] = useState<any>(null);

  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 80px)'
  };

  const fetchItems = async () => {
    const res = await http.get(
      `AnonymousPlace?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource((prev) => [...prev, ...res]);
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps) {
      setIcon({
        url: Icons.destination,
        scaledSize: new window.google.maps.Size(40, 40)
      });
    }
  }, [pageNumber, pageSize]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <LoadScript
        googleMapsApiKey={MyApp.googleMapsApiKey}
        mapIds={[MyApp.googleMapsId]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 11.569648183544976, lng: 104.88994538784027 }}
          zoom={12}
        >
          {datasource?.map((item, index) => {
            const { latitude, longitude } = item.location || {};
            if (!latitude || !longitude) return null;
            const name = item.name;

            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

            return (
              <React.Fragment key={`marker-${index}`}>
                <Marker
                  icon={icon}
                  position={{
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                  }}
                  onClick={() => window.open(googleMapsUrl, '_blank')}
                />
                <OverlayView
                  position={{
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                  }}
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
                    {name}
                  </div>
                </OverlayView>
              </React.Fragment>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

LocationPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default LocationPage;
