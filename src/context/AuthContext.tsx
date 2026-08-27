"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  UserRecord,
  LicenceRecord,
  ApplicationRecord,
} from "@/server/db";

export interface AuthContextType {
  user: UserRecord | null;
  licence: LicenceRecord | null;
  activeApplication: ApplicationRecord | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (identifier: string, otp?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  switchDemoUser: (targetDl: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [licence, setLicence] = useState<LicenceRecord | null>(null);
  const [activeApplication, setActiveApplication] = useState<ApplicationRecord | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setLicence(data.licence || null);
        setActiveApplication(data.activeApplication || null);
        setIsAuthenticated(data.authenticated || false);
      }
    } catch (err) {
      console.error("Failed to load session:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async (identifier: string, otp = "123456"): Promise<boolean> => {
    try {
      setError(null);
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        return false;
      }

      setUser(data.user);
      setLicence(data.licence);
      setActiveApplication(data.activeApplication);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError("Network error during login.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setLicence(null);
      setActiveApplication(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const switchDemoUser = async (targetDl: string): Promise<boolean> => {
    return login(targetDl, "123456");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        licence,
        activeApplication,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        refresh: fetchSession,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
