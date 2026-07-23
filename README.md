# virtual-pivot

Clean-room **Virtual Pivot** kutubxonasi — WebDataRocks / Flexmonster uslubidagi pivot jadval, lekin **original vendor kodisiz**.

| Paket | Vazifa |
|-------|--------|
| `@salec/pivot-engine` | Hisoblash yadrosi (aggregate, filter, export) |
| `@salec/pivot-ui` | React UI + **CDN embed** (`new SalecPivot(...)`) |

Muallif / org: [Unknown0223](https://github.com/Unknown0223)

## Masofadan ulash (CDN) — tavsiya etiladi

Original pivotdek: script + CSS, npm shart emas.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.css"
/>
<script src="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.min.js"></script>

<div id="pivot" style="min-height: 480px"></div>
<script>
  const pivot = new SalecPivot({
    container: "#pivot",
    toolbar: true,
    builder: true,
    locale: "uz",
    report: {
      dataSource: {
        data: [
          { Country: "UZ", Category: "A", Price: 1200 },
          { Country: "KZ", Category: "B", Price: 800 }
        ]
      },
      slice: {
        rows: ["Country"],
        columns: ["Category"],
        values: [{ fieldId: "Price", aggregation: "SUM" }]
      }
    }
  });
</script>
```

### API (qisqa)

```js
const pivot = new SalecPivot({ container, toolbar, builder, report, locale });
pivot.updateData(rows);
pivot.setReport({ dataSource: { data }, slice });
pivot.getReport();
pivot.destroy();
```

`fields` berilmasa, qatorlardan avtomatik aniqlanadi.

## npm / React

```bash
npm install
npm run build
```

```tsx
import { PivotApp } from "@salec/pivot-ui";
import "@salec/pivot-ui/style.css";

<PivotApp data={rows} fields={fields} options={{ locale: "uz" }} />
```

## Lokal demo

```bash
npm install
npm run build
npx serve packages/pivot-ui/examples/vanilla
```

## Nima uchun public?

CDN (jsDelivr) va ochiq embed uchun **public** repo qulay. Maxfiy biznes mantiq SALEC Arena da qoladi; bu faqat pivot engine/UI.

## Huquqiy eslatma

Bu loyiha WebDataRocks / Flexmonster **manba kodini** o‘z ichiga olmaydi. Funksional g‘oya (pivot jadval) umumiy; implementatsiya mustaqil (clean-room).
