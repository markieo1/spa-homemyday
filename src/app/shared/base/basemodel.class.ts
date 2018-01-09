export abstract class BaseModel {
  /**
    * The id
    */
  public id: string;

  constructor(json?: any) {
    this.loadJson(json);
  }

  /**
    * Loads the json
    * @param json The json to load
    */
  protected loadJson(json?: Object) {
    if (json == null) {
      return;
    }

    for (const prop in json) {
      if (typeof this[prop] === 'string') {
        this[prop] = (json[prop] || '').toString();
      } else if (typeof this[prop] === 'number') {
        if (json[prop] != null) {
          this[prop] = +json[prop];
        }
      } else if (typeof this[prop] === 'boolean') {
        this[prop] = json[prop] === true || (json[prop] || '').toLowerCase() === 'true' || +json[prop] === 1;
      } else if (this[prop] instanceof Date) {
        this[prop] = new Date(json[prop]);
      } else {
        // NOTE: Deserialize the 'default' array's later then array's of specific models!
        this[prop] = json[prop];
      }
    }
  }
}
