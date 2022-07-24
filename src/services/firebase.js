import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import _ from "lodash";

import { db } from "../firebase";

const fetchCitizensById = async (searchTerm) => {
  const citizens = [];
  const q = query(
    collection(db, "citizens"),
    where("idNumber", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((citizen) => citizens.push({ ...citizen.data(), id: citizen.id }));
  return citizens;
};

const fetchCitizensByFirstName = async (searchTerm) => {
  const citizens = [];
  const q = query(
    collection(db, "citizens"),
    where("firstName", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((citizen) => citizens.push({ ...citizen.data(), id: citizen.id }));
  return citizens;
};

export const fetchCitizenById = async (citizenId) => {
  const docRef = doc(db, "citizens", citizenId);
  const citizen = await getDocs(docRef);
  if (citizen.exists()) {
    console.log(citizen.data());
    return citizen.data();
  }
  return null;
};

export const addCitizen = async (citizen) => {
  return await addDoc(collection(db, "citizens"), citizen);
};

export const fetchCitizens = async () => {
  const citizens = [];
  const rs = await getDocs(collection(db, "citizens"));
  rs.forEach((citizen) => {
    citizens.push({ ...citizen.data(), id: citizen.id });
  });
  return citizens;
};

export const fetchCitizensByIdOrName = async (searchTerm) => {
  const idResults = await fetchCitizensById(searchTerm);
  const firstNameResults = await fetchCitizensByFirstName(searchTerm);
  const results = _.unionWith(idResults, firstNameResults, _.isEqual);
  return results;
};

export const deleteCitizen = async (citizenId) => {
  await deleteDoc(doc(db, "citizens", citizenId));
};
