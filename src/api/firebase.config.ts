import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

//données de la base de données
const firebaseConfig = {
	apiKey: "AIzaSyB_vFkg8eJqMkp8yUf3Zby_eR6bicC8fec",
	authDomain: "fair-myth-353318.firebaseapp.com",
	projectId: "fair-myth-353318",
	storageBucket: "fair-myth-353318.appspot.com",
	messagingSenderId: "307184120760",
	appId: "1:307184120760:web:9a854e238edee8dbb6554d"
};

//connexion à la base de données
const app = initializeApp(firebaseConfig);

//exportez la variable db pour l'utiliser dans d'autres fichiers.
export const db = getFirestore(app)