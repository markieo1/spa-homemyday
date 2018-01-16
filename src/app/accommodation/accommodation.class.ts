import { BaseModel } from '../shared/base/basemodel.class';

export enum ApproveStatus {
  Awaiting = 'Awaiting',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

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
  price: number;
  spaceText: string;
  servicesText: string;
  pricesText: string;
  rulesText: string;
  cancellationText: string;
  approveStatus: {
    status: ApproveStatus;
    reason: string;
  };

  constructor(json?: any) {
    super(json);
  }
}
