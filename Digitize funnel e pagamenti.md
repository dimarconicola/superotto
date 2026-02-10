---
title: Digitize funnel e pagamenti

---

## Funnel “autovalutazione → prenotazione → check-up a pagamento” (testo pronto + logica)

### Obiettivo

1. Filtrare bobine rischiose prima che arrivino.
2. Mantenere “anticipo rimborsabile se rifiuti” per chi passa l’autovalutazione.
3. Offrire “check-up professionale” a pagamento a chi risponde NO/INCERTO.

---

## Step 0 — Scelta percorso (homepage / booking)

**Titolo**
Prima di prenotare: 60 secondi di autovalutazione

**Sottotitolo**
Se la pellicola è integra, prenoti la digitalizzazione con anticipo rimborsabile in caso di rifiuto tecnico.
Se hai dubbi o la pellicola è rovinata, prenoti un check-up professionale.

**Due bottoni**

* **La mia pellicola è integra → Prenota digitalizzazione**
* **Ho dubbi / pellicola rovinata → Prenota check-up**

---

## Step 1 — Autovalutazione (5 domande sì/no)

Formato: checkbox con foto-esempio (ideale) o micro-descrizione.

**Q1 — Odore “aceto” forte?**
Spiegazione: se senti un odore pungente tipo aceto/vernice, può essere degradazione.

* ☐ Sì
* ☐ No
* ☐ Non so

**Q2 — Pellicola deformata/ondulata in modo evidente?**
Spiegazione: se la striscia non sta piatta, sembra “a onda” o incurvata.

* ☐ Sì
* ☐ No
* ☐ Non so

**Q3 — Perforazioni strappate o bordi danneggiati?**
Spiegazione: se i “buchini” sono rotti in molti punti o il bordo è rovinato.

* ☐ Sì
* ☐ No
* ☐ Non so

**Q4 — Muffa/polvere appiccicata/contaminazioni visibili?**
Spiegazione: macchie, patine, residui che sembrano “attaccati”.

* ☐ Sì
* ☐ No
* ☐ Non so

**Q5 — La pellicola è spezzata in più punti / si rompe toccandola?**

* ☐ Sì
* ☐ No
* ☐ Non so

---

## Logica di routing (semplice)

* Se tutte le risposte sono **NO** → percorso **Digitalizzazione** (standard).
* Se almeno una risposta è **SÌ** o **NON SO** → percorso **Check-up**.

---

## Step 2A — Percorso Digitalizzazione (solo se “tutti NO”)

**Messaggio conferma**
Ottimo: dalla tua autovalutazione la pellicola sembra compatibile con una scansione sicura.

**Regola pagamento (chiara)**

* Prenoti con **anticipo €20**.
* Se al controllo tecnico in sede rifiutiamo la lavorazione per rischio (raro, ma possibile), **rimborsiamo il 100% dell’anticipo**.
* Se lavoriamo, paghi il **saldo alla consegna**.

**CTA**
Prenota consegna bobine (Calendly) + paga anticipo (Stripe/PayPal)

---

## Step 2B — Percorso Check-up (se c’è un SÌ o NON SO)

### Prodotto: Check-up bobine (solo valutazione)

**Prezzo**

* **€30** (pulito, facilmente comunicabile)

**Cosa include**

* Inventario + foto
* Valutazione rischio scorrimento
* Consiglio “si può fare / si può fare con limiti / non conviene”
* Se fattibile: stima fascia minuti e tempi

**Esito**

* Se la lavorazione è fattibile e prosegui: **€30 scalati** dal totale digitalizzazione.
* Se non è fattibile o non vuoi procedere: hai comunque pagato un servizio reale.

**CTA**
Prenota check-up + paga €30

---

## Copia pronta (italiano) da mettere sotto al funnel

### Titolo

Non tutte le pellicole si possono digitalizzare in sicurezza.

### Testo

Per evitare rischi inutili, facciamo così:

* Se la pellicola è integra, prenoti direttamente la digitalizzazione.
* Se ci sono dubbi o danni, prenoti un check-up: valutiamo, fotografiamo e ti diciamo cosa conviene fare.

Questo riduce tempi persi e protegge sia te che la pellicola.

---

## Terms/Policy (righe da inserire nei Termini)

**Autovalutazione**
“L’autovalutazione è una guida rapida e non sostituisce il controllo tecnico in sede.”

**Anticipo digitalizzazione**
“L’anticipo di €20 è rimborsabile al 100% solo se il Fornitore rifiuta la lavorazione per rischio tecnico riscontrato al controllo in sede. In caso di mancata presentazione o cancellazione tardiva, l’anticipo non è rimborsabile.”

**Check-up**
“Il check-up (€30) è un servizio a pagamento che include inventario, foto e valutazione tecnica. Se il Cliente procede con la digitalizzazione entro 7 giorni, il costo del check-up viene scalato dal totale.”

