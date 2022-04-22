export default class StorageManager {
  static data = JSON.parse(localStorage.getItem("official"));

  constructor(ui) {
    this.data !== null ? this.retrieve(ui) : null;
  }

  static userData() {
    return this.data;
  }

  retrieve(ui, info = StorageManager.userData()) {
    const inputs = ui.fields;
    let input = 0;

    for (const key in info) {
      ui.setField({
        name: key,
        value: info[key]
      });

      // That entire form is just there for show at the moment.
      input = inputs.find((item) => item.name === key);
      ui.saveToSig(input);
    }
  }

  static store(user) {
    localStorage.setItem("official", JSON.stringify(user));
  }

  static isEmpty() {
    return localStorage.length === 0 ? true : false;
  }
}
