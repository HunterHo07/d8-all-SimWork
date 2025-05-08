"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

// Create a PocketBase client
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8091");

// Define the auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, passwordConfirm: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if we have a valid auth store
        if (pb.authStore.isValid) {
          setUser(pb.authStore.model);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth error:", err);
        pb.authStore.clear();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Listen for auth state changes
    pb.authStore.onChange((token, model) => {
      setIsAuthenticated(!!token);
      setUser(model);
    });
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);
      setUser(authData.record);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, passwordConfirm: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = {
        email,
        password,
        passwordConfirm,
        name,
      };
      await pb.collection("users").create(data);
      await login(email, password);
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
