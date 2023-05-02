import { useState, useEffect } from "react";
import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { AuthActionTypeEnum } from "../types/types";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    thumbnail: File | null
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      // - this is path for storage where it is going to be stored
      const uploadPath = `thumbnail/${res.user?.uid}/${thumbnail?.name}`;
      // - in image cosnt is stored response
      const img = await projectStorage.ref(uploadPath).put(thumbnail!);
      // - we are getting imageUrl from storage and is in the imgUrl constant
      const imgUrl = await img.ref.getDownloadURL();
      // add display name to user
      await res.user?.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document-  creating a ref and setting a document
      await projectFirestore
        .collection("users")
        .doc(res.user?.uid)
        .set({ online: true, displayName, photoURL: imgUrl });

      // dispatch login action - update global state
      dispatch({ type: AuthActionTypeEnum.LOGIN, payload: res.user });

      // update local state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
