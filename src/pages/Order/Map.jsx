import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { useLocation } from 'react-router-dom';
import axiosClient from '~/api/axiosClient';

const Map = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [locationShipper, setLocationShipper] = useState();
  const location = useLocation();
  const order = location.state;

  const calculateRoute = async () => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: order.from_address.latitude, lng: order.from_address.longitude },
      destination: { lat: order.to_address.latitude, lng: order.to_address.longitude },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (!directionsResponse) {
      setDirectionsResponse(results);
    }
  };

  calculateRoute();

  useEffect(() => {
    const timeId = setInterval(async () => {
      const resShp = await axiosClient.get('order/shipper/' + order.shipper.id_shipper._id);
      if (resShp && resShp.current_address) {
        setLocationShipper(resShp.current_address);
      }
    }, 10000);
    return () => {
      clearInterval(timeId);
    };
  }, [order.shipper.id_shipper._id]);

  return (
    <div>
      <GoogleMap
      // defaultZoom={10}
      // defaultCenter={{ lat: order?.from_address?.latitude, lng: order?.from_address?.longitude }}
      >
        {locationShipper && (
          <Marker
            title="Vị trí tài xế"
            position={{ lat: locationShipper.latitude, lng: locationShipper.longitude }}
          >
            <InfoBox>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '10px 0 10px 10px',
                  minWidth: 100,
                }}
              >
                <label style={{ fontWeight: 'bold' }}>Vị trí tài xế</label>
              </div>
            </InfoBox>
          </Marker>
        )}
        <Marker
          title="Vị trí nhận hàng"
          position={{ lat: order?.from_address?.latitude, lng: order?.from_address?.longitude }}
        >
          <InfoBox>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px 0 10px 10px',
              }}
            >
              <label style={{ fontWeight: 'bold' }}>Vị trí nhận hàng</label>
              <label>{order?.from_address?.address}</label>
            </div>
          </InfoBox>
        </Marker>

        <Marker
          title="Vị trí giao hàng"
          position={{ lat: order?.to_address?.latitude, lng: order?.to_address?.longitude }}
        >
          <InfoBox>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px 0 10px 10px',
              }}
            >
              <label style={{ fontWeight: 'bold' }}>Vị trí giao hàng</label>
              <label>{order?.to_address?.address}</label>
            </div>
          </InfoBox>
        </Marker>
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              polylineOptions: {
                strokeColor: 'rgb(0,176,255)',
              },
            }}
            directions={directionsResponse}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
