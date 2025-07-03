import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { GreenevilleBJJObject } from "@/types/base.types";
import { firestore } from "@/contexts/auth/auth.context";

export const postDoc = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  const ref = collection(firestore, collectionName);
  const docRef = await addDoc(ref, data);
  return { id: docRef.id };
};

export const readDoc = async <T = DocumentData>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const ref = doc(firestore, collectionName, id);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as T) : null;
};

export const readDocBy = async (
  collectionName: string,
  key: string,
  value: string
): Promise<GreenevilleBJJObject> => {
  const coll = collection(firestore, collectionName);
  const q = query(coll, where(key, "==", value));
  try {
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log(value);
      return null;
    }

    const doc = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Found member(s):", doc);
    return doc;
  } catch (err) {
    console.error("Error fetching member:", err);
    throw err;
  }
};

export const updateDocById = async (
  collectionName: string,
  id: string,
  data: Partial<GreenevilleBJJObject>
) => {
  const collectionRef = collection(firestore, collectionName);
  const docRef = doc(collectionRef, id);
  await updateDoc(docRef, data);
};

export const deleteDocById = async (collectionName: string, id: string) => {
  const ref = doc(firestore, collectionName, id);
  await deleteDoc(ref);
};
