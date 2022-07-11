import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";

export const addCitizen = async (citizen) => {
  return await addDoc(collection(db, "citizens"), citizen);
};

export const fetchCitizens = async () => {
  const citizens = [];
  const rs = await getDocs(collection(db, "citizens"));
  rs.forEach((citizen) => citizens.push(citizen.data()));
  return citizens;
};
