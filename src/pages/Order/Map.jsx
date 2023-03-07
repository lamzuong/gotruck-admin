import React from 'react';
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

const Map = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const order = {
    reason_cancel: {
      user_cancel: 'Customer',
      content: 'ffhhhb',
      date_cancel: '2023-03-06T15:45:11.068Z',
    },
    from_address: {
      address: '58/5K Truông Tre, Linh Xuân, Thủ Đức, Bình Dương, Việt Nam',
      latitude: 10.890244509604937,
      longitude: 106.7674527621348,
      name: 'q',
      phone: '0999999999',
    },
    to_address: {
      address: 'RMCQ+72W, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam',
      latitude: 10.820685261169594,
      longitude: 106.68763093650341,
      name: 'aa',
      phone: '0999999999',
    },
    _id: '64060a76a26384136e69b5b3',
    id_order: 'ODR2300001',
    id_customer: '63e1d1112b67035bb9634dae',
    good_type: 'Tổng hợp',
    truck_type: '3',
    payer: 'receive',
    date_create: '2023-03-06T15:44:54.280Z',
    status: 'Đã hủy',
    fee: 20,
    total: 2780000,
    distance: 13.9,
    expectedTime: 26.8,
    note: '',
    list_image_from: [],
    list_image_from_of_shipper: [],
    list_image_to_of_shipper: [],
    createdAt: '2023-03-06T15:44:54.545Z',
    updatedAt: '2023-03-06T15:45:11.069Z',
    __v: 0,
  };

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: order.from_address.address,
      destination: order.to_address.address,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (!directionsResponse) {
      setDirectionsResponse(results);
    }
  }
  calculateRoute();
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: order.from_address.latitude, lng: order.from_address.longitude }}
      >
        <Marker
          title="Vị trí nhận hàng"
          position={{ lat: order.from_address.latitude, lng: order.from_address.longitude }}
        ></Marker>
        <Marker
          title="Vị trí giao hàng"
          position={{ lat: order.to_address.latitude, lng: order.to_address.longitude }}
        >
          {/* <InfoBox options={options}>
            <>
              <div
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  borderRadius: '1em',
                  padding: '0.2em',
                }}
              >
                someone's house
              </div>
            </>
          </InfoBox> */}
        </Marker>
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
