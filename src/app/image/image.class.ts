import { BaseModel } from '../shared/base/basemodel.class';

export class Image extends BaseModel {
  uuid: string;
  filename: string;
  fileSize: number;
  title: string;

  constructor(json?: any) {
    super(json);
  }
}
