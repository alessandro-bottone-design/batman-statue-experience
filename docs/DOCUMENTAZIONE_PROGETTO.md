# Documentazione Completa del Progetto — Batman Statue Experience

**Autore del Progetto e Design System**: Alessandro Bottone  
**Traccia Accademica**: *"Realizzazione di un prototipo interattivo di una esperienza di acquisto immersiva in modalità desktop"*  
**Strumenti di Progettazione e Sviluppo**: **Figma** (Design System e Prototipo) + **Antigravity** (Tool di AI Generativa per l'implementazione del prototipo interattivo, valutazione massima del prototipo: **27/30**)  

### Link Ufficiali del Progetto

- **Consegna Google Classroom**: [https://classroom.google.com/u/1/c/ODA4NDg1NTU3MTQ3/a/Nzk2ODE3Nzk2MTk0/details](https://classroom.google.com/u/1/c/ODA4NDg1NTU3MTQ3/a/Nzk2ODE3Nzk2MTk0/details)
- **Repository GitHub (`main`)**: [https://github.com/alessandro-bottone-design/batman-statue-experience/tree/main](https://github.com/alessandro-bottone-design/batman-statue-experience/tree/main)
- **Dashboard Progetto Vercel**: [https://vercel.com/abd-esign1/batman-statue-experience](https://vercel.com/abd-esign1/batman-statue-experience)
- **Prototipo Web Live (Vercel)**: [https://batman-statue-experience.vercel.app/](https://batman-statue-experience.vercel.app/)
- **Spazio di Progetto ChatGPT**: [https://chatgpt.com/g/g-p-6a15bf741ef08191ab845e2047c91493-sitowebbatmanstatueexperience/project](https://chatgpt.com/g/g-p-6a15bf741ef08191ab845e2047c91493-sitowebbatmanstatueexperience/project)
- **Presentazione Figma Slides**: [https://www.figma.com/slides/lawZFub46cZaRJ38nCZN1q](https://www.figma.com/slides/lawZFub46cZaRJ38nCZN1q)
- **Figma — Design System (`64:1521`)**: [https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=64-1521&m=dev](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=64-1521&m=dev)
- **Figma — Tavole di Prototipo (`361:5043`)**: [https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=361-5043&m=dev](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=361-5043&m=dev)

---

## Indice

1. [Concept Accademico e Obiettivi del Progetto](#1-concept-accademico-e-obiettivi-del-progetto)
2. [Idea Progettuale](#2-idea-progettuale)
3. [Definizione Buyer Personas e Coerenza in Fase di Realizzazione](#3-definizione-buyer-personas-e-coerenza-in-fase-di-realizzazione)
4. [Definizione Bias Cognitivi e Coerenza in Fase di Realizzazione](#4-definizione-bias-cognitivi-e-coerenza-in-fase-di-realizzazione)
5. [Definizione Tecniche di Attenzione e Coerenza in Fase di Realizzazione](#5-definizione-tecniche-di-attenzione-e-coerenza-in-fase-di-realizzazione)
6. [Gestione dei Token di Colore e Tipografia](#6-gestione-dei-token-di-colore-e-tipografia)
7. [Gestione dei Components (`node-id=64-1521`)](#7-gestione-dei-components-node-id64-1521)
8. [Gestione delle Istanze nelle 14 Tavole di Prototipo (`node-id=361-5043`) e Flusso Completo](#8-gestione-delle-istanze-nelle-14-tavole-di-prototipo-node-id361-5043-e-flusso-completo)
9. [Architettura Tecnica, Regole 3D 360° e Accessibilità](#9-architettura-tecnica-regole-3d-360-e-accessibilità)
10. [Verifica, Test Automatizzati, Deploy (GitHub & Vercel) e Changelog](#10-verifica-test-automatizzati-deploy-github--vercel-e-changelog)

---

## 1. Concept Accademico e Obiettivi del Progetto

Il progetto **Batman Statue Experience** risponde alla consegna d'esame:

> **Obiettivo del progetto**: *Realizzazione di un prototipo interattivo di una esperienza di acquisto immersiva in modalità desktop. Il prototipo potrà essere implementato dallo studente con Figma, Figma Make o tool di AI Generativa come Antigravity, Stitch, Claude Code o Cursor. La valutazione massima del prototipo sarà di 27/30.*

Il lavoro si articola in due pilastri complementari e sincronizzati:
1. **Progettazione UI/UX su Figma**: definizione rigorosa dei Token di Colore, della Tipografia, della libreria di **Components (`node-id=64-1521`)** e delle **14 Tavole di Prototipo (`node-id=361-5043`)**.
2. **Implementazione del Prototipo Interattivo con AI Generativa (Antigravity)**: traduzione ingegneristica 1:1 del file Figma in un'applicazione web desktop interattiva ad alta fedeltà basata su **React 19**, **TypeScript**, **Three.js / React Three Fiber**, **Motion**, **Web Audio API** e **Vite 8**, con tracciabilità diretta nel DOM tramite attributi `data-figma-node`.

### Sintesi dei 7 Criteri di Valutazione Accademica

| # | Criterio di Valutazione | Risposta Progettuale e Implementativa nel Prototipo |
|---|---|---|
| **1** | **Idea Progettuale** | Trasformazione dell'e-commerce tradizionale in un'avventura investigativa 3D a 360° nella Batcaverna seguita da uno showreel cinematografico a 800 fotogrammi per il preordine della *Batman Statue* (DC × Sideshow × Queen Studios). |
| **2** | **Definizione Buyer Personas e Coerenza** | Target collezionisti *high-end* su postazione **desktop** (protetta dal gate `MobileNotice` / `mobile-advisor` `302:3164`). Tono narrativo *Tech-Noir* e valorizzazione scultorea coerenti in ogni schermata. |
| **3** | **Definizione Bias Cognitivi e Coerenza** | Integrazione strutturale di **Scarcity & Urgency** (`Timer` `03:00`), **IKEA Effect & Effort Justification** (conquista dello showreel tramite i 5 enigmi), **Goal Gradient Effect** (`progress-bar` `0/5`→`5/5` e checkout in 4 tappe) e **Framing & Anchoring** (posizionamento museale prima del prezzo di `700€` + `50€` spedizione = `750€`). |
| **4** | **Definizione Tecniche di Attenzione e Coerenza** | Contrasto selettivo su fondo `#010013` con bagliori `Glare` semantici (`#FFD700` vs `#A64DFF`), flip 3D progressivo su `storytelling-card` con scomparsa del sottotitolo guida, `JokerHintSystem` spazializzato Web Audio + bagliore 3D, alternanza `destra`/`sinistra`/`destra` delle `showreel-card` e animazione `batman-loading-animation`. |
| **5** | **Gestione dei Token di Colore** | Palette quadri-cromatica rigorosa (`--black` `#010013`, `--white` `#FAF9F6`, `--yellow` `#FFD700`, `--purple` `#A64DFF`) + token derivati di bagliore (`--glare-yellow`, `--glare-purple`). Zero colori estranei al sistema. |
| **6** | **Gestione dei Components** | Tutti i 14 componenti della tavola Figma `64:1521` sono codificati come componenti React parametrici e testati singolarmente nella fixture isolata (`tests/fixtures/ds.html`). |
| **7** | **Gestione delle Istanze nelle Tavole di Prototipo** | Le 14 schermate della tavola Figma `361:5043` sono composte esclusivamente da istanze dei componenti master, senza override arbitrari. |

---

## 2. Idea Progettuale

L'**Idea Progettuale** nasce dalla volontà di superare la staticità delle schede prodotto e-commerce tradizionali per beni da collezione di fascia alta (**Batman Statue — DC × Sideshow × Queen Studios**, tiratura da collezione a `700€`), trasformando il percorso d'acquisto su **desktop** in un'esperienza narrativa in prima persona.

L'utente non è un semplice acquirente passivo, ma viene calato nei panni del Cavaliere Oscuro all'interno della **Batcaverna a 360°**, violata da un attacco informatico del Joker:

1. **Innesco Narrativo (`StorytellingScreen`, `353:3406`)**: un reperto fisico-digitale (la carta da gioco del Joker) fluttua al centro del terminale del Batcomputer. L'utente deve cliccare sulla carta per ruotarla in 3D, ascoltare la risata spazializzata del Joker e leggere il monologo di sfida.
2. **Addestramento Operativo (`TutorialScreen`, `314:2104`)**: il sistema istruisce l'utente sulle regole d'ingaggio tramite 4 schede sequenziali (`BATTI IL TEMPO`, `RISOLVI GLI ENIGMI`, `TROVA TUTTI GLI INDIZI`, `ESPLORA L'AMBIENTE`).
3. **Esplorazione Investigativa 3D a 360° (`GamificationScreen`, `296:1030`)**: l'utente esplora tre aree sferiche interconnesse della Batcaverna (*Batcomputer*, *Armeria*, *Batmobile*), separate da filmati cinematografici (`SkipTransitionScreen`, `359:4034`), individuando e risolvendo **5 enigmi del Joker entro 3 minuti**.
4. **Rivelazione Cinematografica del Prodotto (`ShowreelScreen`, `357:3713`)**: la vittoria sblocca uno showreel scrollytelling di **800 fotogrammi ad alta risoluzione** che ruota attorno alla statua, svelandone i dettagli scultorei attraverso tre `showreel-card` e il payoff finale `"L'EREDITÀ È TUA"`.
5. **Finalizzazione Guidata (`CheckoutScreen`, `315:4645` & `ThankYouScreen`, `302:3209`)**: il preordine si conclude in un checkout suddiviso in 4 tappe sequenziali perfettamente integrate nell'interfaccia del Batcomputer.

---

## 3. Definizione Buyer Personas e Coerenza in Fase di Realizzazione

### Profilo della Buyer Persona Primaria
- **Nome e Archetipo**: *Marco, 34 anni — Il Collezionista Esigente & Appassionato DC*.
- **Profilo demografico e comportamentale**: professionista con elevata capacità di spesa per il settore hobby/collectibles; collezionista di statue in resina polystone in scala 1/3 e 1/4 (Sideshow Collectibles, Queen Studios, Prime 1 Studio); forte cultura visiva legata al cinema, ai fumetti DC e al gaming tripla A su PC/console.
- **Contesto e dispositivo di fruizione**: effettua ricerche e acquisti di valore superiore ai `500€` **esclusivamente da postazione desktop** con monitor ad alta risoluzione e impianto audio/cuffie, perché desidera ispezionare le texture dei materiali, la fedeltà del volto e la presenza scenica della scultura prima di impegnarsi nel preordine.
- **Bisogni e motivazioni d'acquisto**:
  - Sentirsi parte dell'universo narrativo di Gotham (coinvolgimento identitario ed emotivo).
  - Verificare l'eccellenza costruttiva e la qualità museale della statua.
  - Avere chiarezza immediata sui costi di prodotto (`700€`), spedizione assicurata (`50€`) e stato dell'ordine.
- **Punti di dolore (Pain Points)**:
  - Schede e-commerce fredde e standardizzate che trattano un pezzo da collezione da `700€` come una commodity qualsiasi.
  - Form di checkout lunghi, confusi o visivamente incoerenti rispetto alla presentazione del prodotto.

### Coerenza in Fase di Realizzazione nel Prototipo
1. **Vincolo di Fruizione Desktop (`MobileNotice` / `mobile-advisor`, nodo `302:3164`)**: in pieno accordo con la traccia d'esame (*"in modalità desktop"*) e con il comportamento della Buyer Persona, l'accesso da smartphone o dispositivi touch viene bloccato con l'avviso dedicato `"DISPOSITIVO NON COMPATIBILE — Per vivere la Batman Statue Experience accedi da un dispositivo Desktop"`, preservando l'integrità dell'esperienza 3D e dello scrollytelling a 800 frame.
2. **Copywriting e Tono di Voce *Tech-Noir***: ogni etichetta dell'interfaccia parla la lingua dell'universo di Batman (`"INIZIA LA MISSIONE"`, `"INTERAGISCI CON IL REPERTO PER DECIFRARE IL MESSAGGIO"`, `"TRANSIZIONE ALLA PROSSIMA AREA"`, `"SCOPRI LA STATUA"`, `"PREORDINA IL CAVALIERE"`).
3. **Risposta puntuale ai driver del collezionista nello Showreel (`357:3713`)**:
   - **Tappa 1 (`PRESENZA LEGGENDARIA`)**: *"Non arredamento, una presenza."*
   - **Tappa 2 (`MATERIALI D'ELITE`)**: *"Finitura da pezzo da museo, non da scaffale."*
   - **Tappa 3 (`SCULTURA DI PRECISIONE`)**: *"Ogni ombra di Gotham scolpita con precisione."*

---

## 4. Definizione Bias Cognitivi e Coerenza in Fase di Realizzazione

Il prototipo integra quattro **Bias Cognitivi** attentamente calibrati per accompagnare l'utente dall'ingaggio iniziale alla conversione finale:

| Bias Cognitivo | Fondamento Psicologico | Applicazione Concreta e Coerente nel Prototipo |
|---|---|---|
| **1. Scarcity & Urgency (Scarsità e Urgenza Temporale)** | La limitazione del tempo disponibile incrementa il livello di concentrazione (*arousal*) e il valore soggettivo attribuito al raggiungimento dell'obiettivo. | • Presentato esplicitamente nella Tappa 1 del Tutorial (`"BATTI IL TEMPO"`).<br>• Il componente `Timer` (`03:00`) nella `Navbar` scandisce in tempo reale i 180 secondi a disposizione.<br>• Nella `Win Screen` (`302:3160`), il tempo residuo viene celebrato nel `Timer` grande centrale prima di sbloccare la statua. |
| **2. IKEA Effect & Effort Justification (Giustificazione dello Sforzo)** | Le persone attribuiscono un valore nettamente superiore ai premi e ai prodotti che hanno conquistato attraverso uno sforzo cognitivo o interattivo diretto. | • Lo showreel della statua non è immediatamente visibile all'atterraggio: va **guadagnato** superando i 5 enigmi del Joker nelle 3 aree della Batcaverna.<br>• La schermata finale dello Showreel (`"L'EREDITÀ È TUA — Hai superato gli enigmi e visto ogni dettaglio. Ora reclama il Cavaliere Oscuro nella tua collezione"`) capitalizza direttamente lo sforzo compiuto. |
| **3. Goal Gradient Effect (Effetto Gradiente dell'Obiettivo)** | La spinta motivazionale accelera man mano che l'utente vede ridursi la distanza dal traguardo attraverso indicatori di progresso chiari e step frazionati. | • **Durante la missione**: il componente `progress-bar` (`24:467`) aggiorna istantaneamente sia il contatore numerico (`0/5` → `5/5`) sia la barra percentuale (`0%` → `100%`) a ogni enigma risolto.<br>• **Durante il checkout (`315:4645`)**: il processo di acquisto è suddiviso in **4 micro-tappe sequenziali** (`DATI PERSONALI` → `DATI DI SPEDIZIONE` → `METODO DI PAGAMENTO` → `ORDINE`), riducendo l'attrito cognitivo. |
| **4. Framing & Anchoring Effect (Incorniciamento e Ancoraggio)** | La percezione di congruità del prezzo dipende dalla cornice di valore (*frame*) costruita prima della comunicazione dell'importo economico. | • Prima di arrivare al prezzo nella Tappa 4 del Checkout, l'utente attraversa 800 frame di rotazione cinematografica e 3 `showreel-card` che incorniciano l'opera come *"pezzo da museo"* in *"resina ad alta densità"*.<br>• Quando nella Tappa 4 (`ORDINE`) compare il prezzo di **`700€`** (`+ 50€` spedizione = **`750€`**), l'ancoraggio al posizionamento museale rende l'importo coerente e giustificato. |

---

## 5. Definizione Tecniche di Attenzione e Coerenza in Fase di Realizzazione

Per guidare la percezione visiva e uditiva dell'utente senza mai sovraccaricarlo, il progetto applica sei **Tecniche di Attenzione** sistemiche:

1. **Contrasto Cromatico Selettivo e Sistema di Bagliori (`Glare`)**:
   - L'intero ambiente poggia sul **Nero Profondo Obsidian (`#010013`)** con vignettatura periferica. Gli unici segnali luminosi ad alta saturazione sono riservati a due poli semantici opposti:
     - **Giallo Batman (`#FFD700` + `--glare-yellow`)** per la guida positiva, le CTA primarie, il timer, le `showreel-card` e gli stati di successo.
     - **Viola Joker (`#A64DFF` + `--glare-purple`)** per l'interferenza nemica, la `storytelling-card`, le carte enigma 3D, la barra indizi e gli stati di errore.
2. **Rivelazione Progressiva con Rotazione 3D (`StorytellingScreen`, `353:3406`)**:
   - All'ingresso nello Storytelling, la scena mostra esclusivamente il fronte della `storytelling-card` (`300×426px`) e il sottotitolo guida `"INTERAGISCI CON IL REPERTO PER DECIFRARE IL MESSAGGIO"`.
   - Al click sulla carta, una rotazione 3D sull'asse Y (`rotateY(180deg)`) svela il retro con il monologo del Joker, attiva la risata spazializzata (`BatcavernAudio.spatialLaugh()`) e **nasconde automaticamente il sottotitolo guida**, concentrando il 100% dell'attenzione sulla lettura e sulla CTA `"ACCETTA LA SFIDA"`.
3. **Guida Attentiva Multimodale Spazializzata (`JokerHintSystem`)**:
   - Nei panorami 360° della Batcaverna, se l'utente non individua un indizio entro la soglia temporale prevista, si attiva un richiamo sensoriale combinato: una risata del Joker processata con riverbero di caverna e panning stereo Web Audio accompagnata dall'accensione del bagliore viola pulsante (`.ds-clue-hint`) sulla carta 3D.
4. **Alternanza del Ritmo Visivo e Bilanciamento dell'Inquadratura (`ShowreelScreen`, `357:3713`)**:
   - Durante lo scorrimento degli 800 frame della statua, le `showreel-card` alternano la propria posizione orizzontale per mantenere viva l'attenzione:
     - **Tappa 1 (`PRESENZA LEGGENDARIA`)**: card allineata a **destra**.
     - **Tappa 2 (`MATERIALI D'ELITE`)**: card allineata a **sinistra**, con contemporanea traslazione orizzontale del canvas della statua verso destra (`translateX(14%)`) per evitare sovrapposizioni e creare un controbilanciamento visivo armonico.
     - **Tappa 3 (`SCULTURA DI PRECISIONE`)**: card nuovamente a **destra**.
     - **Tappa 4 (`L'EREDITÀ È TUA`)**: convergenza finale al **centro** per massimizzare il focus sul pulsante `"PREORDINA IL CAVALIERE"`.
5. **Feedback Istantaneo a Contrasto Invertito sulle Opzioni Enigma (`.ds-answer`)**:
   - Sul retro delle carte indizio (`264:1476`), i pulsanti risposta passano dallo stato a riposo (fondo bianco `#FAF9F6`, testo nero `#010013`) allo stato `:hover` con **inversione netta** (fondo nero `#010013`, testo e bordo bianco `#FAF9F6`), fornendo un ancoraggio visivo immediato prima della conferma in Giallo (`RISPOSTA CORRETTA`) o Viola (`RISPOSTA ERRATA`).
6. **Sostenimento dell'Attenzione nei Caricamenti (`batman-loading-animation`, `359:3905`)**:
   - Durante il caricamento effettivo degli asset 3D e delle texture panoramiche, la `LoadingScreen` mantiene l'engagement visivo attraverso il tracciato luminoso progressivo (`pathLength`) e il respiro continuo del simbolo di Batman in giallo `#FFD700`.

---

## 6. Gestione dei Token di Colore e Tipografia

Il Design System (`node-id=64-1521`) applica una **palette quadri-cromatica rigorosa**, definita in `src/index.css` e verificata dai test automatizzati (`tests/components.spec.ts`):

### Token di Colore Primitivi e Semantici

| Token CSS (`src/index.css`) | Token Figma (`64:1521`) | Valore HEX / RGB | Impiego e Semantica nel Prototipo |
|---|---|---|---|
| `--black` | `primitive_colors/black` | `#010013`<br>`rgb(1, 0, 19)` | **Nero Profondo Obsidian**: sfondo di pagina, superfici di `.ds-panel`, `.ds-tutorial-card`, `.ds-showreel-card`, `.ds-form-card`, `.ds-summary-card` e bottoni a riposo. |
| `--white` | `primitive_colors/white`<br>`text/secondary` | `#FAF9F6`<br>`rgb(250, 249, 246)` | **Bianco Tecnico Alabastro**: testi descrittivi, istruzioni, contorni e placeholder delle `input-bar` in stato `default` e pulsanti `.ds-answer` a riposo. Contrasto WCAG AAA su `#010013`. |
| `--yellow` | `primitive_colors/yellow`<br>`text/primary` | `#FFD700`<br>`rgb(255, 215, 0)` | **Giallo Batman (Primario)**: titoli primari, bottoni `primary`, `timer` principale, `showreel-card`, `input-bar` in stato `focus`/`compiled`, `radio-button` selezionato, `Win Screen`, `batman-loading-animation` e risposta corretta. |
| `--purple` | `primitive_colors/purple` | `#A64DFF`<br>`rgb(166, 77, 255)` | **Viola Joker (Secondario / Antagonista)**: bottoni `secondary`, `storytelling-card`, `card` enigma 3D, `progress-bar` indizi, `input-bar` in stato `error`, `Lose Screen`, `Error 404` e risposta errata. |

### Token di Effetto: Bagliori Multi-Livello (`Glare`)

| Token CSS | Configurazione Multi-Livello | Applicazione |
|---|---|---|
| `--glare-yellow`<br>`--glare-box-yellow` | `drop-shadow(0 16px 32px rgb(255 215 0 / 0.15))`<br>`drop-shadow(0 8px 16px rgb(255 215 0 / 0.3))`<br>`drop-shadow(0 2px 4px rgb(255 215 0 / 0.6))` | Componenti `.ds-primary`, bottoni primari in `:hover`/`:active`, `showreel-card`, `batman-loading-animation`, risposta esatta (`.ds-answer-success`). |
| `--glare-purple`<br>`--glare-box-purple` | `drop-shadow(0 16px 32px rgb(166 77 255 / 0.15))`<br>`drop-shadow(0 8px 16px rgb(166 77 255 / 0.3))`<br>`drop-shadow(0 2px 4px rgb(166 77 255 / 0.6))` | Componenti `.ds-secondary`, `storytelling-card`, `card` enigma 3D, bottoni secondari in `:hover`/`:active`, risposta errata (`.ds-answer-error`). |

### Sistema Tipografico Tokenizzato

| Famiglia | Pesi | Classi CSS | Dimensione / Line-Height | Utilizzo nel Prototipo |
|---|---|---|---|---|
| **Space Grotesk** | Bold (`700`), Regular (`400`) | `.ds-display`<br>`.ds-heading-l`<br>`.ds-heading`<br>`.ds-body-space`<br>`.ds-body-small-space`<br>`.ds-caption` | `80px / 88px`<br>`40px / 48px`<br>`30px / 36px`<br>`20px / 28px`<br>`16px / 24px`<br>`12px / 16px` | Titoli eroici (`BATMAN STATUE EXPERIENCE`, `MISSIONE IN PAUSA`), intestazioni card, bottoni, `timer`, `progress-bar`, label e campi `input-bar`. |
| **Poppins** | Bold (`700`), Regular (`400`) | `.ds-body`<br>`.ds-body-small` | `20px / 28px`<br>`16px / 24px` | Monologo del Joker sulla `storytelling-card`, testi delle `tutorial-card`, descrizioni delle `showreel-card` e quesiti delle carte enigma. |

---

## 7. Gestione dei Components (`node-id=64-1521`)

Ogni componente della tavola Figma **Design System (`64:1521`)** è implementato come componente React modulare e riutilizzabile:

| # | Componente Figma | Nodo Figma | File Sorgente React | Varianti, Dimensioni e Stati Implementati |
|---|---|---|---|---|
| 1 | **`logos-navbar`** | `64:1475` | `Logos` (`src/components/ui/DesignSystem.tsx`) | Trittico ufficiale DC (`260×145px`), Batman (`98×101px`) e Sideshow × Queen Studios (`198×146px`), più variante compatta mobile (`302:3165`). |
| 2 | **`navbar`** | `24:683` | `Navbar` (`src/components/layout/Navbar.tsx`) | 10 varianti di fase (`start`, `loading`, `storytelling`, `tutorial`, `gamification`, `pause`, `win`, `loss`, `showreel`, `checkout`, `thankyou`, `not-found`) sempre con `background: transparent`. |
| 3 | **`button`** | `17:43` | `Button` (`src/components/ui/DesignSystem.tsx`) | `tone`: `primary` (`#FFD700`) / `secondary` (`#A64DFF`); `size`: `big` (`35px`), `medium` (`31px`), `small` (`28px`); `status`: `default`, `hover` (glare), `pressed` (fill pieno), `disabled` (`opacity: 0.4`). |
| 4 | **`icon-button`** | `68:499` | `IconButton` (`src/components/ui/DesignSystem.tsx`) | Pulsante circolare `40×40px` con 6 icone `30×30px` (`chevron-left`, `chevron-right`, `audio-on`, `audio-off`, `pause`, `play`) e stati `default`, `hover`, `pressed`, `disabled`. |
| 5 | **`timer`** | `30:920` | `Timer` (`src/components/ui/DesignSystem.tsx`) | Varianti `big` (`313×180px`, `Win Screen`) e `small` (`207×106px`, HUD `Navbar`), in tono `primary` o `secondary`. |
| 6 | **`progress-bar`** | `24:467` | `ClueProgress` (`src/components/ui/DesignSystem.tsx`) | Contatore indizi (`196×89px`) con 6 step discreti da `0/5` (`0%`) a `5/5` (`100%`). |
| 7 | **`input-bar`** | `39:1173` | `FormInput` (`src/components/ui/FormInput.tsx`) | 5 stati: `default` (bordo bianco `#FAF9F6`), `focus` (bordo giallo `#FFD700`), `compiled` (bordo giallo `#FFD700`), `error` (bordo e messaggio viola `#A64DFF`), `disabled`. |
| 8 | **`radio-button`** | `258:968` | `.ds-radio-slot` (`src/features/checkout/CheckoutScreen.tsx`) | Selettore circolare `25×25px` in hit-area `44×44px` con stati `unselected`, `hover`, `selected` (fill giallo + glare), `disabled`. |
| 9 | **`card`** | `264:1476` | `JokerCard` (`src/features/mission/JokerCard.tsx`) | Carta enigma 3D `300×426px` con flip `front`/`back`, 3 o 4 opzioni `.ds-answer` (`default`, `hover` invertito nero/bianco, `error` viola, `success` giallo, `disabled`) e label d'esito. |
| 10 | **`storytelling-card`** | `353:3248` | `StorytellingScreen` (`src/features/intro/StorytellingScreen.tsx`) | Reperto del Joker `300×426px` con flip 3D da `face=front` (`353:3247`) a `face=back` (`353:3246`), monologo in Poppins `16/24px` e pulsante `"ACCETTA LA SFIDA"`. |
| 11 | **`tutorial-card`** | `259:603` | `TutorialScreen` (`src/features/intro/TutorialScreen.tsx`) | 4 card istruttive (`392×242px`) navigabili tramite `icon-button` frecce e CTA finale `"INIZIA LA MISSIONE"`. |
| 12 | **`showreel-card`** | `357:3522` | `ShowreelScreen` (`src/features/showreel/ShowreelScreen.tsx`) | Card descrittiva della statua con bordo giallo `2px`, raggio `25px`, `glare-box-yellow`, titolo `.ds-heading-l` e corpo `.ds-body`. |
| 13 | **`batman-loading-animation`** | `360:1339` / `338:5675` | `BatmanLoadingAnimation` + `LoadingScreen` (`src/components/ui/DesignSystem.tsx`) | Simbolo di Batman SVG (`900×467px`) con tracciato luminoso progressivo (`pathLength`) e respiro continuo per la `LoadingScreen` (`359:3905`). |
| 14 | **`mouse-scroll`** | `247:786` | `Cursor` (`src/components/ui/DesignSystem.tsx`) | Cursore custom a pipistrello con bagliore giallo attivo sui dispositivi desktop (`pointer: fine`). |

---

## 8. Gestione delle Istanze nelle 14 Tavole di Prototipo (`node-id=361-5043`) e Flusso Completo

### Diagramma del Flusso Interattivo Completo

```
[1. StartScreen.tsx (302:3155)]
        │
        ▼ (Caricamento asset 3D / chunk)
[2. LoadingScreen in DesignSystem.tsx (359:3905) — batman-loading-animation]
        │
        ▼
[3. StorytellingScreen.tsx (353:3406)]
   ├─ Fronte (353:3247): Carta Joker + "INTERAGISCI CON IL REPERTO PER DECIFRARE IL MESSAGGIO"
   └─ Click flip 3D ──► Retro (353:3246): Monologo + Risata Joker + CTA "ACCETTA LA SFIDA"
        │
        ▼
[4. TutorialScreen.tsx (314:2104) — 4 Tappe]
   ├─ Tappa 1: "BATTI IL TEMPO"
   ├─ Tappa 2: "RISOLVI GLI ENIGMI"
   ├─ Tappa 3: "TROVA TUTTI GLI INDIZI"
   └─ Tappa 4: "ESPLORA L'AMBIENTE" ──► CTA "INIZIA LA MISSIONE"
        │
        ▼
[6. GamificationScreen.tsx 360° (296:1030) ◄──► 5. PauseOverlay.tsx (302:3162)]
   ├─ Area 1: Batcomputer (Indizio 1: "BAT SEGNALE", Indizio 2: "JOKER")
   │    │
   │    ▼ [7. SkipTransitionScreen.tsx (359:4034) — "SALTA LA TRANSIZIONE"]
   ├─ Area 2: Armeria (Indizio 3: "BATMAN")
   │    │
   │    ▼ [7. SkipTransitionScreen.tsx (359:4034) — "SALTA LA TRANSIZIONE"]
   └─ Area 3: Batmobile (Indizio 4: "BATMOBILE", Indizio 5: "REATTORE")
        │
        ├─► [8. MissionResultScreen.tsx won=true (302:3160)]
        │          │
        │          ▼
        │   [10. ShowreelScreen.tsx 800 frame (357:3713)]
        │          │
        │          ▼
        │   [11. CheckoutScreen.tsx 4 tappe (315:4645)]
        │          │
        │          ▼
        │   [12. ThankYouScreen.tsx (302:3209)]
        │
        └─► [9. MissionResultScreen.tsx won=false (302:3161)] ──► Riprova da StartScreen
```

### Tabella di Corrispondenza delle 14 Tavole di Prototipo Figma (`361:5043`)

| # | Tavola di Prototipo Figma | Nodo Figma | File Sorgente React | Istanze del Design System Utilizzate |
|---|---|---|---|---|
| 1 | **Start Screen** | `302:3155` | `src/features/intro/StartScreen.tsx` | `navbar` (con `logos-navbar`, `icon-button` pause/audio), titolo `.ds-display`, `button` primary big (`"INIZIA LA MISSIONE"`), `BatcaveBackdrop` 360°. |
| 2 | **Loading Screen** | `359:3905` | `LoadingScreen` (`src/components/ui/DesignSystem.tsx`) | `navbar` (var. Loading con `logos-navbar` e solo `icon-button` audio), `batman-loading-animation` (`360:1339`), label `"CARICAMENTO IN CORSO..."`. |
| 3 | **Storytelling Screen** | `353:3406` | `src/features/intro/StorytellingScreen.tsx` | `navbar`, `storytelling-card` (`face=front` → `face=back` con `button` secondary `"ACCETTA LA SFIDA"`), sottotitolo `"INTERAGISCI CON IL REPERTO..."`, `BatcaveBackdrop` 360°. |
| 4 | **Tutorial Screen (4 tappe)** | `314:2104` | `src/features/intro/TutorialScreen.tsx` | `navbar` (var. Gamification con `progress-bar` `0/5` e `timer` small `03.00`), pannello intro `"ISTRUZIONI"`, 4 istanze di `tutorial-card`, `BatcaveBackdrop` 360°. |
| 5 | **Pause Screen** | `302:3162` | `src/components/ui/PauseOverlay.tsx` | `navbar` (con `icon-button` play attivo), titolo `"MISSIONE IN PAUSA"`, `BatcaveBackdrop` 360°. |
| 6 | **Gamification Screen (3 aree, 5 indizi)** | `296:1030` | `src/features/mission/GamificationScreen.tsx` | `navbar` (con `progress-bar` dinamica e `timer` attivo), 5 istanze 3D di `card` (`JokerCard`) distribuite tra Batcomputer (2), Armeria (1) e Batmobile (2). |
| 7 | **Skip Transition Screen** | `359:4034` | `src/features/mission/SkipTransitionScreen.tsx` | `navbar` (var. Gamification), video MP4 di passaggio tra aree, blocco inferiore `"TRANSIZIONE ALLA PROSSIMA AREA"` + `button` secondary `"SALTA LA TRANSIZIONE"`. |
| 8 | **Win Screen** | `302:3160` | `src/features/mission/MissionResultScreen.tsx` (`won=true`) | `navbar`, pannello `.ds-result` primary con `timer` big del tempo residuo e `button` primary `"SCOPRI LA STATUA"`, `BatcaveBackdrop` 360°. |
| 9 | **Lose Screen** | `302:3161` | `src/features/mission/MissionResultScreen.tsx` (`won=false`) | `navbar`, pannello `.ds-result-loss` secondary (`#A64DFF`) e `button` secondary `"RIPROVA LA MISSIONE"`, `BatcaveBackdrop` 360°. |
| 10 | **Showreel Screen (4 step)** | `357:3713` | `src/features/showreel/ShowreelScreen.tsx` | `navbar` (var. Showreel con `button` `"PREORDINA IL CAVALIERE"` e solo `icon-button` audio), 3 istanze di `showreel-card` (`destra`, `sinistra`, `destra`) e step finale centrale `"L'EREDITÀ È TUA"`. |
| 11 | **Checkout Screen (4 tappe)** | `315:4645` | `src/features/checkout/CheckoutScreen.tsx` | `navbar` (solo `icon-button` audio), 4 form card (`DATI PERSONALI`, `DATI DI SPEDIZIONE`, `METODO DI PAGAMENTO`, `ORDINE`) con istanze di `input-bar`, `radio-button`, `icon-button` e `button` `"CHECKOUT"`, `BatcaveBackdrop` 360°. |
| 12 | **Thank You Screen** | `302:3209` | `src/features/checkout/ThankYouScreen.tsx` | `navbar` (solo `icon-button` audio), card riepilogativa a 6 metadati e `button` primary `"TORNA ALLA HOME"`, `BatcaveBackdrop` 360°. |
| 13 | **Error 404 Screen** | `302:3166` | `src/features/not-found/NotFoundScreen.tsx` | `navbar` (var. 404 con solo `logos-navbar`), pannello secondary `"404 - SPIACENTI PAGINA NON TROVATA."` e `button` secondary `"TORNA ALLA HOME"`, `BatcaveBackdrop` 360°. |
| 14 | **Mobile Advisor Screen** | `302:3164` | `MobileNotice` (`src/components/ui/DesignSystem.tsx`) | `logos-navbar` compatto, pannello `.ds-mobile-card` `"DISPOSITIVO NON COMPATIBILE"` e `BatcaveBackdrop` 360° per tutelare il vincolo di fruizione desktop. |

### Dettaglio del Checkout a 4 Tappe (`CheckoutScreen.tsx`, `315:4645`) e Conferma (`ThankYouScreen.tsx`, `302:3209`)

1. **Tappa 1 — `DATI PERSONALI` (`314:2102`)**: campi `input-bar` validati per `NUMERO DI TELEFONO`, `NOME E COGNOME`, `EMAIL`, `DATA DI NASCITA`, `PASSWORD`.
2. **Tappa 2 — `DATI DI SPEDIZIONE` (`314:2101`)**: campi `input-bar` validati per `REGIONE`, `PROVINCIA`, `CITTÀ`, `CAP`, `INDIRIZZO`.
3. **Tappa 3 — `METODO DI PAGAMENTO` (`314:2100`)**: selezione tramite `radio-button` tra `PAYPAL` e `CARTA DI CREDITO O DEBITO` (con espansione contestuale di `NOME INTESTATARIO`, `NUMERO CARTA`, `DATA DI SCADENZA`, `CVV`).
4. **Tappa 4 — `ORDINE` (`314:2103`)**: riepilogo trasparente `BATMAN STATUE` (`700€`), `SPEDIZIONE` (`50€`), `TOTALE` (`750€`) e CTA `"CHECKOUT"`.
5. **Conferma Ordine (`ThankYouScreen.tsx`, `302:3209`)**: schermata `"ACQUISTO ANDATO A BUON FINE"` con griglia a 6 metadati (`ID-TRANSAZIONE`, `PRODOTTO`, `STATO`, `SPEDIZIONE IN ARRIVO`, `DATA ACQUISTO`, `QUANTITÀ`) e CTA `"TORNA ALLA HOME"`.

---

## 9. Architettura Tecnica, Regole 3D 360° e Accessibilità

### 1. Regola Vincolante di Rendering 3D: Panorama Sferico Chiuso a 360°
In tutte le schermate del prototipo che poggiano sull'ambiente della Batcaverna (`StartScreen`, `StorytellingScreen`, `TutorialScreen`, `PauseOverlay`, `GamificationScreen`, `MissionResultScreen`, `CheckoutScreen`, `ThankYouScreen`, `NotFoundScreen`), il fondale è renderizzato tramite una **sfera 3D chiusa (`sphereGeometry` Three.js osservata dal centro con `PerspectiveCamera`)**:
- **`BatcaveBackdrop.tsx`**: proietta `BatCaverna_Batcomputer360.jpg` (frame zero istantaneo) e `BatCaverna_Batcomputer360.mp4` all'interno della sfera 3D per tutte le schermate UI, eliminando qualsiasi deformazione equirettangolare o curvatura anomala del pavimento.
- **`GamificationScreen.tsx`**: gestisce l'esplorazione interattiva a 360° delle 3 aree della Batcaverna e posiziona nello spazio 3D i 5 indizi (`JokerCard`).

### 2. Regola di Trasparenza della Navbar (`.ds-navbar`)
- La navbar appartiene al Design System ed è **completamente trasparente (`background: transparent`)** su tutte le schermate.
- I panorami 3D e i video si estendono a filo del bordo superiore (`inset: 0`), mantenendo i controlli HUD in sovrimpressione pulita.

### 3. Motore Sonoro Web Audio API (`src/lib/audioManager.ts`)
- Gestisce la colonna sonora (`SiglaBatman.wav`), i feedback sintetici di interazione e la risata spazializzata del Joker (`RisataJoker.wav`) con filtro passa-basso, panning stereo e riverbero procedurale di caverna.

### 4. Controlli da Tastiera e Accessibilità (WCAG 2.1 AA)

| Tasto | Contesto | Comportamento |
|---|---|---|
| **Tab / Shift+Tab** | Tutte le schermate | Navigazione sequenziale con focus ring ad alto contrasto; in `GamificationScreen` orienta automaticamente la camera 3D verso l'indizio focalizzato. |
| **Invio / Spazio** | `storytelling-card`, `JokerCard`, Bottoni | Ruota la carta 3D fronte/retro, seleziona un'opzione di risposta o attiva il pulsante. |
| **Esc** | Carta indizio aperta / Missione | Chiude la carta indizio riportandola sul fronte oppure apre/chiude `PauseOverlay`. |
| **Frecce / Mouse** | Panorama 360° | Ruota liberamente la visuale a 360° nella Batcaverna. |

---

## 10. Verifica, Test Automatizzati, Deploy (GitHub & Vercel) e Changelog

### 1. Suite di Verifica Locale
Prima di ogni rilascio, l'intero prototipo viene validato con la seguente catena di comandi:

```bash
# 1. Installazione deterministica delle dipendenze
npm ci

# 2. Typecheck TypeScript, lint ESLint, test unitari (12 test) e build Vite
npm run check

# 3. Build della fixture isolata per il collaudo geometrico/cromatico dei componenti
npm run build:ds-fixture

# 4. Suite E2E Playwright (15 test comprensivi di audit accessibilità WCAG Axe)
npm run test:e2e
```

| Comando | Cosa verifica |
|---|---|
| `npm run typecheck` | Compilazione TypeScript `tsc --noEmit` senza errori. |
| `npm run lint` | Conformità ESLint su `src`, `tests` e file di configurazione. |
| `npm test` | Test unitari (`node:test` + `tsx`) sulla macchina a stati `experienceReducer` e sulla validazione `checkoutModel`. |
| `npm run build` | Compilazione di produzione Vite in `dist/` con generazione di `dist/404.html`. |
| `npm run build:ds-fixture` | Compilazione di `tests/fixtures/ds.html` in `artifacts/fixtures/ds` per la verifica di tutti i componenti Figma `64:1521`. |
| `npm run test:e2e` | Verifica browser completa su Chromium di tutte le 14 schermate del prototipo, dei token cromatici e dell'assenza di violazioni `@axe-core/playwright`. |

### 2. Pipeline CI GitHub Actions e Pubblicazione su Vercel
- **GitHub Actions (`.github/workflows/quality.yml`)**: esegue automaticamente ad ogni push su `main` il controllo statico, i test unitari, la build e la suite Playwright su `chromium`, `firefox` e `webkit` tramite `xvfb-run`.
- **Deploy su Vercel**:
  ```bash
  # Creazione di una build candidata di produzione
  vercel deploy --prod --skip-domain

  # Promozione sul dominio pubblico dopo verifica
  vercel promote <deployment-url-o-id>

  # Rollback immediato in caso di emergenza
  vercel rollback
  ```

---

### 3. Changelog del Progetto

#### 2026-11-07 (`v2.2.0`) — Allineamento completo al nuovo Design System (`64:1521`), Prototipo (`361:5043`), riorganizzazione nomi schermate e documentazione unificata
- **Allineamento 1:1 alle 14 Tavole di Prototipo (`361:5043`) e ai Components (`64:1521`)**:
  - **Loading Screen (`359:3905`) e `batman-loading-animation` (`360:1339` / `338:5675`)**: implementata l'animazione SVG del Bat-simbolo con tracciato luminoso continuo (`pathLength`), bagliore giallo multi-livello e respiro (`scale`/`opacity`), integrata nei caricamenti tecnici reali (`Suspense`, texture panoramiche 360° e frame dello showreel).
  - **Storytelling Screen (`353:3406`) e `storytelling-card` (`353:3248`)**: implementato il reperto interattivo del Joker (`300×426px`) in `StorytellingScreen.tsx`. Al click sul fronte (`353:3247`), la carta ruota in 3D sul retro (`353:3246`), avvia la risata spazializzata del Joker (`BatcavernAudio.spatialLaugh()`), nasconde il sottotitolo guida `"INTERAGISCI CON IL REPERTO / PER DECIFRARE IL MESSAGGIO"` e mostra il monologo con la CTA `"ACCETTA LA SFIDA"`.
  - **Skip Transition Screen (`359:4034` / `359:3955`)**: introdotto in `SkipTransitionScreen.tsx` l'overlay inferiore `"TRANSIZIONE ALLA PROSSIMA AREA"` con il pulsante secondario `"SALTA LA TRANSIZIONE"`.
  - **Showreel Screen (`357:3713`) e `showreel-card` (`357:3522`)**: incapsulati in `ShowreelScreen.tsx` i testi delle prime 3 tappe nel componente `showreel-card` con bordo giallo `2px` e `glare-box-yellow`, allineamento alternato `destra` → `sinistra` → `destra` e bilanciamento dell'inquadratura della statua nella Tappa 2 (`"MATERIALI D'ELITE"`).
  - **Stato `:hover` delle opzioni enigma (`264:1476`)**: aggiunto lo stato hover invertito (`background: var(--black)`, `color: var(--white)`, `outline-color: var(--white)`) sui pulsanti `.ds-answer` attivi.
- **Standardizzazione nomenclatura file e unificazione documentale**:
  - Rinominati i file delle schermate (`StorytellingScreen.tsx`, `TutorialScreen.tsx`, `GamificationScreen.tsx`, `SkipTransitionScreen.tsx`, `MissionResultScreen.tsx`, `ShowreelScreen.tsx`, `CheckoutScreen.tsx`, `ThankYouScreen.tsx`, `NotFoundScreen.tsx`) per riflettere direttamente le 14 tavole del prototipo Figma.
  - Unificata l'intera documentazione accademica e tecnica in `docs/DOCUMENTAZIONE_PROGETTO.md`.

#### 2026-11-06 (`v2.1.2`) — Consolidamento Design System e rigore quadri-cromatico
- Eliminato ogni colore estraneo ai quattro token ufficiali (`#010013`, `#FAF9F6`, `#FFD700`, `#A64DFF`) nelle classi `.ds-answer-success` e `.ds-answer-error`.

#### 2026-11-06 (`v2.1.1`) — Rendering panoramico 3D sferico chiuso istantaneo (`BatcaveBackdrop`)
- Proiezione dell'ambiente Batcomputer (`BatCaverna_Batcomputer360.mp4` / `.jpg`) su geometria sferica Three.js a 360° (`SphereGeometry` con `PerspectiveCamera`) su tutte le schermate UI, con precaricamento istantaneo della texture statica al frame zero e navbar trasparente al 100%.

#### 2026-11-01 & 2026-10-29 — Prima trasposizione Design System e Audit Remediation
- Trasposizione iniziale del Design System Figma, gate desktop, accessibilità da tastiera, cache LRU per gli 800 frame dello showreel e suite di regressione Playwright/Axe.
