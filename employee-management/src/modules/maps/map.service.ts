import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapService {
  async getLatLng(address: string) {
    try {
      const res = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
        },
      );

      if (res.data.status !== 'OK') {
        throw new Error();
      }

      const loc = res.data.results[0].geometry.location;

      return {
        latitude: loc.lat.toString(),
        longitude: loc.lng.toString(),
      };
    } catch {
      throw new InternalServerErrorException('Google map failed');
    }
  }
}
