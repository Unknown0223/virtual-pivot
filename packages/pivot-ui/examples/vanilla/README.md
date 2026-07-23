# Vanilla / CDN example

WebDataRocks uslubidagi **masofaviy** API — original WDR kodi yo‘q (clean-room).

## 5 daqiqada

```bash
npm run build --workspace=@salec/pivot-engine
npm run build --workspace=@salec/pivot-ui
npx serve packages/pivot-ui/examples/vanilla
```

Brauzerda `new SalecPivot({ container: "#pivot", report: {…} })` ishlaydi.

## HTML (CDN)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.css" />
<script src="https://cdn.jsdelivr.net/gh/Unknown0223/virtual-pivot@main/packages/pivot-ui/dist/cdn/salec-pivot.min.js"></script>
<div id="pivot"></div>
<script>
  new SalecPivot({
    container: "#pivot",
    toolbar: true,
    report: {
      dataSource: { data: [/* rows */] },
      slice: {
        rows: ["Country"],
        values: [{ fieldId: "Price", aggregation: "SUM" }]
      }
    }
  });
</script>
```

Lokal fayllar: `../../dist/cdn/salec-pivot.min.js` + `.css`.
