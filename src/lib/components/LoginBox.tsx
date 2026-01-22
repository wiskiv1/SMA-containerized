"use client";
/**
 * @author Witse Panneels
 */
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginBox() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  console.log(callback);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      username,
      password,
      callbackUrl: callback ? callback : "/admin",
    });
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <form id="form_container" onSubmit={session ? handleLogout : handleLogin}>
      <div id="input_container">
        {status === "loading" ? (
          <h2>Loading</h2>
        ) : session ? (
          <>
            <h3>logged in as:</h3>
            <h2>{session.user.name}</h2>
          </>
        ) : (
          <>
            <h2>Username</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <h2>Password</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </>
        )}
      </div>
      <button id="submitButton" type="submit">
        {session ? "Sign Out" : "Sign in"}
      </button>
    </form>
  );
}
