import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
  DirectionsRenderer,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { useLocation } from 'react-router-dom';
import { socketClient } from '../../api/socket';
import axiosClient from '~/api/axiosClient';
import decodePathPoLyline from 'decode-google-map-polyline';

const Map = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [locationShipper, setLocationShipper] = useState();
  const location = useLocation();
  const order = location.state;
  const [routePolyline, setRoutePolyline] = useState([]);
  const MAP_4D_KEY = '228189a4ed4081a07ee7d79b5a51ef82';
  const [origin, setOrigin] = useState(order?.from_address?.address);
  const [destination, setDestination] = useState(order?.to_address?.address);

  // async function calculateRoute() {
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: order?.from_address?.address,
  //     destination: order?.to_address?.address,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   if (!directionsResponse) {
  //     setDirectionsResponse(results);
  //   }
  // }

  // calculateRoute();

  useEffect(() => {
    socketClient.on(order?.id_order + '', (data) => {
      setLocationShipper(data);
    });
    return () => socketClient.off(order?.id_order + '');
  }, []);

  useEffect(() => {
    (async function () {
      if (origin && destination) {
        const resultRoute = await getRouteTwoLocation(origin, destination);
        let routePolyTemp = [];
        if (resultRoute) {
          const listPoly = getPoLylineFromEncode(resultRoute?.result.routes[0].overviewPolyline);
          listPoly?.forEach((el) => {
            routePolyTemp.push({ latitude: el.lat, longitude: el.lng });
          });
          setRoutePolyline(routePolyTemp);
          // zoomMap();
        }
      }
    }).call(this);
  }, []);

  // const zoomMap = () => {
  //   mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
  // };

  const getRouteTwoLocation = async (origin, destination) => {
    const originStr = origin.latitude + ',' + origin.longitude;
    const destinationStr = destination.latitude + ',' + destination.longitude;
    const mode = 'Car';
    const url = `http://api.map4d.vn/sdk/route?key=${MAP_4D_KEY}&origin=${originStr}&destination=${destinationStr}&mode=${mode}&weighting=${0}`;
    const result = await axiosClient.get(url);
    if (result.code === 'ok') {
      return result;
    } else {
      return null;
    }
    // return '123';
  };

  const getPoLylineFromEncode = (path) => {
    return decodePathPoLyline(path);
  };

  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: order?.from_address?.latitude, lng: order?.from_address?.longitude }}
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

        <Polyline coordinates={routePolyline} strokeColor="rgb(0,176,255)" strokeWidth={8} />
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
