import StorageManager from "./storage.js";

export default class Official {
  constructor(isEmpty) {
    !isEmpty ? this.init(StorageManager.userData()) : null;
  }

  changeInfo(key, value) {
    this[key] = value;

    StorageManager.store(this);
  }

  init(data) {
    Object.assign(this, data); // Literally copying data from local storage to the official object.

    console.log("User has been initialized.");
  }
}
