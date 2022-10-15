import {
  collection,
  CollectionReference,
  DocumentReference,
  getDocs,
  query,
  QueryConstraint,
} from "firebase/firestore";
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

export const useFirestoreMutation = <T>(
  collectionSlug: string,
  operation: <T>(
    reference: CollectionReference<T>,
    data: T
  ) => Promise<DocumentReference<T>>
): UseMutationResult<DocumentReference<T>, Error, T> => {
  const queryClient = useQueryClient();

  const myCollection = collection(db, collectionSlug) as CollectionReference<T>;
  return useMutation<DocumentReference<T>, Error, T>(
    (data) => operation(myCollection, data),
    {
      onSuccess: () => {
        // Invalidate any queries using this slug, so that they'll reload
        queryClient.invalidateQueries(collectionSlug);
      },
    }
  );
};
