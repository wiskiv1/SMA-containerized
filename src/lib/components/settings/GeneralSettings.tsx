"use client";
/**
 * @author Witse Panneels
 */
import type { intervalInfo } from "@/src/types/SMA_networking";
import { useEffect, useState } from "react";

export default function GeneralSettings() {
  const [interval, setInter] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setup() {
      const req = await fetch("/api/getInterval");
      const info = (await req.json()) as intervalInfo;
      setInter(info.intervalLength);
      setLoading(false);
    }
    setup();
  }, []);

  function handleInterval() {
    const element = document.getElementById("interval-input") as HTMLInputElement;
    const data = element.value;
    fetch("/api/admin/setInterval", {
      method: "POST",
      body: JSON.stringify({
        interval: Number(data),
      }),
    });
  }

  if (loading) {
    return <p>Loading calculator parameters...</p>;
  }

  return (
    <table className="general-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Save</th>
        </tr>
      </thead>
      <tbody>
        <tr id="Interval">
          <td className="general-name">Interval</td>
          <td>
            <input type="number" id="interval-input" className="general-input-number" defaultValue={interval} />
          </td>
          <td>
            <input
              type="button"
              className="general-button"
              value="save"
              onClick={() => {
                handleInterval();
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
