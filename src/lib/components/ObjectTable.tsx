/**
 * Generic object renderer
 * Renders any nested object without knowing the schema
 */
export default function ObjectTable({ name, data }: { name: string; data: Record<string, never> }) {
  return (
    <table className={`${name}-table`}>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className={`${name}-key`}>{key}</td>
            <td className={`${name}-value`}>
              {typeof value === "object" && value !== null ? <ObjectTable name={name} data={value} /> : String(value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
