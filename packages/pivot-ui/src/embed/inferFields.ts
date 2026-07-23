import type { DataType, PivotField } from "@salec/pivot-engine";

function inferDataType(value: unknown): DataType {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number" && Number.isFinite(value)) return "number";
  if (value instanceof Date) return "date";
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed) || !Number.isNaN(Date.parse(trimmed))) {
      const asNum = Number(trimmed);
      if (!Number.isFinite(asNum)) return "date";
    }
    const n = Number(trimmed.replace(/\s/g, "").replace(",", "."));
    if (trimmed !== "" && Number.isFinite(n)) return "number";
  }
  return "string";
}

/** Infer PivotField[] from the first non-empty data rows (WDR-style auto schema). */
export function inferFieldsFromData(
  data: Record<string, unknown>[],
  sampleSize = 50
): PivotField[] {
  if (!data.length) return [];
  const keys = new Set<string>();
  const sample = data.slice(0, sampleSize);
  for (const row of sample) {
    for (const key of Object.keys(row)) keys.add(key);
  }

  return [...keys].map((id) => {
    let dataType: DataType = "string";
    for (const row of sample) {
      const v = row[id];
      if (v == null || v === "") continue;
      dataType = inferDataType(v);
      break;
    }
    return { id, label: id, dataType };
  });
}
