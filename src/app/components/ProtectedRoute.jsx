"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";



export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);


  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <p>Checking authentication...</p>
      </div>
    );
  }


  if (!user) return null;


  return <>{children}</>;
}
