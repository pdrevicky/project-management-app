import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { Project } from "../types/types";

export const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<Project>();
  const [error, setError] = useState("");

  // realtime data for document - collection is exp. "project"
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          //@ts-ignore
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError("");
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
