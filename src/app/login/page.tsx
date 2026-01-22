"use client";
/**
 * @author Witse Panneels
 */
import { Suspense } from "react";
import LoginBox from "@/src/lib/components/LoginBox";
import "./page.css";

export const dynamic = "force-dynamic"; // fix useSearchParam build errors

export default function loginPage() {
  return (
    <div id="content">
      <h1>Login</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginBox />
      </Suspense>
    </div>
  );
}
