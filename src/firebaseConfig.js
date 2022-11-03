import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVNUkj2z__vhLa_RCpK1aiX7fwOPPAk-A",
  authDomain: "weather-app-d315c.firebaseapp.com",
  databaseURL: "https://weather-app-d315c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weather-app-d315c",
  storageBucket: "weather-app-d315c.appspot.com",
  messagingSenderId: "826014930187",
  appId: "1:826014930187:web:7994800f8a9960f9a23e0e",
  measurementId: "G-NNRZPS4X3K",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export const WriteTownData = (name, userId, lastUpdated, temperature, weather, timezone) => {
  const reference = ref(db, "towns/" + userId + ":" + name);

  set(reference, {
    name: name,
    userId: userId,
    lastUpdated: lastUpdated,
    temperature: temperature,
    weather: weather,
    timezone: timezone,
  });
};

export const DeleteTownData = (name, userId) => {
  remove(ref(db, "towns/" + userId + ":" + name));
};

export const UpdateData = (name, userId, lastUpdated, temperature, weather) => {
  const reference = ref(db, "towns/" + userId + ":" + name);
  update(reference, {
    lastUpdated: lastUpdated,
    temperature: temperature,
    weather: weather,
  });
};

export const auth = getAuth(app);
