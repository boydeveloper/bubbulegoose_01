// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDhwNMEP6SXl-v33SK0wgvuilcNabw3SmI',
  authDomain: 'bubblegooseg.firebaseapp.com',
  projectId: 'bubblegooseg',
  storageBucket: 'bubblegooseg.appspot.com',
  messagingSenderId: '677451245516',
  appId: '1:677451245516:web:49157420aba5c6f1ea1f69',
};

// Initialize Fire
initializeApp(firebaseConfig);
export const db = getFirestore();