---

## Implementazione minima (senza complicarti la vita)

* Pagina “/check” con le 5 domande (Typeform / Tally / involve.me).
* Output logico:

  * “Tutti NO” → link a Calendly + pagamento anticipo
  * “SÌ/Non so” → link a Calendly Check-up + pagamento €30
* Salva le risposte nel lead (email + telefono) per ridurre discussioni all’arrivo.

---

## Prezzi consigliati (coerenti col resto)

* **Anticipo digitalizzazione:** €20
* **Check-up:** €30 (scalabile dal totale se poi digitalizzano)

Questo mantiene la promessa “anticipo rimborsabile se rifiuti” per i casi buoni, e monetizza il tempo quando la situazione è incerta o problematica.


## Funnel preventivo completo (stato bobine + quantità/minuti + anticipo variabile + dichiarazioni)

### Output del funnel

1. **Range minuti stimato** → assegna **fascia prezzo** (0–30 / 31–60 / …)
2. **Idoneità tecnica** (OK / dubbio / rischio) → route su **digitalizzazione** o **check-up**
3. **Anticipo calcolato** in base al range (non legato allo stato)
4. **Richiesta registrata** con dichiarazioni e consensi (loggabili)

---

## Architettura funnel (3 percorsi)

### Percorso A — “Digitalizzazione standard”

Condizione: autovalutazione = tutti “NO” sui rischi + range minuti stimato.

* Pagamento: **anticipo variabile per fascia** (vedi sotto)
* Saldo: alla consegna

### Percorso B — “Check-up professionale”

Condizione: almeno un “SÌ/Non so” sui rischi.

* Pagamento: **€30 check-up**
* Se poi digitalizzano: **€30 scalati dal totale**
* Se rifiuti tu per rischio: check-up resta pagato (hai lavorato)

### Percorso C — “Non idoneo”

Condizione: muffa grave / odore acetico forte / deformazione severa / pellicola che si spezza.

* Esito: stop, suggerisci laboratorio pro (senza incasso)

---

## Step 1 — Autovalutazione integrità (come già definito)

Le 5 domande sì/no/non so su odore acetico, deformazioni, perforazioni, contaminazioni, spezzature.

Routing:

* Tutti NO → Percorso A
* Qualsiasi SÌ / Non so → Percorso B

---

## Step 2 — Quante bobine e quanti minuti (stima guidata semplice)

### A) Domanda 1: “Quante bobine hai?”

Campo numerico: 1–30

### B) Domanda 2: “Che tipo di bobine?” (multi-select)

* Super 8
* 8mm
* Miste / non so

### C) Domanda 3: “Dimensione bobine” (metodo user-proof)

Mostri 4 opzioni con immagini (consigliato) + descrizione “diametro approssimativo”:

* **Piccola** (circa 7–8 cm)
* **Media** (circa 12–13 cm)
* **Grande** (circa 17–18 cm)
* **Molto grande** (circa 20–23 cm)

Per ciascuna opzione, fai scegliere **quante** bobine di quel tipo hanno.

### D) Conversione minuti (stima conservativa, per evitare sottoprezzo)

Usa stime “a spanne” deliberate (non perfette, ma coerenti):

* Piccola: **3–5 min**
* Media: **8–12 min**
* Grande: **15–20 min**
* Molto grande: **25–35 min**

Calcolo: somma min stimati → assegna fascia prezzo.

Testo sul funnel:
“È una stima. Confermiamo i minuti reali al check tecnico in sede.”

---

## Step 3 — Fascia prezzo + anticipo variabile (solo range, non stato)

### Prezzi fascia (già definiti)

* 0–30 min €80
* 31–60 min €120
* 61–120 min €190
* 121–180 min €250
* 181–240 min €300
* 241–300 min €350
* 300+ €1,10/min

### Anticipo variabile (modello operativo pulito)

Anticipo = “commitment” proporzionale al carico, ma non troppo alto.

* 0–30 min: **€20**
* 31–60 min: **€30**
* 61–120 min: **€40**
* 121–180 min: **€50**
* 181–240 min: **€60**
* 241–300 min: **€70**
* 300+ min: **€80**

Regola: anticipo **scalato dal totale** se lavori.

* Percorso A: anticipo rimborsabile solo se **rifiuti tu** al controllo tecnico (come tua policy).
* Percorso B: qui l’anticipo non serve; pagano **€30 check-up**.

Motivo: l’anticipo variabile risolve la tua esigenza “dipende dal range” senza introdurre perizia tecnica gratuita.

---

## Step 4 — Add-on (solo dichiarazione d’interesse, non pagamento)

Se vuoi tenere tutto minimale, nel funnel raccogli solo “interesse” e confermi a voce/in intake.

Checkbox:

