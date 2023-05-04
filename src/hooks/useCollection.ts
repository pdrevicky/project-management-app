import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import {
  WhereFilterOp,
  FieldPath,
  OrderByDirection,
  DocumentData,
  Query,
} from "@firebase/firestore-types";

export type Dialog<DataType> = {
  documents?: DataType;
  error?: string;
};

type firebaseQueryType = [string | FieldPath, WhereFilterOp, any];
type firebaseOrderByType = [string | FieldPath, OrderByDirection];

export function useCollection<DataType>({
  collection = "",
  _query = null,
  _orderBy = null,
}: {
  collection?: string;
  _query?: firebaseQueryType | null;
  _orderBy?: firebaseOrderByType | null;
}): Dialog<DataType> {
  type Documents<DataType extends { id: string }> = DataType;

  const [documents, setDocuments] = useState<Documents<any>[]>();
  const [error, setError] = useState("");
  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref: Query<DocumentData> = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results: Documents<{ id: string }>[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError("");
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);
  //@ts-ignore
  return { documents, error };
}
