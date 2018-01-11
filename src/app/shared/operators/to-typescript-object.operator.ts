import { Observable } from 'rxjs/Observable';
import { BaseModel } from '../base/basemodel.class';
import { INewable } from '../interfaces/inewable.interface';

function arrayToTypescriptObject<T extends any, R extends BaseModel>(this: Observable<T[]>, resultingObject: INewable<R>): Observable<R[]> {
  return this
    .flatMap(v => v)
    .map(r => new resultingObject(r))
    .toArray();
}

// Add the operator to the Observable prototype:
Observable.prototype.arrayToTypescriptObject = arrayToTypescriptObject;

declare module 'rxjs/Observable' {
  // tslint:disable-next-line:no-shadowed-variable
  interface Observable<T> {
    /**
     * Converts an array to an array of a typescript object
     */
    arrayToTypescriptObject: typeof arrayToTypescriptObject;
  }
}
