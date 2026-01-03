/**
 * @author Witse Panneels
 * @date 2026-01-02
 */
import "./page.css";
import { redirect } from "next/navigation";

async function getPartyStatus() {
  // Todo get the status of the party from a database? or file?

  // simple for now
  return "x";
}

export default async function Home() {
  const status = await getPartyStatus();

  switch (status) {
    case "started":
      redirect("/dashboard");
      break;
    case "planned":
      redirect("/countdown");
      break;
  }

  return (
    <div>
      <h1>Stock Market Anywhere</h1>
      <p>
        Welcome, this is the home page! If u see this, no party is currently
        active or scheduled
      </p>
    </div>
  );
}
