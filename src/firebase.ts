import {initializeApp, applicationDefault} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const firebaseApp = initializeApp({
    credential: applicationDefault(),
});

// Initialize Firestore
const db = getFirestore();

export { firebaseApp, db };

