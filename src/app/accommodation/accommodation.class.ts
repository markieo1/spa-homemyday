import { BaseModel } from '../shared/base/basemodel.class';

export class Accommodation extends BaseModel {
  name: string;
  description: string;
  maxPersons: number;
  continent: string;
  country: string;
  location: string;
  latitude: string;
  longitude: string;
  rooms: number;
  beds: number;
  recommended: boolean;
  price: string;
  spaceText: string;
  servicesText: string;
  pricesText: string;
  rulesText: string;
  cancellationText: string;

  constructor(json?: any) {
    super(json);
  }
}
