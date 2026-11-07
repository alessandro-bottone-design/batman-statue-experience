# Batman Statue Experience

**Prototipo interattivo di un'esperienza di acquisto immersiva in modalità desktop**, ideato e progettato da **Alessandro Bottone** su **Figma** (Design System e tavole di prototipo) e implementato mediante **tool di AI Generativa (Antigravity)**.

L'applicazione trasforma il preordine della *Batman Statue* (DC × Sideshow × Queen Studios) in un percorso esperienziale su desktop che integra storytelling interattivo, esplorazione investigativa a 360° della Batcaverna con cinque enigmi del Joker, showreel scrollytelling a 800 fotogrammi e checkout guidato in 4 tappe.

> **Contesto accademico**: progetto realizzato per l'esame di UI/UX Design (*"Realizzazione di un prototipo interattivo di una esperienza di acquisto immersiva in modalità desktop"*, valutazione massima del prototipo: **27/30**). Il flusso di preordine e il checkout sono simulazioni locali del prototipo interattivo: non viene effettuata alcuna transazione reale né trasmissione di dati personali.

- **Consegna Google Classroom**: [https://classroom.google.com/u/1/c/ODA4NDg1NTU3MTQ3/a/Nzk2ODE3Nzk2MTk0/details](https://classroom.google.com/u/1/c/ODA4NDg1NTU3MTQ3/a/Nzk2ODE3Nzk2MTk0/details)
- **Repository GitHub (`main`)**: [https://github.com/alessandro-bottone-design/batman-statue-experience/tree/main](https://github.com/alessandro-bottone-design/batman-statue-experience/tree/main)
- **Dashboard Progetto Vercel**: [https://vercel.com/abd-esign1/batman-statue-experience](https://vercel.com/abd-esign1/batman-statue-experience)
- **Prototipo Web Live (Vercel)**: [https://batman-statue-experience.vercel.app/](https://batman-statue-experience.vercel.app/)
- **Spazio di Progetto ChatGPT**: [https://chatgpt.com/g/g-p-6a15bf741ef08191ab845e2047c91493-sitowebbatmanstatueexperience/project](https://chatgpt.com/g/g-p-6a15bf741ef08191ab845e2047c91493-sitowebbatmanstatueexperience/project)
- **Presentazione Figma Slides**: [https://www.figma.com/slides/lawZFub46cZaRJ38nCZN1q](https://www.figma.com/slides/lawZFub46cZaRJ38nCZN1q)
- **File Figma — Design System (`64:1521`)**: [https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=64-1521&m=dev](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=64-1521&m=dev)
- **File Figma — Tavole di Prototipo (`361:5043`)**: [https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=361-5043&m=dev](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=361-5043&m=dev)

---

## Obiettivi di Progetto e Criteri di Valutazione Accademica

Il prototipo interattivo, sviluppato con **Antigravity** (AI Generativa) in corrispondenza 1:1 con il file Figma, risponde puntualmente ai sette criteri di valutazione del progetto d'esame:

| Criterio di Valutazione | Implementazione nel Prototipo Interattivo |
|---|---|
| **1. Idea Progettuale** | Esperienza d'acquisto immersiva *Tech-Noir* su desktop che unisce gamification investigativa 3D a 360° nella Batcaverna, scrollytelling cinematografico a 800 frame della statua e checkout multi-step. |
| **2. Buyer Personas e Coerenza** | Target collezionisti *high-end* e appassionati DC/Batman su postazione **desktop** (tutelata dal gate `MobileNotice` / `mobile-advisor` sui dispositivi touch). Tono visivo e narrativo coerente dall'interazione col reperto del Joker fino alla conferma ordine. |
| **3. Bias Cognitivi e Coerenza** | • **Scarcity & Urgency**: conto alla rovescia di `03:00` (`Timer`) per disinnescare la minaccia.<br>• **IKEA Effect / Effort Justification**: conquista attiva dell'accesso allo showreel risolvendo i 5 enigmi (*"L'EREDITÀ È TUA"*).<br>• **Goal Gradient Effect**: `progress-bar` indizi (`0/5` → `5/5`) e checkout frazionato in 4 tappe.<br>• **Framing & Anchoring**: valorizzazione museale tramite le `showreel-card` prima dell'ancoraggio di prezzo (`700€` + `50€` spedizione = `750€`). |
| **4. Tecniche di Attenzione e Coerenza** | • **Contrasto selettivo su fondo `#010013`**: accenti semantici Giallo Batman (`#FFD700`) e Viola Joker (`#A64DFF`) con bagliori multi-livello (`glare`).<br>• **Motion & Micro-interazioni**: `batman-loading-animation` con tracciato luminoso e respiro, flip 3D (`rotateY`) su `storytelling-card` e `card`, cursore a pipistrello e `JokerHintSystem` spazializzato.<br>• **Ritmo visivo nello Showreel**: alternanza `destra` → `sinistra` (con traslazione di bilanciamento della statua) → `destra` delle `showreel-card`. |
| **5. Gestione dei Token di Colore** | Mappatura rigorosa 1:1 tra i token Figma (`#010013`, `#FAF9F6`, `#FFD700`, `#A64DFF`) e le variabili CSS globali (`--black`, `--white`, `--yellow`, `--purple`, `--glare-yellow`, `--glare-purple`). |
| **6. Gestione dei Components** | Libreria centralizzata in Figma (`64:1521`) e in `src/components/ui/DesignSystem.tsx`: `button`, `icon-button`, `timer`, `progress-bar`, `logos-navbar`, `navbar`, `input-bar`, `radio-button`, `card`, `storytelling-card`, `tutorial-card`, `showreel-card`, `batman-loading-animation`, `mouse-scroll`. |
| **7. Gestione Istanze nelle Tavole di Prototipo** | Tutte le 14 tavole del prototipo Figma (`361:5043`) istanziano i componenti master senza override arbitrari e sono tracciate nel DOM tramite attributi `data-figma-node`. |

---

## Caratteristiche Tecniche Principali

1. **Ambiente 3D Panorama 360° Chiuso (Three.js)**:
   - Sia durante l'esplorazione investigativa (`GamificationScreen.tsx`) sia nelle schermate con interfaccia utente in overlay (`BatcaveBackdrop.tsx` per Start, Storytelling, Tutorial, Pausa, Esito Missione, Checkout, Thank You, 404), la Batcaverna è proiettata all'interno di una geometria sferica 3D (`SphereGeometry` con `PerspectiveCamera`), preservando le linee prospettiche dell'architettura senza distorsioni equirettangolari 2D.
2. **Design System & Navbar Trasparente**:
   - Navbar (`.ds-navbar`) completamente trasparente a filo superiore (`inset: 0`) con loghi ufficiali `logos-navbar`, HUD di missione e controlli contestuali per ogni schermata.
3. **Sound Design Immersivo Web Audio**:
   - Tema musicale di sottofondo, risata spazializzata del Joker con riverbero procedurale di caverna (attivata allo sblocco del reperto in Storytelling e nei suggerimenti in missione) e feedback sonori sintetizzati.
4. **Showreel Interattivo a 800 Frame**:
   - Sequenza di 800 fotogrammi WebP controllata dallo scorrimento con cache LRU, prefetching concorrente limitato e `showreel-card` alternate.

---

## Avvio Locale

### Prerequisiti
- **Node.js**: versione 22.12+ o 24 LTS.
- **npm**: versione inclusa con Node.js.

### Installazione e avvio del server di sviluppo

```bash
# Installazione pulita e deterministica delle dipendenze
npm ci

# Avvio del server di sviluppo locale su http://127.0.0.1:3000
npm run dev
```

### Build e anteprima di produzione

```bash
# Compilazione dei sorgenti e generazione del pacchetto di produzione
npm run build

# Anteprima locale della build di produzione su http://127.0.0.1:4173
npm run preview
```

> **Nota**: non aprire `dist/index.html` tramite protocollo `file://`. La build utilizza moduli ES e caricamenti dinamici asincroni che richiedono un server HTTP.

### Verifiche di qualità e test

```bash
# Controllo rapido: typecheck TypeScript, lint ESLint, test unitari e build
npm run check

# Build della fixture isolata del Design System
npm run build:ds-fixture

# Suite end-to-end completa con Playwright
npm run test:e2e
```

---

## Mappa delle Cartelle

```
.
├── src/                          # Codice sorgente del prototipo interattivo
│   ├── components/               # Componenti condivisi
│   │   ├── layout/               # Elementi strutturali globali
│   │   │   ├── Navbar.tsx        # Navbar trasparente adattiva per tutte le varianti Figma
│   │   │   └── BatcaveBackdrop.tsx # Ambiente sferico 360° chiuso Three.js per le schermate UI
│   │   └── ui/                   # Token e componenti Design System Figma (64:1521)
│   │       ├── DesignSystem.tsx  # Button, IconButton, Timer, Logos, Cursor, LoadingScreen, MobileNotice
│   │       ├── ErrorBoundary.tsx # Fallback per errori di runtime
│   │       ├── FormInput.tsx     # Input-bar accessibili con stati Figma
│   │       └── PauseOverlay.tsx  # Pause Screen (302:3162)
│   ├── features/                 # Moduli funzionali organizzati per tavola di prototipo (361:5043)
│   │   ├── intro/                # Start, Storytelling e Tutorial a 4 tappe
│   │   │   ├── StartScreen.tsx   # Start Screen (302:3155)
│   │   │   ├── StorytellingScreen.tsx # Storytelling Screen con storytelling-card 3D (353:3406)
│   │   │   └── TutorialScreen.tsx # Tutorial Screen a 4 step (314:2104)
│   │   ├── mission/              # Esplorazione 360° investigativa e transizioni
│   │   │   ├── GamificationScreen.tsx # Gamification Screen 360° con 5 indizi in-world (296:1030)
│   │   │   ├── SkipTransitionScreen.tsx # Skip Transition Screen (359:4034)
│   │   │   ├── JokerCard.tsx     # Componente card 3D fronte/retro con 4 stati risposta (264:1476)
│   │   │   ├── JokerAudioManager.tsx # Audio ambientale risate Joker durante la missione
│   │   │   ├── JokerHintSystem.tsx # Tecnica di attenzione con indizio sonoro/visivo
│   │   │   ├── MouseLookControls.tsx # Controlli panoramica mouse e tastiera
│   │   │   ├── MissionResultScreen.tsx # Win Screen (302:3160) e Lose Screen (302:3161)
│   │   │   └── useJokerHint.ts   # Hook di temporizzazione suggerimenti
│   │   ├── showreel/             # Showreel 800 frame statua (357:3713)
│   │   │   └── ShowreelScreen.tsx # Scrollytelling 800 frame con showreel-card alternate (357:3522)
│   │   ├── checkout/             # Checkout in 4 tappe (315:4645) e Thank You Screen (302:3209)
│   │   │   ├── CheckoutScreen.tsx # Dati personali, Spedizione, Pagamento, Riepilogo (750€)
│   │   │   ├── ThankYouScreen.tsx # Conferma preordine (302:3209)
│   │   │   └── checkoutModel.ts  # Validazione campi e calcolo totale
│   │   └── not-found/            # Error 404 Screen (302:3166)
│   │       └── NotFoundScreen.tsx # Schermata 404 con rientro alla Home
│   ├── hooks/                    # Hook personalizzati (useDesktop, useMissionTimer)
│   ├── lib/                      # State machine (experience.ts) e Web Audio engine (audioManager.ts)
│   ├── index.css                 # Token di colore, tipografia, glare e layout Figma
│   ├── main.tsx                  # Entry point React
│   └── App.tsx                   # Orchestratore principale del prototipo
├── public/                       # Risorse statiche (audio WAV, video MP4, texture 360°, 800 WebP, font)
├── tests/                        # Suite di verifica unitaria, componenti ed E2E Playwright
├── docs/                         # Documentazione unificata e manifest Figma
│   ├── DOCUMENTAZIONE_PROGETTO.md # Documento unico completo (Concept, UX/UI, Token, Components, Istanze, Test, Changelog)
│   └── figma/assets.json         # Manifest di tracciabilità degli asset Figma
└── AGENTS.md                     # Regole operative vincolanti per l'implementazione con Antigravity
```

---

## Documentazione di Approfondimento

- [**Documentazione Completa del Progetto (`docs/DOCUMENTAZIONE_PROGETTO.md`)**](docs/DOCUMENTAZIONE_PROGETTO.md): documento unico e indicizzato che raccoglie Concept Accademico, Idea Progettuale, Buyer Personas, Bias Cognitivi, Tecniche di Attenzione, Token di Colore e Tipografia, Components (`64:1521`), Istanze nelle 14 Tavole di Prototipo (`361:5043`), Architettura 3D 360°, Test Automatizzati e Changelog.
- [**Regole Operative Agenti (`AGENTS.md`)**](AGENTS.md): vincoli architetturali per l'ambiente 3D sferico chiuso a 360° e la trasparenza della navbar.
