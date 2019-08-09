import * as firebase from "firebase/app";
import 'firebase/firebase-storage';
const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET
} = process.env;


const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);

const uploadImage = (filename, file) => {
	return new Promise((resolve, reject) => {
		const storageRef = firebase.storage().ref();
		const imageRef = storageRef.child(`images/${filename}`);
		imageRef
			.put(file)
			.then(() => imageRef
				.getDownloadURL()
				.then(url => resolve(url)))
			.catch((err) => reject(err));
	});

};


export { uploadImage };
