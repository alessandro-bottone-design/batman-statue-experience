# Guida all’esperienza

[Indice del progetto](../README.md) · [Dossier di progetto](DOCUMENTAZIONE_PROGETTO.md)

## Accesso e comandi

Apri il sito in un browser desktop con mouse o tastiera. L’esperienza mostra un avviso dedicato su smartphone, tablet e dispositivi rilevati con puntatore primario touch. Una finestra stretta su un desktop può comunque mostrare il sito completo.

| Comando | Uso |
| --- | --- |
| Mouse | Nella missione, sposta il puntatore verso i bordi per ruotare la visuale. Avvicinati a un indizio per fermarti e selezionarlo. |
| Frecce | Nella missione, orientano la camera quando il focus è sulla scena e non su un controllo. |
| Tab e Maiusc + Tab | Spostano il focus. Durante la missione puoi raggiungere gli indizi e orientare la camera verso la carta con la tastiera. |
| Invio o Spazio | Attiva il controllo a fuoco, apre una carta o seleziona una risposta. |
| Esc | Chiude la carta di un enigma aperto. Negli stati che prevedono la pausa, apre o chiude la pausa se l’evento non è già gestito dalla carta. |
| Rotella, trackpad o scorrimento da tastiera | Percorrono avanti o indietro lo showreel. |
| Pulsante audio | Attiva o silenzia musica ed effetti. L’audio può richiedere una prima interazione perché il browser ne consenta la riproduzione. |

La pausa è disponibile nelle fasi introduttive e nella missione. Nello showreel, nel checkout e nella conferma resta disponibile il comando audio.

## Dalla carta del Joker alla statua

1. In home scegli **Inizia la missione**. Apri il reperto del Joker per rivelare il messaggio sul retro e premi **Accetta la sfida**.
2. Leggi le quattro schede del tutorial. L’ultima avvia la missione.
3. Risolvi due enigmi al Batcomputer, uno in Armeria e due al Batmobile. Le risposte errate mostrano un feedback e permettono di riprovare. Gli aiuti orientano l’attenzione verso una carta quando la ricerca si prolunga.
4. Il timer parte da tre minuti di gioco effettivo. Il caricamento della scena, la pausa e i filmati di passaggio sospendono il conto alla rovescia. I filmati si possono saltare. Risolvere i primi due indizi entro 45 secondi di gioco assegna una sola volta 60 secondi aggiuntivi.
5. Al quinto indizio, **Scopri la statua** porta allo showreel. Se il tempo termina, **Riprova la missione** riporta alla schermata iniziale.

Il percorso narrativo presenta la statua dopo la vittoria. Per consultare la parte di prodotto separatamente, apri `/#statua`.

## Showreel

Lo scroll pilota una sequenza di immagini. La superficie resta centrata a schermo intero dietro la navbar trasparente, mantenendo la stessa geometria fino al finale. Per riempire la finestra, la sequenza può essere ritagliata ai bordi. Le card si alternano a destra, sinistra e destra. Fino a 760 px si allineano in basso al centro.

| Contenuto | Entrata | Piena visibilità | Uscita |
| --- | --- | --- | --- |
| Presenza leggendaria | 3–7% | 7–24% | 24–29% |
| Materiali d’élite | 34–38% | 38–54% | 54–59% |
| Scultura di precisione | 65–69% | 69–84% | 84–89% |
| L’eredità è tua | 93–97% | 97–100% | — |

Le percentuali si riferiscono alla corsa di scroll dello showreel. Le dissolvenze si invertono risalendo e, nelle pause tra i contenuti, rimane la sequenza. Il pulsante di preordine è sempre disponibile nella navbar. Nel finale diventa attivo quando la dissolvenza è completa. Con la preferenza di sistema per il movimento ridotto lo showreel mostra il fotogramma finale statico e il preordine subito disponibile.

## Checkout dimostrativo

Da **Preordina il Cavaliere** o `/#checkout` si accede ai quattro passaggi del preordine dimostrativo.

1. In **Dati personali** inserisci telefono, nome, email, data di nascita e password di prova.
2. In **Dati di spedizione** inserisci regione, provincia, città, CAP e indirizzo fittizi.
3. In **Metodo di pagamento** scegli PayPal o carta dimostrativa. Scegliendo carta, vengono chiesti intestatario, numero, scadenza e CVV fittizi.
4. In **Ordine** verifica il riepilogo. Una statua da 700 € più 50 € di spedizione dà un totale dimostrativo di 750 €.

Il browser convalida i campi e simula l’attesa. I dati del modulo restano nello stato della pagina. Il flusso non crea un account, non contatta PayPal o un circuito di pagamento e non effettua addebiti. La pagina `/#conferma` mostra un riepilogo di esempio dopo il checkout. Se viene aperta direttamente o ricaricata, senza un ordine in memoria riporta allo showreel.

## Recupero

Se la missione non può inizializzare il rendering 3D, prova **Riprova** o passa alla presentazione della statua dal messaggio di recupero. Se la sequenza dello showreel non è disponibile, puoi ritentare il caricamento o proseguire dalla navbar. Da una pagina inesistente, **Torna alla home** riporta a `/`.
