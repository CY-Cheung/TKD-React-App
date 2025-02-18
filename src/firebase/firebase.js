import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWmDDr3A7r0Jg1bxh-XjHjAkM_RCdlHQk",
    authDomain: "tkd-react-app.firebaseapp.com",
    projectId: "tkd-react-app",
    storageBucket: "tkd-react-app.firebasestorage.app",
    messagingSenderId: "131767355176",
    appId: "1:131767355176:web:4955187fe336e69f7bf21d",
    measurementId: "G-TNYHYGHZ8C"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };