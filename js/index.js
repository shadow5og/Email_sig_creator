import Official from "./user.js";
import UI from "./ui.js";
import StorageManager from "./storage.js";

const user = new Official(StorageManager.isEmpty()),
  ui = new UI(user),
  storageGuy = new StorageManager(ui);