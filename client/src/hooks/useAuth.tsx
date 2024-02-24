import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

interface AuthContextType {
  auth: any | null; // Replace `any` with your actual auth state type
  setAuth: (auth: any | null) => void; // Adjust the type accordingly
}
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
