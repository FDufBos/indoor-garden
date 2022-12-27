import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  DocumentReference,
  getDocs,
  query,
  QueryConstraint,
  UpdateData,
  updateDoc} from "firebase/firestore";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import { db } from "@main/utils/firebaseUtils";

export const useFirestoreQuery = <T>(
  collectionSlug: string,
  ...queryConstraints: QueryConstraint[]
): UseQueryResult<T[], Error> => {
  const myQuery = query(collection(db, collectionSlug), ...queryConstraints);
  return useQuery<T[], Error>([collectionSlug, query], () =>
    getDocs(myQuery).then(
      (snapshot) => snapshot.docs.map((doc) => doc.data()) as T[]
    )
  );
};

export const useFirestoreAddMutation = <T>(
  collectionSlug: string
): UseMutationResult<DocumentReference<T>, Error, T> => {
  const queryClient = useQueryClient();

  const myCollection = collection(db, collectionSlug) as CollectionReference<T>;
  return useMutation<DocumentReference<T>, Error, T>(
    (data) => addDoc(myCollection, data),
    {
      onSuccess: () => {
        // Invalidate any queries using this slug, so that they'll reload
        queryClient.invalidateQueries(collectionSlug);
      },
    }
  );
};

/**
 * Only for updating data. Keep in mind, the data has to be in a 'dot' notation
 * like "myParent.myKey" not {myParent: { myKey : 'blah' }}
 *
 * @param collectionSlug - The collection slug
 * @param documentRef - the firestore document to update
 * @returns React Query UseMutationResult
 */
export const useFirestoreUpdateMutation = <T>(
  collectionSlug: string,
  documentRef: DocumentReference<T>
): UseMutationResult<void, Error, UpdateData<T>> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateData<T>>(
    (data) => updateDoc(documentRef, data),
    {
      onSuccess: () => {
        // Invalidate any queries using this slug, so that they'll reload
        queryClient.invalidateQueries(collectionSlug);
      },
    }
  );
};


export const useFirestoreDeleteMutation = <T>(
  collectionSlug: string,
  documentRef: DocumentReference<T>
): UseMutationResult<void, Error, UpdateData<T>> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateData<T>>(
    () => deleteDoc(documentRef),
    {
      onSuccess: () => {
        // Invalidate any queries using this slug, so that they'll reload
        queryClient.invalidateQueries(collectionSlug);
      },
    }
  );
}

