import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { MyApp } from '@/constant/my-app';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { Icons } from '@/constant/icons';
import { HttpClient } from '@/services/http-client';
import { Pagination } from '@/constant/gagination';

function DashboardAdmin() {
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [pageSize] = useState<number>(Pagination.pageSize);
  const [pageNumber] = useState<number>(0);
  const [icon, setIcon] = useState<any>(null);

  const containerStyle = {
    width: '100%',
    height: 'calc(100vh - 80px)'
  };

  const fetchItems = async () => {
    const res = await http.get(
      `AdminPlace?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.item);
  };

  useEffect(() => {
    fetchItems();

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
        <title>Crypto Dashboard</title>
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
            return (
              <Marker
                icon={icon}
                key={`marker-${index}`}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude)
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

DashboardAdmin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardAdmin;
