# @salec/pivot-ui

Embeddable React pivot UI — clean-room WebDataRocks-style pivot (original WDR source yo‘q).

## Install (npm / workspace)

```bash
npm install @salec/pivot-engine @salec/pivot-ui
```

```tsx
import { PivotApp } from "@salec/pivot-ui";
import "@salec/pivot-ui/style.css";

<PivotApp data={rows} fields={fields} options={{ locale: "uz" }} />
```

## Masofaviy CDN (original pivotdek)

Bitta script — React ichida bundled. Brauzerda:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.css" />
<script src="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.min.js"></script>
<div id="pivot" style="min-height:480px"></div>
<script>
  const pivot = new SalecPivot({
    container: "#pivot",
    toolbar: true,
    builder: true,
    locale: "uz",
    report: {
      dataSource: { data: [/* { Country, Price, ... } */] },
      slice: {
        rows: ["Country"],
        values: [{ fieldId: "Price", aggregation: "SUM" }]
      }
    }
  });
  // pivot.updateData(rows); pivot.getReport(); pivot.destroy();
</script>
```

`fields` berilmasa, data dan avtomatik infer qilinadi.

## Exports

- `SalecPivot` — imperative CDN/embed API
- `PivotApp` — full React shell
- `PivotTable`, `PivotBuilder`, `PivotToolbar`, `PivotChart`, `PivotDrillThrough`
- `usePivot`, `usePivotExport`
- `PIVOT_THEMES`, `HEATMAP_CONDITIONAL_PRESETS`

## Build

```bash
npm run build --workspace=@salec/pivot-ui
# → dist/ (ESM/CJS) + dist/cdn/salec-pivot.min.js + salec-pivot.css
```

## Demo

```bash
npm run pivot-demo
# yoki
npx serve packages/pivot-ui/examples/vanilla
```
