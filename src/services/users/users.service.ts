import { GreenevilleBJJUser } from "@/types/users.types";
import { readDocBy, updateDocById } from "../api.service";
import { firestore } from "@/contexts/auth/auth.context";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export const getAllMembers = async () => {
  const col = collection(firestore, "members");
  const snapshot = await getDocs(col);
  const data = snapshot.docs.map((d) => ({
    ...(d.data() as GreenevilleBJJUser),
    id: d.id,
  }));
  return data;
};

export const getMemberById = async (
  memberId: string
): Promise<{ id: string; [key: string]: any } | null> => {
  const memberRef = doc(firestore, "members", memberId);

  try {
    const snap = await getDoc(memberRef);
    if (!snap.exists()) {
      console.warn(`No member found with ID ${memberId}`);
      return null;
    }

    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("Error fetching member:", err);
    throw err;
  }
};

export const updateMemberById = async (
  memberId: string,
  data: Partial<GreenevilleBJJUser>
) => {
  await updateDocById("members", memberId, data);
};

export const getUserByPhoneNumber = async (
  phoneNumber: string
): Promise<GreenevilleBJJUser[] | null> => {
  return await readDocBy("members", "phone", phoneNumber);
};

export const getCheckInsMonthToDate = async (userId: string) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("checkedAt", ">=", startOfMonth),
    where("checkedAt", "<=", now),
    orderBy("checkedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getLastMonthCheckIns = async (userId: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastMonth = month === 0 ? 11 : month - 1;
  const lastMonthYear = month === 0 ? year - 1 : year;

  const start = new Date(lastMonthYear, lastMonth, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("checkedAt", ">=", start),
    where("checkedAt", "<=", end),
    orderBy("checkedAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getMostRecentCheckIn = async (userId: string): Promise<any> => {
  const checkinsCol = collection(firestore, "members", userId, "checkins");

  const q = query(checkinsCol, orderBy("checkedAt", "desc"), limit(1));

  const snap = await getDocs(q);

  if (snap.empty) {
    console.log("No check-ins found for member", userId);
    return null;
  }

  const doc = snap.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const getCheckInsByRank = async (
  userId: string,
  belt: string,
  stripes: number
) => {
  const checkinsCol = collection(firestore, "members", userId, "checkins");
  const q = query(
    checkinsCol,
    where("belt", "==", belt),
    where("stripes", "==", stripes)
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteMemberById = async (userId: string) => {
  try {
    const memberRef = doc(firestore, "members", userId);
    await deleteDoc(memberRef);
    console.log(`Member ${userId} successfully deleted.`);
  } catch (error) {
    console.error(`Error deleting member ${userId}:`, error);
    throw error;
  }
};
