import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyDiZE747uS2t9AGiCRBlkwFeW9SHda_HUE',
  authDomain: 'kltn-5be2b.firebaseapp.com',
  projectId: 'kltn-5be2b',
  storageBucket: 'kltn-5be2b.appspot.com',
  messagingSenderId: '910099169111',
  appId: '1:910099169111:web:3c5abbaf48d4faacf0c812',
  measurementId: 'G-ECRK2WNTHH',
});
// Firebase storage reference
const storage = getStorage(app);
export default storage;
