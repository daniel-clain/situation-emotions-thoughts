import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCMuZLmlTZ8LHjHh39kW9Djkv5ulO6vRok",
  authDomain: "situation-emotions-thoughts.firebaseapp.com",
  projectId: "situation-emotions-thoughts",
  storageBucket: "situation-emotions-thoughts.appspot.com",
  messagingSenderId: "247590516509",
  appId: "1:247590516509:web:2ea07ad52e126204f8d3f4"
};

initializeApp(firebaseConfig);

export const firestore = getFirestore()

export const usersCol = collection(firestore, 'Users')