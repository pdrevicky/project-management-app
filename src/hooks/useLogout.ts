import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { AuthActionTypeEnum } from "../types/types";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError("");
    setIsPending(true);

    // sign the user out
    try {
      // update online status
      const { uid } = user!;
      await projectFirestore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: AuthActionTypeEnum.LOGOUT, payload: null });

      // update state
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

  return { logout, error, isPending };
};
