import { createContext, ReactNode, useState, FunctionComponent } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "@/config/config";

interface AuthContextType {
  auth: any | null; // Replace `any` with your actual auth state type
  setAuth: (auth: any | null) => void; // Adjust the type accordingly
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthContextType["auth"]>(null);

  useEffect(() => {
    const validateSession = async () => {
      try {
        axios
          .get(`${SERVER_URL}/auth/validate-session`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            if (response.data) {
              localStorage.setItem(
                "isAuthenticated",
                response.data.isAuthenticated
              );
              setAuth(response.data.user); // Store user type in local storage
            } else {
              setAuth(null); // Ensure user is null if not authenticated
            }
          })
          .catch((error) => {
            localStorage.setItem("isAuthenticated", "false");
            console.error("Error validating session:", error);
            setAuth(null); // Handle error or failed validation
          });
      } catch (error) {
        console.error("Error validating session:", error);
        setAuth(null); // Handle error or failed validation
      }
    };

    const refreshToken = async () => {
      try {
        // passing refresh token to the backend to get new access token in the header of axios

        const response = await axios.post(
          `${SERVER_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Refresh ${localStorage.getItem("refreshToken")}`,
            },
          }
        );

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("expiresIn", response.data.expiresIn);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }

    const validateAndRefresh = async () => {
      const expiresIn = localStorage.getItem("expiresIn");
      if (expiresIn) {
        const expiryTime = parseInt(expiresIn);
        if (expiryTime - Date.now() < 0) {
          await refreshToken();
        }
      }
      validateSession();
    };


    validateAndRefresh();
    // Define the event listener for localStorage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "accessToken" ||
        event.key === "userType" ||
        event.key === "refreshToken" ||
        event.key === "isAuthenticated"
      ) {
        validateSession(); // Re-validate session if relevant keys changed
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = { auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
