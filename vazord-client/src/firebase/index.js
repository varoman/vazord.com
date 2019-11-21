import * as firebase from "firebase/app";
import 'firebase/firebase-storage';

/*
const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET
} = process.env;

*/

const firebaseConfig = {
	apiKey: 'AIzaSyBKvjtlb128cgaTHo6Xrzdp3meRnReHT3o',
	authDomain: 'vazord-39a84.firebaseapp.com',
	projectId: 'vazord-39a84',
	storageBucket: 'vazord-39a84.appspot.com',
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
