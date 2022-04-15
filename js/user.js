import StorageManager from "./storage.js";

export default class Official {
  constructor(isEmpty) {
    !isEmpty ? this.init(StorageManager.userData(), this) : null;
  }

  changeInfo(key, value) {
    this[key] = value;

    StorageManager.store(this);
  }

  init(data, user) {
    for (let key in data) {
      user[key] = data[key];
    }

    console.log("User has been initialized.");
  }
}
