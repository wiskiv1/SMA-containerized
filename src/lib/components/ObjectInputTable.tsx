import { JsonObject, JsonValue } from "@/src/types/SMA_objects";

/**
 * Generic object renderer
 * Renders any nested object without knowing the schema
 */
export default function ObjectInputTable({
  name,
  data,
  path,
  onChange,
}: {
  name: string;
  data: JsonObject;
  path: string[];
  onChange: (path: string[], value: JsonValue) => void;
}) {
  return (
    <table className={`${name}-table`}>
      <tbody>
        {Object.entries(data).map(([key, value]) => {
          const currentPath = [...path, key];
          return (
            <tr key={key}>
              <td className={`${name}-key`}>{key}</td>
              <td className={`${name}-value`}>
                {typeof value === "object" && value !== null ? (
                  <ObjectInputTable name={name} data={value} path={currentPath} onChange={onChange} />
                ) : typeof value === "string" ? (
                  <input
                    type="text"
                    defaultValue={value}
                    className={`${name}-input-text`}
                    onChange={(e) => onChange(currentPath, e.target.value)}
                  />
                ) : typeof value === "number" ? (
                  <input
                    type="number"
                    defaultValue={value}
                    className={`${name}-input-number`}
                    onChange={(e) => onChange(currentPath, Number(e.target.value))}
                  />
                ) : typeof value === "boolean" ? (
                  <input
                    type="checkbox"
                    defaultChecked={value}
                    className={`${name}-input-boolean`}
                    onChange={(e) => onChange(currentPath, e.target.checked)}
                  />
                ) : (
                  String(value)
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
