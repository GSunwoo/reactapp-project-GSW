import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
  databaseURL: import.meta.env.VITE_databaseURL
};

// firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
// firestore를 위한 객체 생성
const firestore = getFirestore(app);
const realtime = getDatabase(app);
const storage = getStorage(app, 'gs://myreactapp-94a38.firebasestorage.app');
// 익스포트(내보내기)
export {firestore, realtime, storage};