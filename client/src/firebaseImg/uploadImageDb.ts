// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
   
// const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;
// console.log("firebase", firebaseConfig);
// const firebaseConfig = JSON.parse(fireConfig)

const fireConfig: string = (import.meta.env.VITE_FIREBASE_CONFIG as string);
   const firebaseConfig = JSON.parse(fireConfig);
   console.log(fireConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImageDb = async (files: File[] | null, dir: string): Promise<string[] | null> => {
	if (!files) {
		return null;
	}
    console.log("firebase2", firebaseConfig);
	console.log("files", files, dir)
    const promises = files.map((f) => {
		const imageName = `${Date.parse(new Date().toISOString())}.${f.type.split('/')[1]}`;
		const storageRef = ref(storage, `${dir}/${imageName}`);
		return new Promise<string>(async (resolve, reject) => {
			await uploadBytes(storageRef, f);
			  resolve( await getDownloadURL(storageRef))
		})
	});
console.log("promises", promises);
	const result = await Promise.all(promises);
	console.log("result", result);
	return result;
};
