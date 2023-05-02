import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { AuthActionTypeEnum } from "../types/types";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError("");
    setIsPending(true);

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // set user online status true
      await projectFirestore
        .collection("users")
        .doc(res.user?.uid)
        .update({ online: true });

      // dispatch login action
      dispatch({ type: AuthActionTypeEnum.LOGIN, payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError("");
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

  return { login, isPending, error };
};
