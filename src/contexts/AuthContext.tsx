import { createContext, ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { firebase, auth } from "services/firebase";

type User = {
  id: string;
  name: string;
  avatar_url: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithGoogleAndCreateARoom: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar_url: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar_url: photoURL,
      });
    }
  }

  async function signInWithGoogleAndCreateARoom() {
    try {
      await signInWithGoogle();
      history.push("rooms/create");
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    await auth
      .signOut()
      .then(() => {
        setUser(undefined);
        history.push("/");
      })
      .catch((error) => {
        throw new Error(error?.message);
      })
      .finally(() => {});
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithGoogleAndCreateARoom,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
