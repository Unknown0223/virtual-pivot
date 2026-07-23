import type { PivotConfig, PivotField } from "@salec/pivot-engine";
import { type PivotAppOptions } from "../PivotApp.js";
/** Report payload — similar shape to WDR `report`, clean-room API (not WDR source). */
export type SalecPivotReport = {
    dataSource?: {
        data?: Record<string, unknown>[];
    };
    /** Pivot slice / config (rows, columns, values, filters, …) */
    slice?: Partial<PivotConfig>;
    options?: PivotAppOptions;
};
export type SalecPivotOptions = {
    /** CSS selector or HTMLElement — same idea as WDR `container` */
    container: string | HTMLElement;
    /** Show toolbar (export, expand, …). Default true. */
    toolbar?: boolean;
    /** Show field builder panel. Default true. */
    builder?: boolean;
    data?: Record<string, unknown>[];
    fields?: PivotField[];
    report?: SalecPivotReport;
    locale?: "ru" | "uz";
    theme?: PivotAppOptions["theme"];
    drillThrough?: boolean;
    useWorker?: boolean;
    onReportChange?: (report: SalecPivotReport) => void;
    onReady?: () => void;
};
/**
 * Imperative embed API — use from CDN/script tags like classic pivot embeds:
 *
 * ```js
 * const pivot = new SalecPivot({
 *   container: "#pivot",
 *   toolbar: true,
 *   report: {
 *     dataSource: { data: rows },
 *     slice: { rows: ["Country"], values: [{ fieldId: "Price", aggregation: "SUM" }] }
 *   }
 * });
 * ```
 */
export declare class SalecPivot {
    static version: string;
    private root;
    private host;
    private destroyed;
    private opts;
    private data;
    private fields;
    private config;
    private appOptions;
    constructor(options: SalecPivotOptions);
    private mount;
    /** Replace report (data + slice + options), remount UI. */
    setReport(report: SalecPivotReport): void;
    getReport(): SalecPivotReport;
    /** Swap raw rows (fields kept unless empty). */
    updateData(data: Record<string, unknown>[]): void;
    setFields(fields: PivotField[]): void;
    refresh(): void;
    destroy(): void;
}
export default SalecPivot;
//# sourceMappingURL=SalecPivot.d.ts.map