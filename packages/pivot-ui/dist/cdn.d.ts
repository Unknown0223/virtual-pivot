/**
 * CDN / remote embed entry.
 *
 * After loading the IIFE bundle (`dist/cdn/salec-pivot.min.js`):
 * ```html
 * <link rel="stylesheet" href="…/salec-pivot.css" />
 * <script src="…/salec-pivot.min.js"></script>
 * <script>
 *   const pivot = new SalecPivot({
 *     container: "#pivot",
 *     toolbar: true,
 *     report: { dataSource: { data: rows } }
 *   });
 * </script>
 * ```
 *
 * ESM consumers: `import { SalecPivot, PivotApp } from '@salec/pivot-ui'`.
 */
import { PivotApp } from "./PivotApp.js";
import { SalecPivot } from "./embed/SalecPivot.js";
import { inferFieldsFromData } from "./embed/inferFields.js";
import { PIVOT_THEMES, HEATMAP_CONDITIONAL_PRESETS } from "./index.js";
import "./pivot-ui.css";
export { SalecPivot, PivotApp, PIVOT_THEMES, HEATMAP_CONDITIONAL_PRESETS, inferFieldsFromData };
export type SalecPivotGlobal = typeof SalecPivot & {
    PivotApp: typeof PivotApp;
    PIVOT_THEMES: typeof PIVOT_THEMES;
    HEATMAP_CONDITIONAL_PRESETS: typeof HEATMAP_CONDITIONAL_PRESETS;
    inferFieldsFromData: typeof inferFieldsFromData;
    version: string;
};
declare global {
    interface Window {
        /** Constructor: `new SalecPivot({ container, report })` */
        SalecPivot: SalecPivotGlobal;
    }
}
//# sourceMappingURL=cdn.d.ts.map