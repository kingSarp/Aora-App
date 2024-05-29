import { getCurrentUser } from "lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  // userId: string;
  [key: string]: any;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Imagine we are creating a big toy box where we keep all our important toys (data)

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});
// Create a magic key to open the toy box and get the toys (data) inside
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider component that wraps around the part of the app needing access to the toy box
export const GlobalProvider = ({ children }: { children: any }) => {
  // State to track if the user is logged in (is someone playing with the toys)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to store the current user's information (who is playing with the toys)
  // const [user, setUser] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);

  // State to indicate if user data is currently loading (are we looking for someone to play with the toys)
  const [isLoading, setIsLoading] = useState(true);

  // When the app starts, we check who is playing with the toys
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          // If we find someone playing, we update the toy box with their info
          setIsLoggedIn(true);
          setUser(res);
        } else {
          // If no one is found, we clear the toy box

          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        // If something goes wrong, we log the error
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // We share the toy box with all the children components so they can play with the toys inside

    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
