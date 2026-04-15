import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

// Note: In a real app, these would come from firebase-applet-config.json
// For this environment, we'll use placeholders that the user can fill or 
// that might be injected if set_up_firebase succeeded partially.
const firebaseConfig = {
  apiKey: "AIzaSy...", // Placeholder
  authDomain: "ringbelt-agents.firebaseapp.com",
  projectId: "ringbelt-agents",
  storageBucket: "ringbelt-agents.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
  signOut,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
};
