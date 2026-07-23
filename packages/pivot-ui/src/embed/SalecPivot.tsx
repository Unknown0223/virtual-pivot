import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { PivotConfig, PivotField } from "@salec/pivot-engine";
import { PivotApp, type PivotAppOptions } from "../PivotApp.js";
import { inferFieldsFromData } from "./inferFields.js";

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

function resolveContainer(container: string | HTMLElement): HTMLElement {
  if (typeof container !== "string") return container;
  const el = document.querySelector(container);
  if (!el || !(el instanceof HTMLElement)) {
    throw new Error(`SalecPivot: container not found: ${container}`);
  }
  return el;
}

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
export class SalecPivot {
  static version = "0.2.0";

  private root: Root | null = null;
  private host: HTMLElement;
  private destroyed = false;
  private opts: SalecPivotOptions;
  private data: Record<string, unknown>[];
  private fields: PivotField[];
  private config: Partial<PivotConfig> | undefined;
  private appOptions: PivotAppOptions;

  constructor(options: SalecPivotOptions) {
    this.opts = options;
    this.host = resolveContainer(options.container);
    this.data = options.report?.dataSource?.data ?? options.data ?? [];
    this.fields =
      options.fields ??
      (this.data.length ? inferFieldsFromData(this.data) : []);
    this.config = options.report?.slice;
    this.appOptions = {
      locale: options.locale ?? options.report?.options?.locale ?? "ru",
      theme: options.theme ?? options.report?.options?.theme ?? "default",
      drillThrough:
        options.drillThrough ?? options.report?.options?.drillThrough ?? false,
      useWorker: options.useWorker ?? options.report?.options?.useWorker ?? false,
      ...options.report?.options,
      // Top-level toolbar/builder win over report.options
      showToolbar: options.toolbar !== false,
      showBuilder: options.builder !== false
    };

    this.mount();
    queueMicrotask(() => this.opts.onReady?.());
  }

  private mount() {
    if (this.destroyed) return;
    if (!this.root) {
      this.host.replaceChildren();
      const mountEl = document.createElement("div");
      mountEl.className = "salec-pivot-embed-root";
      mountEl.style.minHeight = "480px";
      this.host.appendChild(mountEl);
      this.root = createRoot(mountEl);
    }
    this.root.render(
      createElement(PivotApp, {
        data: this.data,
        fields: this.fields,
        config: this.config,
        options: this.appOptions,
        onConfigChange: (config: PivotConfig) => {
          this.config = config;
          this.opts.onReportChange?.(this.getReport());
        }
      })
    );
  }

  /** Replace report (data + slice + options), remount UI. */
  setReport(report: SalecPivotReport) {
    if (this.destroyed) return;
    if (report.dataSource?.data) this.data = report.dataSource.data;
    if (report.slice) this.config = report.slice;
    if (report.options) {
      this.appOptions = { ...this.appOptions, ...report.options };
    }
    if (!this.fields.length && this.data.length) {
      this.fields = inferFieldsFromData(this.data);
    }
    this.mount();
  }

  getReport(): SalecPivotReport {
    return {
      dataSource: { data: this.data },
      slice: this.config,
      options: this.appOptions
    };
  }

  /** Swap raw rows (fields kept unless empty). */
  updateData(data: Record<string, unknown>[]) {
    if (this.destroyed) return;
    this.data = data;
    if (!this.fields.length) this.fields = inferFieldsFromData(data);
    this.mount();
  }

  setFields(fields: PivotField[]) {
    if (this.destroyed) return;
    this.fields = fields;
    this.mount();
  }

  refresh() {
    if (this.destroyed) return;
    this.mount();
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.root?.unmount();
    this.root = null;
    this.host.replaceChildren();
  }
}

export default SalecPivot;
