import { useReducer, useEffect, useState, Reducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { Project } from "../types/types";

interface FirestoreStateProps {
  document: payloadType;
  isPending: boolean;
  error: payloadType;
  success: boolean;
}

type payloadType = Project | string | undefined;

enum FirestoreReducerEnum {
  IS_PENDING = "IS_PENDING",
  ADDED_DOCUMENT = "ADDED_DOCUMENT",
  DELETED_DOCUMENT = "DELETED_DOCUMENT",
  UPDATED_DOCUMENT = "UPDATED_DOCUMENT",
  ERROR = "ERROR",
}

let initialState: FirestoreStateProps = {
  document: {},
  isPending: false,
  error: "",
  success: false,
};

interface FirestoreReducerAction {
  type: FirestoreReducerEnum;
  payload?: payloadType;
}

const firestoreReducer = (
  state: FirestoreStateProps,
  action: FirestoreReducerAction
) => {
  switch (action.type) {
    case FirestoreReducerEnum.IS_PENDING:
      return { isPending: true, document: {}, success: false, error: "" };
    case FirestoreReducerEnum.ADDED_DOCUMENT:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: "",
      };
    case FirestoreReducerEnum.DELETED_DOCUMENT:
      return { isPending: false, document: {}, success: true, error: "" };
    case FirestoreReducerEnum.UPDATED_DOCUMENT:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: "",
      };
    case FirestoreReducerEnum.ERROR:
      return {
        isPending: false,
        document: {},
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// add, update or delete a document for specific collection
export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action: FirestoreReducerAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc: object) => {
    dispatch({ type: FirestoreReducerEnum.IS_PENDING });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: FirestoreReducerEnum.ADDED_DOCUMENT,
        payload: addedDocument,
      });
    } catch (err: any) {
      dispatchIfNotCancelled({
        type: FirestoreReducerEnum.ERROR,
        payload: err.message,
      });
    }
  };

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: FirestoreReducerEnum.IS_PENDING });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: FirestoreReducerEnum.DELETED_DOCUMENT });
    } catch (err) {
      dispatchIfNotCancelled({
        type: FirestoreReducerEnum.ERROR,
        payload: "could not delete",
      });
    }
  };

  // update a document
  const updateDocument = async (id: string, updates: any) => {
    dispatch({ type: FirestoreReducerEnum.IS_PENDING });

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: FirestoreReducerEnum.UPDATED_DOCUMENT,
      });
      return updatedDocument;
    } catch (error: any) {
      dispatchIfNotCancelled({
        type: FirestoreReducerEnum.ERROR,
        payload: error,
      });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
