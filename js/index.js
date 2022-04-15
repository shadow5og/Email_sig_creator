import Official from "./user.js";
import UI from "./ui.js";
import StorageManager from "./storage.js";

const user = new Official(StorageManager.isEmpty()),
  ui = new UI(user),
  storageGuy = new StorageManager(ui);

export { ui, storageGuy };
export default user;

// Getting all text and email inputs, adding event listeners to all of them and saving data to local storage, i.e,
// data is saved within the device that the user is using.

// inputs = Array.from(inputs);

// inputs.push(document.querySelector('input[type="email"]')); Removing it since I don't care about it.

// const collection = document.body.children;
// items = Array.from(collection);
// items.array.forEach(element => {
//   element.classList.add()
// });
