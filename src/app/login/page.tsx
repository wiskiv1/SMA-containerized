"use client";

import { signIn } from "next-auth/react";
import { NextRequest } from "next/server";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import "./page.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  console.log(callback);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      callbackUrl: callback ? callback : "/admin",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign in</button>
    </form>
  );
}
