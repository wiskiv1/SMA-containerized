"use client";
/**
 * @author Witse Panneels
 */
import { useEffect, useState, useRef } from "react";
import ObjectInputTable from "../ObjectInputTable";
import { calculatorParamResponse } from "@/src/types/SMA_networking";
import { JsonObject, JsonValue } from "@/src/types/SMA_objects";

export default function ParamSettings() {
  const [parameters, setParameters] = useState<JsonObject>({});
  const [loading, setLoading] = useState(true);
  const newParameters = useRef({} as JsonObject);

  useEffect(() => {
    async function loadParams() {
      const res = await fetch("/api/admin/calculator", { method: "OPTIONS" });
      const body = (await res.json()) as calculatorParamResponse;
      newParameters.current = body.parameters as JsonObject;
      setParameters(body.parameters as JsonObject);
      setLoading(false);
    }
    loadParams();
  }, []);

  function handleSubmit() {
    fetch("/api/admin/calculator", {
      method: "POST",
      body: JSON.stringify(newParameters.current),
    });
  }

  function handleChange(path: string[], value: JsonValue, root: JsonObject) {
    let cursor: JsonObject = root;

    for (let i = 0; i < path.length - 1; i++) {
      if (typeof cursor[path[i]] !== "object" || cursor[path[i]] === null) {
        cursor[path[i]] = {};
      }
      cursor = cursor[path[i]] as JsonObject;
    }

    cursor[path.at(-1)!] = value;
  }

  if (loading) {
    return <p>Loading calculator parameters...</p>;
  }

  return (
    <div id="parameters-form">
      <ObjectInputTable
        name="parameters"
        data={parameters}
        path={[]}
        onChange={(path, value) => handleChange(path, value, newParameters.current)}
      />
      <input
        id="parameters-submit"
        type="submit"
        value="Save Parameters"
        onClick={() => {
          handleSubmit();
        }}
      />
    </div>
  );
}
