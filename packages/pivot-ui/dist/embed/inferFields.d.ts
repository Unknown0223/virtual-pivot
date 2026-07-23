import type { PivotField } from "@salec/pivot-engine";
/** Infer PivotField[] from the first non-empty data rows (WDR-style auto schema). */
export declare function inferFieldsFromData(data: Record<string, unknown>[], sampleSize?: number): PivotField[];
//# sourceMappingURL=inferFields.d.ts.map