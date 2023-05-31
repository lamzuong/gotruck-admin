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
  const [directionsResponseShipper, setDirectionsResponseShipper] = useState(null);
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
    if (results) {
      setDirectionsResponse(results);
    }
  };

  function chunkArray(myArray, chunk_size) {
    let i = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    for (i = 0; i < arrayLength; i += chunk_size) {
      let myChunk = myArray.slice(i, i + chunk_size);
      if (i != 0) {
        myChunk.unshift(myArray[i - 1]);
      }
      tempArray.push(myChunk);
    }
    return tempArray;
  }

  const getRouteManyLocation = async (origin, destination, waypointsList) => {
    let points = [];
    if (waypointsList.length > 0) {
      waypointsList.map((item) => {
        points.push({ location: item.latitude + ',' + item.longitude });
      });
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: origin.latitude, lng: origin.longitude },
      destination: { lat: destination.latitude, lng: destination.longitude },
      waypoints: points,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    return results;
  };

  const getShipperRoute = async () => {
    const resOrder = await axiosClient.get('order/order/' + order._id);
    if (resOrder.shipper_route?.length > 1) {
      let result = chunkArray(resOrder.shipper_route, 7);
      let routePolyTemp = [];
      for (let i = 0; i < result.length; i++) {
        const resultRoute = await getRouteManyLocation(
          result[i][0],
          result[i][result[i].length - 1],
          result[i],
        );
        routePolyTemp.push(resultRoute);
      }
      if (routePolyTemp !== directionsResponseShipper)
        setDirectionsResponseShipper([...routePolyTemp]);
    }
  };

  const getLocationShipper = async () => {
    const resShp = await axiosClient.get('order/shipper/' + order.shipper.id_shipper._id);
    if (resShp && resShp.current_address) {
      setLocationShipper(resShp.current_address);
    }
  };

  useEffect(() => {
    getShipperRoute();
    getLocationShipper();
    calculateRoute();
  }, []);

  useEffect(() => {
    const timeId = setInterval(async () => {
      getLocationShipper();
      getShipperRoute();
    }, 10000);
    return () => {
      clearInterval(timeId);
    };
  }, [order.shipper.id_shipper._id]);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: order?.from_address?.latitude, lng: order?.from_address?.longitude }}
    >
      {locationShipper && (
        <Marker
          title="Vị trí tài xế"
          position={{ lat: locationShipper.latitude, lng: locationShipper.longitude }}
          icon={require('../../assets/images/truck.png')}
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
      {directionsResponseShipper &&
        directionsResponseShipper.length > 0 &&
        directionsResponseShipper.map((item) => {
          return (
            <DirectionsRenderer
              options={{
                polylineOptions: {
                  strokeColor: 'rgb(0,0,0,0.5)',
                },
              }}
              directions={item}
            />
          );
        })}
      {directionsResponse && (
        <DirectionsRenderer
          options={{
            polylineOptions: {
              strokeColor: 'rgb(0,176,255)',
              strokeWeight: 5,
            },
          }}
          directions={directionsResponse}
        />
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
