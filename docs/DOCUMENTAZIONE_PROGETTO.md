# Dossier accademico — Batman Statue Experience

[Indice del progetto](../README.md) · [Guida all’esperienza web](ESPERIENZA.md) · [Sviluppo e manutenzione](SVILUPPO.md)

## Consegna e materiali

| Materiale | Riferimento |
| --- | --- |
| Traccia e consegna | [Google Classroom](https://classroom.google.com/u/1/c/ODA4NDg1NTU3MTQ3/a/Nzk2ODE3Nzk2MTk0/details) |
| Presentazione | [Figma Slides](https://www.figma.com/slides/lawZFub46cZaRJ38nCZN1q) |
| Libreria di progetto | [Figma Design System, nodo 64:1521](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=64-1521&m=dev) |
| Tavole del percorso | [Figma, nodo 361:5043](https://www.figma.com/design/HNqMZbAGUnygNJu9kVJzOc/BatmanStatueExperience_DesignSystem?node-id=361-5043&m=dev) |
| Materiali di lavoro | [Spazio di progetto ChatGPT](https://chatgpt.com/g/g-p-6a15bf741ef08191ab845e2047c91493-sitowebbatmanstatueexperience/project) |
| Prototipo web | [Sito pubblico](https://batman-statue-experience.vercel.app/) · [Repository GitHub](https://github.com/alessandro-bottone-design/batman-statue-experience/tree/main) |

## Concept e pubblico

Il progetto risponde alla consegna di un prototipo interattivo di acquisto immersivo su desktop. La Batcaverna introduce una sfida narrativa in prima persona, il superamento degli enigmi porta alla presentazione della statua e il checkout mette in scena il preordine.

**Marco, 34 anni**, rappresenta il collezionista appassionato di DC. Il progetto assume che voglia osservare con calma forma e finitura di un oggetto da collezione e vedere con chiarezza prezzo e spedizione. La missione propone una motivazione narrativa, lo showreel dedica spazio al prodotto e il riepilogo distingue i 700 € della statua dai 50 € di spedizione. Questi elementi definiscono l’ipotesi progettuale della persona.

| Criterio | Risposta progettuale |
| --- | --- |
| Idea progettuale | Percorso desktop con un ambiente investigativo a 360°, uno showreel e un preordine simulato. |
| Buyer persona | Tono ispirato a Gotham, osservazione dei dettagli scultorei e riepilogo dei costi. |
| Bias cognitivi | Timer per l’urgenza, accesso narrativo alla statua dopo la missione, indicatori di avanzamento, presentazione dei dettagli prima del prezzo. |
| Tecniche di attenzione | Rivelazione della carta, giallo e viola con funzioni distinte, aiuti visivi e sonori, alternanza delle card e pause durante lo showreel. |
| Token | Palette e tipografia condivise dai componenti dell’interfaccia. |
| Componenti | Libreria Figma come riferimento per varianti, stati e composizione delle schermate React. |
| Istanze | Mappa delle tavole e dei corrispondenti flussi web riportata sotto. |

Le scelte sul comportamento sono ipotesi di design. Il timer e il contatore rendono leggibile la sfida. Nel percorso narrativo lo sforzo precede la presentazione della statua. Le tappe del checkout e il progresso degli indizi indicano quanto resta da fare. La presentazione dei dettagli fornisce il contesto per il prezzo dimostrativo.

## Sistema visivo e interazione

| Token CSS | Valore | Funzione |
| --- | --- | --- |
| `--black` | `#010013` | Fondo e superfici scure. |
| `--white` | `#FAF9F6` | Testi e contorni neutri. |
| `--yellow` | `#FFD700` | Azioni primarie, informazioni di avanzamento e feedback positivo. |
| `--purple` | `#A64DFF` | Reperti del Joker, azioni secondarie e feedback di errore. |

I font sono forniti localmente. Space Grotesk caratterizza titoli, controlli e indicatori, mentre Poppins è usato per testi descrittivi e istruzioni. Gli effetti luminosi riprendono giallo e viola con intensità diverse. Le viste della Batcaverna e lo showreel lasciano la navbar trasparente.

Il fronte della carta introduttiva invita all’interazione. Il retro mostra il monologo e il pulsante di accettazione, mentre il sottotitolo guida scompare. Nella missione le carte fanno parte della scena e il feedback di risposta è associato all’indizio. Nello showreel le card alternano destra, sinistra e destra, con dissolvenze reversibili e intervalli dedicati alla sola sequenza. Il video resta centrato a schermo intero fino al finale.

### Componenti di riferimento

I nomi e i nodi qui sotto rimandano alla libreria Figma. Alcuni elementi sono componenti React condivisi, altri sono definiti nella schermata che li usa. Gli attributi `data-figma-node` collegano specifiche istanze o elementi interni alle tavole.

| Componente Figma | Nodo di riferimento | Implementazione web |
| --- | --- | --- |
| `logos-navbar` | `64:1475` | `Logos` |
| `navbar` | `24:683` | `Navbar` |
| `button` | `17:43` | `Button`, con toni e dimensioni |
| `icon-button` | `68:499` | `IconButton`, usato per audio, pausa e navigazione |
| `timer` | `30:920` | `Timer`, nella navbar di gioco e nel risultato |
| `progress-bar` | `24:467` | Indicatore degli indizi nella `Navbar` |
| `input-bar` | `39:1173` | `FormInput`, con etichetta e messaggio di errore |
| `radio-button` | `258:968` | Scelta del pagamento in `CheckoutScreen` |
| `card` | `264:1476` | `JokerCard` nella scena 3D |
| `storytelling-card` | `353:3248` | Carta fronte/retro in `StorytellingScreen` |
| `tutorial-card` | `259:603` | Schede di istruzioni in `TutorialScreen` |
| `showreel-card` | `357:3522` | Pannelli descrittivi in `ShowreelScreen` |
| `batman-loading-animation` | `360:1339` | `BatmanLoadingAnimation` in `LoadingScreen` |
| `mouse-scroll` | `247:786` | `Cursor` a pipistrello su puntatori di precisione |

## Tavole e percorso

Le tavole descrivono anche stati temporanei e alternative. Il caricamento appare quando serve, la pausa è un overlay e la sconfitta è un esito alternativo. Il [flusso web](ESPERIENZA.md) distingue questi stati dalle destinazioni accessibili tramite URL.

| Tavola | Nodo di riferimento | Schermata o stato |
| --- | --- | --- |
| Avvio | `302:3155` | `StartScreen` |
| Caricamento | `359:3905` | `LoadingScreen` |
| Storytelling e briefing | `353:3406` | `StorytellingScreen` |
| Tutorial | `314:2104` | `TutorialScreen`, quattro schede |
| Pausa | `302:3162` | `PauseOverlay` |
| Missione | `296:1030` | `GamificationScreen`, tre aree e cinque indizi |
| Transizioni | `359:4034` | `SkipTransitionScreen` |
| Vittoria | `302:3160` | `MissionResultScreen`, tempo residuo e accesso alla statua |
| Sconfitta | `302:3161` | `MissionResultScreen`, rientro all’avvio |
| Showreel | `357:3713` | `ShowreelScreen`, tre card e finale |
| Checkout | `315:4645` | `CheckoutScreen`, dati personali, spedizione, pagamento e ordine |
| Conferma | `302:3209` | `ThankYouScreen`, riepilogo di esempio |
| Errore 404 | `302:3166` | `NotFoundScreen` |
| Avviso mobile | `302:3164` | `MobileNotice` |

Il checkout è una simulazione locale. Le verifiche Playwright coprono il percorso, i componenti e scenari di accessibilità selezionati con axe. La [guida tecnica](SVILUPPO.md) descrive come eseguire le verifiche e quali parti del sistema riguardano.
