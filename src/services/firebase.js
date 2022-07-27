import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
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

const fetchVaccinesByName = async (searchTerm) => {
  const vaccines = [];
  const q = query(
    collection(db, "vaccines"),
    where("vaccineName", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((vaccine) => vaccines.push({ ...vaccine.data(), id: vaccine.id }));
  return vaccines;
};

const fetchVaccinesByCode = async (searchTerm) => {
  const vaccines = [];
  const q = query(collection(db, "vaccines"), where("code", "==", searchTerm));
  const rs = await getDocs(q);
  rs.forEach((vaccine) => vaccines.push({ ...vaccine.data(), id: vaccine.id }));
  return vaccines;
};

export const fetchCitizenById = async (citizenId) => {
  const docRef = doc(db, "citizens", citizenId);
  const citizen = await getDoc(docRef);
  if (citizen.exists()) {
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
  return _.unionWith(idResults, firstNameResults, _.isEqual);
};

export const editCitizen = async (citizenId, editedValues) => {
  const citizenRef = doc(db, "citizens", citizenId);
  await setDoc(citizenRef, editedValues, { merge: true });
};

export const deleteCitizen = async (citizenId) => {
  await deleteDoc(doc(db, "citizens", citizenId));
};

export const fetchVaccines = async () => {
  const vaccines = [];
  const rs = await getDocs(collection(db, "vaccines"));
  rs.forEach((vaccine) => {
    vaccines.push({ ...vaccine.data(), id: vaccine.id });
  });
  return vaccines;
};

export const fetchVaccineById = async (citizenId) => {
  const docRef = doc(db, "vaccines", citizenId);
  const vaccine = await getDoc(docRef);
  if (vaccine.exists()) {
    return vaccine.data();
  }
  return null;
};

export const fetchVaccineByNameOrCode = async (searchTerm) => {
  const nameResults = await fetchVaccinesByName(searchTerm);
  const codeResults = await fetchVaccinesByCode(searchTerm);
  return _.unionWith(nameResults, codeResults, _.isEqual);
};

export const addVaccine = async (vaccine) => {
  return await addDoc(collection(db, "vaccines"), vaccine);
};
