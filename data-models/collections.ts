import { collection, CollectionReference } from "firebase/firestore";

import { Plant, User } from "@main/common-types";
import { db } from "@main/utils/firebaseUtils";

/**
 * Used to add typescript types to firestore queries
 *
 * @returns toFirestore and fromFirestore converter functions
 */
export const converter = <T>(): {
  /** toFirestore */
  toFirestore: (data: T) => T /** */;
  /** fromFirestore */
  fromFirestore: (snap: any) => T;
} => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: any) => snap.data() as T,
});

export const usersCollection = collection(db, "users").withConverter(
  converter<User>()
);

export const plantsCollection = collection(db, "plants").withConverter(
  converter<Plant>()
);

export const getGardenCollection = (user: string): CollectionReference<Plant> =>
  collection(db, `users/${user}/garden`).withConverter(converter<Plant>());
