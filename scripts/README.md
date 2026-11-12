# Strumenti di manutenzione

- Su macOS, `./scripts/open-site.command` crea una build aggiornata, avvia la preview su `http://127.0.0.1:4173` e apre il browser. Per modificare il sito con ricarica automatica usa `npm run dev`.
- `node scripts/extract-frame.mjs` rigenera i tre JPG equirettangolari a partire dai video delle scene e la vista prospettica del Batcomputer usata quando WebGL non è disponibile. Richiede FFmpeg con filtro `v360` nel PATH e sovrascrive i quattro JPG in `public/assets/textures/`.

Per avvio, test e rilascio consulta la [guida di sviluppo](../docs/SVILUPPO.md).