* ☐ Clean+ (miglioramento immagine)
* ☐ Master ProRes/DNxHR
* ☐ Consegna su drive cliente
* ☐ Link download
* ☐ Urgenza (se disponibile)

---

## Step 5 — Dati, dichiarazioni, consensi (per registrare tutto)

### Campi

* Nome e cognome
* Telefono (WhatsApp)
* Email
* Comune (solo per capire “Palermo e dintorni”)
* Preferenza appuntamento (slot Calendly)

### Dichiarazioni (checkbox obbligatorie)

* ☐ Dichiaro di essere proprietario delle bobine o autorizzato alla digitalizzazione.
* ☐ Ho capito che il servizio è **solo immagine** (no audio).
* ☐ Ho capito che la qualità dipende dalla pellicola; Clean+ è miglioramento conservativo.
* ☐ Ho capito la retention: file conservati max **15 giorni**.
* ☐ Accetto Termini di Servizio e Privacy.

### Log tecnico da salvare

* timestamp
* versione Termini (PDF o hash)
* IP + user agent
* esito autovalutazione (risposte)
* stima minuti + fascia
* anticipo calcolato

---

## Pagina risultato (copy pronta)

### Se Percorso A (ok)

**“Risultato: pellicola probabilmente lavorabile.”**
“Stima durata totale: X–Y minuti → fascia **31–60 min (€120)**.”
“Per bloccare la lavorazione: **anticipo €30** (scalato dal totale). Saldo alla consegna.”
CTA: “Prenota consegna” + pagamento anticipo

### Se Percorso B (dubbi/rischio)

**“Risultato: serve check-up.”**
“Abbiamo rilevato possibili rischi (deformazioni/odore/perforazioni/contaminazioni).”
“Prenota **Check-up bobine €30**: inventario + foto + valutazione tecnica.”
“Se poi procedi con la digitalizzazione entro 7 giorni: **€30 scalati**.”
CTA: “Prenota check-up” + pagamento €30

### Se Percorso C (non idoneo)

**“Risultato: alta probabilità di rischio.”**
“Consigliamo un laboratorio professionale per conservazione/restauro.”
Nessun pagamento.

---

## Implementazione minima (zero custom code, ma robusta)

### Stack “lean”

* **Tally** (o Typeform/involve.me) per funnel con logica
* **Stripe Payment Link** per anticipi e check-up
* **Calendly** per appuntamenti (2 eventi: Digitalizzazione / Check-up)
* **Google Sheets/Airtable** come CRM minimo (auto-popolato)
* **Drive/Dropbox** solo per delivery, non per storage infinito

### Collegamenti

* Funnel → calcola fascia + mostra link pagamento corretto
* Dopo pagamento → redirect a Calendly già con info precompilata (nome/email/ordine)
* Tutto salvato in un foglio con ID ordine (`ORD-YYYYMMDD-XXXX`)

---

## Regole economiche (coerenti con la tua policy “anticipo rimborsabile se rifiuto”)

### Digitalizzazione (Percorso A)

* Anticipo variabile: **rimborsabile al 100% solo se rifiuti tu** per rischio tecnico riscontrato in sede.
* Se lavori: anticipo scalato, saldo alla consegna.
* No-show/cancellazione tardiva: anticipo non rimborsabile (standard operativo).

### Check-up (Percorso B)

* €30 sempre dovuti.
* Scalati dal totale se procedono (entro finestra definita).

Questo disincentiva bobine problematiche “a gratis” e ti evita lavoro non pagato, mantenendo un pricing percepito semplice.

---

## Testi brevi da inserire nel sito (sezione “Preventivo”)

**“Preventivo in 60 secondi.”**
“Ti chiediamo: stato bobine + quantità + dimensioni. Calcoliamo una stima minuti e la fascia prezzo. Se la pellicola è integra prenoti la digitalizzazione con anticipo proporzionale. Se ci sono dubbi prenoti un check-up a €30 (scalabile).”

**“Trasparenza totale.”**
“Niente spedizioni. Inventario locale. File conservati 15 giorni. Saldo alla consegna.”

---

## Anticipo variabile (riassunto pronto per pagina prezzi)

**Anticipo prenotazione (scalato dal totale):**

* 0–30 min: €20
* 31–60 min: €30
* 61–120 min: €40
* 121–180 min: €50
* 181–240 min: €60
* 241–300 min: €70
* 300+ min: €80

**Check-up bobine (solo se serve): €30** (scalabile dal totale)

---

## Nota operativa: perché funziona

* Il cliente capisce il prezzo **prima** di portarti le bobine.
* Tu ricevi una richiesta “completa” (minuti stimati, fascia, dichiarazioni).
* L’anticipo cresce con il carico → riduce lavori lunghi “a rischio”.
* Il check-up monetizza l’incertezza tecnica senza trasformare tutto in burocrazia.
