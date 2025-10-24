"use client"

import { AuthProvider, useAuth } from "./context/AuthContext";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          <main className="main-content">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> | <Link href="/posts">Posts</Link> |{" "}
      {user ? (
        <>
          <Link href="/create-post">Create Post</Link> |{" "}
          <span>Hi, {user.name}</span> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link> | <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
