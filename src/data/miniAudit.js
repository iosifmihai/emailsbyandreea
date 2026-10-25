/**
 * The pre-Black Friday mini-audit campaign page (/mini-audit-black-friday).
 *
 * Romanian, unlike the rest of the site: the campaign is for Romanian online
 * stores. Sign-ups go to a Google Form, so `formUrl` must be filled in before
 * the page is linked anywhere. Set `open` to false once sign-ups close and the
 * page swaps its buttons for a closed notice.
 */
export const miniAudit = {
  path: "/mini-audit-black-friday",
  open: true,
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeqjlXe0tYhryaOGSUuCmvZera4WVlB5GmAgk6cAY_02m8toQ/viewform",
  showRules: false,
  deadline: "5 noiembrie 2026",

  metaTitle: "Mini-audit email gratuit pre-Black Friday",
  metaDescription:
    "Pregătim împreună emailurile tale pentru Black Friday. Mini-audit gratuit al contului de email marketing, cu raport PDF. Înscrieri până pe 5 noiembrie 2026, locuri limitate.",

  eyebrow: "Mini-audit gratuit · până pe 5 noiembrie",
  heading: "Auditez contul tău de email marketing înainte de Black Friday",
  lead:
    "Îți analizez gratuit contul de email marketing și primești un raport cu tot ce ai nevoie înainte de cele mai importante trimiteri ale anului.",
  cta: "Vreau mini-auditul",
  ctaNote: "Gratuit. Locuri limitate.",
  closedNote: "Înscrierile pentru mini-audit s-au încheiat. Mulțumesc tuturor celor care s-au înscris!",

  visualCaption: "Automatizarea de abandon coș, unul dintre flow-urile pe care le verific înainte de Black Friday.",

  areasLabel: "Ce analizez",
  areasHeading: "Cinci zone, verificate înainte de vârful de trafic",
  areas: [
    {
      title: "Audit tehnic",
      copy: "Autentificarea domeniului (SPF, DKIM, DMARC), setările de trimitere și semnalele vizibile despre livrabilitate. Ajung emailurile tale în inbox?",
    },
    {
      title: "Audit automatizări",
      copy: "Ce flow-uri există și dacă funcționează corect atunci când traficul crește.",
    },
    {
      title: "Campanii",
      copy: "Frecvența, subiectele, designul și mesajul ultimelor newslettere. Ce merită schimbat înainte de trimiterile mari.",
    },
    {
      title: "Baza de date",
      copy: "Igiena listei, abonații inactivi și segmentarea după engagement. Cine primește acces din timp și cui nu îi trimiți cinci emailuri pe zi.",
    },
    {
      title: "Pop-up-uri",
      copy: "Pop-up-urile și formularele de abonare. Colectezi abonați noi înainte de Black Friday?",
    },
  ],

  stepsLabel: "Cum funcționează",
  stepsHeading: "De la înscriere la raport, în trei pași",
  steps: [
    {
      title: "Te înscrii",
      copy: "Completezi formularul cu câteva detalii despre magazin și contul de email. Durează cam trei minute.",
    },
    {
      title: "Îți confirm locul",
      copy: "În maximum 24 de ore îți scriu pe email și stabilim cum văd contul: acces de vizualizare sau capturi de ecran.",
    },
    {
      title: "Primești raportul PDF",
      copy: "În cel mult 3 zile lucrătoare primești constatările pe fiecare zonă, problemele prioritare și recomandările de aplicat înainte de Black Friday.",
    },
  ],

  fitLabel: "Pentru cine e",
  fitHeading: "E potrivit dacă…",
  fit: [
    "ai un magazin online",
    "folosești deja o platformă de email marketing (theMarketer, Klaviyo, Omnisend, Mailchimp sau alta)",
    "ai cel puțin 1.000 de abonați în listă",
    "vrei să intri în Black Friday cu contul verificat",
  ],
  notIncludedHeading: "Ce nu include",
  notIncluded: [
    "implementarea recomandărilor",
    "crearea sau modificarea de emailuri, automatizări, segmente sau pop-up-uri",
    "auditul complet al contului (serviciu separat)",
    "analiza altor canale de marketing",
  ],

  rulesLabel: "Regulament",
  rulesHeading: "Regulamentul campaniei",
  rules: [
    {
      title: "1. Organizator",
      paragraphs: [
        "Campania este organizată de [DENUMIRE PFA / FIRMĂ], CUI [CUI], cu sediul în [ADRESĂ], sub brandul Emails by Andreea (emailsbyandreea.com), denumit în continuare „Organizatorul”.",
      ],
    },
    {
      title: "2. Perioada",
      paragraphs: [
        "Înscrierile se fac până pe 5 noiembrie 2026, ora 23:59, sau până la ocuparea tuturor locurilor, dacă acestea se ocupă mai devreme. Mini-auditul se livrează în cel mult 3 zile lucrătoare de la confirmarea înscrierii și primirea accesului la cont.",
      ],
    },
    {
      title: "3. Cine se poate înscrie",
      paragraphs: [
        "Se pot înscrie magazinele online care folosesc deja o platformă de email marketing, au cel puțin 1.000 de abonați în lista de email și pot oferi acces de vizualizare la cont sau capturi de ecran relevante. Se acceptă o singură înscriere per brand.",
      ],
    },
    {
      title: "4. Număr de locuri",
      paragraphs: [
        "Numărul de locuri este limitat. Înscrierile sunt analizate în ordinea primirii, iar Organizatorul confirmă prin email înscrierile acceptate.",
      ],
    },
    {
      title: "5. Ce include mini-auditul",
      paragraphs: [
        "O analiză a contului de email marketing, concentrată pe pregătirea pentru Black Friday, pe cinci zone: audit tehnic (autentificarea domeniului, setările de trimitere și livrabilitatea), audit automatizări, campanii, baza de date și pop-up-uri.",
        "Participantul primește un raport PDF cu constatările pe fiecare zonă, problemele prioritare și recomandările de aplicat înainte de Black Friday.",
      ],
    },
    {
      title: "6. Ce nu include mini-auditul",
      paragraphs: [
        "Implementarea recomandărilor; crearea sau modificarea de emailuri, automatizări, segmente sau pop-up-uri; auditul complet al contului, care este un serviciu separat, contra cost; analiza detaliată a datelor financiare sau a altor canale de marketing; consultanța continuă; vreo garanție privind rezultatele campaniilor de Black Friday.",
      ],
    },
    {
      title: "7. Accesul la cont",
      paragraphs: [
        "Pentru audit este suficient un acces de tip vizualizare, acolo unde platforma îl permite, sau capturi de ecran. Organizatorul nu modifică nimic în cont. Participantul poate retrage accesul după primirea raportului.",
      ],
    },
    {
      title: "8. Confidențialitate",
      paragraphs: [
        "Informațiile din contul participantului sunt folosite exclusiv pentru realizarea mini-auditului. Ele nu se publică și nu se transmit terților. La cerere, Organizatorul poate semna un acord de confidențialitate (NDA).",
      ],
    },
    {
      title: "9. Date personale",
      paragraphs: [
        "Datele trimise prin formular (nume, email, telefon, brand, site și informațiile despre contul de email) sunt prelucrate de Organizator pentru a analiza înscrierea, a realiza mini-auditul și a comunica cu participantul despre acesta. Datele se păstrează cel mult 12 luni de la finalul campaniei.",
        "Participantul are dreptul de acces, rectificare, ștergere, restricționare și opoziție, pe care îl poate exercita scriind la contact@emailsbyandreea.com. Mai multe detalii se găsesc în Politica de confidențialitate. Abonarea la newsletterul Emails by Andreea se face doar cu acord separat, bifat explicit în formular.",
      ],
    },
    {
      title: "10. Fără obligații",
      paragraphs: [
        "Mini-auditul este gratuit și nu obligă participantul la achiziția vreunui serviciu. Dacă participantul dorește implementarea recomandărilor, Organizatorul îi poate trimite o ofertă separată.",
      ],
    },
    {
      title: "11. Dreptul de a refuza sau de a modifica",
      paragraphs: [
        "Organizatorul poate refuza înscrierile care nu îndeplinesc condițiile de la punctul 3. Organizatorul poate modifica sau încheia campania mai devreme, cu anunț pe această pagină.",
      ],
    },
    {
      title: "12. Contact",
      paragraphs: ["Pentru orice întrebare legată de campanie: contact@emailsbyandreea.com."],
    },
  ],

  closingHeading: "Intră în Black Friday cu emailurile verificate.",
  closingCopy: "Înscrierile se încheie pe 5 noiembrie 2026 sau mai devreme, dacă se ocupă locurile.",
};
