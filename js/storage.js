export default class StorageManager {
  #data = JSON.parse(localStorage.getItem("official"));

  constructor(ui) {
    this.#data !== null ? this.retrieve(ui, this.#data) : null;
  }

  static userData() {
    return JSON.parse(localStorage.getItem("official"));
  }

  retrieve(ui, info = this.userData) {
    const inputs = ui.fields;
    let data, input;
    const userData = {};

    for (const key in info) {
      data = {
        name: key,
        value: info[key],
      };

      userData[key] = info[key];

      ui.setField(data);
      // That entire form is just there for show at the moment.
      input = inputs.filter((item) => item.name === key)[0];
      ui.saveToSig(input);
    }

    return userData;
  }

  static store(user) {
    localStorage.setItem("official", JSON.stringify(user));
  }

  static isEmpty() {
    return localStorage.length === 0 ? true : false;
  }
}
