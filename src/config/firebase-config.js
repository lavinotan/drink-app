import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXkXwXbt9Tp23b1jdBpbevKw0jRoyhTdw",

  authDomain: "drinkapp-eb423.firebaseapp.com",

  databaseURL: "https://drinkapp-eb423-default-rtdb.firebaseio.com",

  projectId: "drinkapp-eb423",

  storageBucket: "drinkapp-eb423.appspot.com",

  messagingSenderId: "419596047718",

  appId: "1:419596047718:web:504fd198a7143bcbd5a4a7",
};

const app = initializeApp(firebaseConfig);

export default app;
