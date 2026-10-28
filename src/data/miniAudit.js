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
  showRules: true,
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
      copy: "Analizez doar campaniile pe care plănuiești să le trimiți de Black Friday: frecvența, subiectele, designul și mesajul. Ce merită schimbat înainte de trimiterile mari.",
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
      copy: "În maximum 24 de ore îți scriu pe email și îți trimit pașii prin care îmi dai acces la cont, ca utilizator invitat. Auditul se face doar cu acces direct în cont.",
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
    "îmi poți da acces direct în contul de email marketing",
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
  rulesHeading: "Regulamentul oficial al campaniei „Mini-audit gratuit pre-Black Friday”",
  rulesUpdated: "Versiunea în vigoare din 28 octombrie 2026",
  rules: [
    {
      title: "Art. 1. Organizatorul",
      paragraphs: [
        "1.1. Organizatorul campaniei „Mini-audit gratuit pre-Black Friday” (denumită în continuare „Campania”) este PĂCURAR ANDREEA-ALEXANDRA PERSOANĂ FIZICĂ AUTORIZATĂ, cu sediul profesional în Municipiul Sibiu, Strada Strugurilor nr. 29, județul Sibiu, înregistrată la Oficiul Registrului Comerțului de pe lângă Tribunalul Sibiu sub nr. F2026019064000, cod unic de înregistrare 54451514, adresă de email contact@emailsbyandreea.com, care își desfășoară activitatea sub denumirea comercială „Emails by Andreea” (denumit în continuare „Organizatorul”).",
        "1.2. Campania se desfășoară în conformitate cu prevederile prezentului regulament (denumit în continuare „Regulamentul”), ale căror dispoziții sunt obligatorii pentru toți participanții.",
        "1.3. Regulamentul este pus la dispoziția oricărei persoane interesate, în mod gratuit, pe pagina https://emailsbyandreea.com/mini-audit-black-friday, pe toată durata Campaniei.",
      ],
    },
    {
      title: "Art. 2. Definiții",
      paragraphs: [
        "În sensul prezentului Regulament, termenii de mai jos au următoarele înțelesuri:",
        "a) „Participant”: persoana juridică, persoana fizică autorizată, întreprinderea individuală sau familială care deține ori administrează un magazin online și care se înscrie în Campanie, prin Reprezentantul său, cu respectarea condițiilor prevăzute la art. 5;",
        "b) „Reprezentant”: persoana fizică ce completează Formularul în numele Participantului și care declară că are dreptul de a-l reprezenta;",
        "c) „Contul”: contul Participantului deschis pe o platformă de email marketing;",
        "d) „Formularul”: formularul online de înscriere în Campanie, pus la dispoziție de Organizator;",
        "e) „Mini-auditul”: serviciul gratuit de analiză a Contului, descris la art. 7;",
        "f) „Raportul”: documentul în format PDF care cuprinde rezultatele Mini-auditului.",
      ],
    },
    {
      title: "Art. 3. Natura Campaniei",
      paragraphs: [
        "3.1. Campania are ca obiect prestarea gratuită, cu titlu promoțional, a Mini-auditului către Participanții eligibili. Participarea nu este condiționată de achiziționarea vreunui produs sau serviciu și nu implică tragere la sorți, acordarea de premii ori plata vreunei sume de bani.",
        "3.2. Campania se adresează exclusiv profesioniștilor, în sensul art. 3 din Codul civil, care acționează în scopul activității lor economice. Campania nu se adresează consumatorilor.",
      ],
    },
    {
      title: "Art. 4. Durata și modul de desfășurare",
      paragraphs: [
        "4.1. Înscrierile în Campanie se pot efectua de la data publicării prezentului Regulament până la data de 5 noiembrie 2026, ora 23:59 (ora României) sau până la epuizarea locurilor disponibile, oricare dintre aceste evenimente intervine primul.",
        "4.2. Înscrierile transmise după expirarea termenului prevăzut la art. 4.1 nu vor fi luate în considerare.",
        "4.3. Campania se desfășoară exclusiv online. Mini-auditul se realizează, iar Raportul se redactează, în limba română sau, la cererea Participantului, în limba engleză.",
      ],
    },
    {
      title: "Art. 5. Condiții de eligibilitate",
      paragraphs: [
        "5.1. Pot participa la Campanie Participanții care îndeplinesc cumulativ următoarele condiții:",
        "a) operează un magazin online funcțional;",
        "b) utilizează o platformă de email marketing activă (de exemplu theMarketer, Klaviyo, Omnisend, Mailchimp sau alta similară);",
        "c) au cel puțin 1.000 (o mie) de abonați în lista de email;",
        "d) pot acorda Organizatorului acces direct la Cont, în condițiile art. 9 lit. c);",
        "e) au completat integral Formularul, cu informații reale, exacte și actuale;",
        "f) au acceptat prezentul Regulament.",
        "5.2. Se admite o singură înscriere pentru fiecare brand sau magazin online. Înscrierile multiple pentru același brand sau magazin vor fi considerate o singură înscriere.",
        "5.3. Organizatorul poate solicita Participantului informații suplimentare, în scopul verificării îndeplinirii condițiilor de eligibilitate.",
      ],
    },
    {
      title: "Art. 6. Mecanismul Campaniei",
      paragraphs: [
        "6.1. Înscrierea se realizează exclusiv prin completarea și transmiterea Formularului, în perioada prevăzută la art. 4.1.",
        "6.2. Numărul de locuri este limitat și se stabilește de Organizator în funcție de capacitatea sa de lucru. Înscrierile se analizează în ordinea cronologică a primirii.",
        "6.3. Organizatorul comunică Participantului, prin email, acceptarea înscrierii, de regulă în termen de 24 de ore, dar nu mai târziu de 2 (două) zile lucrătoare de la primirea Formularului. Organizatorul poate respinge înscrierile care nu îndeplinesc condițiile prevăzute la art. 5 și va comunica respingerea prin email.",
        "6.4. Raportul se transmite Participantului, prin email, în termen de cel mult 3 (trei) zile lucrătoare de la data la care Organizatorul a primit accesul la Cont.",
        "6.5. În cazul în care Participantul nu acordă accesul la Cont în termen de 3 (trei) zile lucrătoare de la confirmarea înscrierii, Organizatorul poate considera înscrierea anulată și poate realoca locul.",
      ],
    },
    {
      title: "Art. 7. Obiectul Mini-auditului",
      paragraphs: [
        "7.1. Mini-auditul constă într-o analiză a Contului, orientată spre pregătirea campaniilor de Black Friday, care vizează următoarele cinci domenii:",
        "a) audit tehnic: autentificarea domeniului de trimitere (SPF, DKIM, DMARC), setările de trimitere și indicatorii de livrabilitate disponibili;",
        "b) audit al automatizărilor: existența, configurarea și funcționarea fluxurilor automate;",
        "c) campanii: frecvența, subiectele, designul și conținutul campaniilor pe care Participantul le planifică pentru Black Friday; campaniile care nu au legătură cu Black Friday nu fac obiectul analizei;",
        "d) baza de date: igiena listei de abonați, abonații inactivi și segmentarea;",
        "e) pop-up-uri: pop-up-urile și formularele de abonare utilizate pentru colectarea abonaților.",
        "7.2. Raportul cuprinde constatările pentru fiecare dintre domeniile prevăzute la art. 7.1, problemele identificate ca prioritare și recomandările Organizatorului.",
        "7.3. Mini-auditul are caracter punctual și se realizează exclusiv prin accesarea directă a Contului de către Organizator, pe baza informațiilor disponibile în Cont la data analizei.",
        "7.4. Accesul direct la Cont este o condiție esențială a Mini-auditului. Capturile de ecran, exporturile sau orice alte materiale transmise de Participant nu pot înlocui accesul la Cont și nu sunt acceptate în acest scop.",
      ],
    },
    {
      title: "Art. 8. Servicii care nu sunt incluse",
      paragraphs: [
        "Mini-auditul nu include:",
        "a) implementarea recomandărilor cuprinse în Raport;",
        "b) crearea sau modificarea de emailuri, automatizări, segmente, pop-up-uri ori a oricăror alte elemente din Cont;",
        "c) auditul complet al Contului, care constituie un serviciu distinct, contra cost;",
        "d) analiza detaliată a datelor financiare ale Participantului sau a altor canale de marketing;",
        "e) consultanță continuă, ședințe de lucru sau suport ulterior transmiterii Raportului.",
        "Orice serviciu suplimentar poate fi prestat numai în baza unei oferte separate și a unui acord încheiat între Organizator și Participant.",
      ],
    },
    {
      title: "Art. 9. Obligațiile Participantului",
      paragraphs: [
        "Participantul se obligă:",
        "a) să furnizeze informații reale, exacte și complete;",
        "b) să garanteze că Reprezentantul are dreptul de a-l reprezenta și de a acorda accesul la Cont;",
        "c) să acorde accesul la Cont prin invitarea unui utilizator, cu drepturi de vizualizare acolo unde platforma permite acest lucru, fără a transmite parole sau alte date de autentificare;",
        "d) să retragă accesul acordat Organizatorului după primirea Raportului, dacă dorește acest lucru;",
        "e) să răspundă pentru legalitatea colectării și a prelucrării datelor abonaților din Cont.",
      ],
    },
    {
      title: "Art. 10. Obligațiile Organizatorului",
      paragraphs: [
        "Organizatorul se obligă:",
        "a) să realizeze Mini-auditul cu diligența profesională cerută de natura serviciului;",
        "b) să nu modifice niciun element din Cont;",
        "c) să nu descarce, să nu exporte, să nu copieze și să nu stocheze datele abonaților Participantului;",
        "d) să respecte obligațiile de confidențialitate prevăzute la art. 11.",
      ],
    },
    {
      title: "Art. 11. Confidențialitate",
      paragraphs: [
        "11.1. Toate informațiile din Cont, precum și cele furnizate de Participant în cadrul Campaniei, sunt considerate confidențiale. Organizatorul le va utiliza exclusiv în scopul realizării Mini-auditului și nu le va divulga terților, cu excepția cazurilor în care divulgarea este impusă de lege sau de o autoritate competentă.",
        "11.2. Nu sunt considerate confidențiale informațiile care sunt sau devin publice fără vreo culpă a Organizatorului.",
        "11.3. La solicitarea Participantului, Organizatorul poate încheia un acord de confidențialitate separat.",
        "11.4. Obligația de confidențialitate se menține pe o perioadă de 2 (doi) ani de la data încetării Campaniei.",
      ],
    },
    {
      title: "Art. 12. Proprietate intelectuală",
      paragraphs: [
        "12.1. Raportul, structura, metodologia și conținutul acestuia constituie proprietatea intelectuală a Organizatorului. Participantul dobândește un drept neexclusiv, gratuit și netransmisibil de a utiliza Raportul pentru nevoile sale interne, inclusiv de a-l transmite colaboratorilor săi în scopul implementării recomandărilor.",
        "12.2. Fără acordul prealabil scris al Organizatorului, Participantul nu poate publica, comercializa sau pune Raportul la dispoziția publicului.",
        "12.3. Organizatorul nu va utiliza denumirea, marca, datele sau rezultatele Participantului în materiale de prezentare ori de promovare (inclusiv studii de caz sau testimoniale) fără acordul prealabil scris al acestuia. Organizatorul poate utiliza concluzii generale, agregate și complet anonimizate, din care Participantul nu poate fi identificat.",
      ],
    },
    {
      title: "Art. 13. Limitarea răspunderii",
      paragraphs: [
        "13.1. Recomandările cuprinse în Raport au caracter informativ. Decizia de a le implementa, precum și modul de implementare, aparțin exclusiv Participantului.",
        "13.2. Organizatorul nu garantează obținerea unor rezultate comerciale determinate, rezultatele campaniilor de email marketing depinzând de factori care nu se află sub controlul său.",
        "13.3. Având în vedere caracterul gratuit al Mini-auditului, în limitele permise de art. 1355 din Codul civil, Organizatorul nu răspunde pentru prejudiciile indirecte, pierderile de profit sau de venituri ori pentru rezultatele campaniilor Participantului, decurgând din implementarea sau neimplementarea recomandărilor, cu excepția prejudiciilor cauzate cu intenție sau din culpă gravă.",
        "13.4. Organizatorul nu răspunde pentru funcționarea platformelor terțe, pentru întârzierile cauzate de Participant sau pentru consecințele furnizării de către acesta a unor informații incomplete ori inexacte.",
      ],
    },
    {
      title: "Art. 14. Forța majoră și cazul fortuit",
      paragraphs: [
        "Forța majoră și cazul fortuit, astfel cum sunt definite la art. 1351 din Codul civil, exonerează de răspundere partea care le invocă, în condițiile legii. Organizatorul va informa Participanții, prin email sau pe pagina Campaniei, cu privire la imposibilitatea de a-și îndeplini obligațiile.",
      ],
    },
    {
      title: "Art. 15. Protecția datelor cu caracter personal",
      paragraphs: [
        "15.1. Organizatorul prelucrează datele cu caracter personal în calitate de operator, cu respectarea Regulamentului (UE) 2016/679 („GDPR”) și a Legii nr. 190/2018.",
        "15.2. Categoriile de date prelucrate sunt: numele și prenumele, adresa de email, numărul de telefon (opțional) ale Reprezentantului, precum și informațiile furnizate prin Formular cu privire la Participant și la Cont.",
        "15.3. Datele sunt prelucrate în următoarele scopuri și temeiuri: a) analiza înscrierii, realizarea Mini-auditului și comunicarea cu Participantul, în temeiul art. 6 alin. (1) lit. (b) și (f) din GDPR; b) transmiterea newsletterului Emails by Andreea, numai pe baza consimțământului exprimat separat, în temeiul art. 6 alin. (1) lit. (a) din GDPR, consimțământ care poate fi retras oricând; c) îndeplinirea obligațiilor legale și apărarea drepturilor Organizatorului, în temeiul art. 6 alin. (1) lit. (c) și (f) din GDPR.",
        "15.4. Datele pot fi comunicate furnizorilor de servicii utilizați de Organizator pentru colectarea formularelor, stocare și comunicare prin email (de exemplu Google), care acționează în calitate de persoane împuternicite. În cazul transferurilor în afara Spațiului Economic European, acestea se realizează pe baza garanțiilor prevăzute de GDPR, precum Cadrul UE-SUA privind protecția datelor sau clauzele contractuale standard. Organizatorul nu vinde datele cu caracter personal.",
        "15.5. Datele se păstrează cel mult 12 (douăsprezece) luni de la data încetării Campaniei. Datele prelucrate în baza consimțământului se păstrează până la retragerea acestuia, iar în cazul încheierii unui contract între părți, pe durata acestuia și ulterior, potrivit termenelor legale.",
        "15.6. Persoanele vizate beneficiază de dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, de portabilitate, de opoziție și de retragere a consimțământului, pe care le pot exercita printr-o cerere transmisă la contact@emailsbyandreea.com. Persoanele vizate au, de asemenea, dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (www.dataprotection.ro).",
        "15.7. Cu privire la datele abonaților din Cont, Participantul are calitatea de operator. Organizatorul accesează aceste date exclusiv în modul vizualizare și strict în scopul realizării Mini-auditului, fără a le extrage, copia sau stoca.",
        "15.8. Informații suplimentare se regăsesc în Politica de confidențialitate disponibilă pe site-ul emailsbyandreea.com.",
      ],
    },
    {
      title: "Art. 16. Modificarea și încetarea Campaniei",
      paragraphs: [
        "16.1. Organizatorul poate modifica prezentul Regulament prin act adițional publicat pe pagina Campaniei. Modificările intră în vigoare la data publicării și nu afectează înscrierile deja confirmate.",
        "16.2. Campania poate înceta înainte de termenul prevăzut la art. 4.1 în caz de epuizare a locurilor disponibile, în caz de forță majoră sau prin decizia Organizatorului, comunicată pe pagina Campaniei. Înscrierile confirmate până la data încetării vor fi onorate.",
      ],
    },
    {
      title: "Art. 17. Legea aplicabilă și soluționarea litigiilor",
      paragraphs: [
        "17.1. Prezentul Regulament este guvernat de legea română.",
        "17.2. Eventualele neînțelegeri dintre Organizator și Participanți se soluționează pe cale amiabilă. În cazul în care soluționarea amiabilă nu este posibilă, litigiile vor fi deduse spre soluționare instanțelor judecătorești competente de la sediul Organizatorului.",
      ],
    },
    {
      title: "Art. 18. Dispoziții finale",
      paragraphs: [
        "18.1. Prin transmiterea Formularului, Participantul, prin Reprezentantul său, confirmă că a citit, a înțeles și acceptă în integralitate prevederile prezentului Regulament.",
        "18.2. În cazul în care o prevedere a Regulamentului este declarată nulă sau inaplicabilă, celelalte prevederi își păstrează valabilitatea.",
        "18.3. Comunicările dintre Organizator și Participant se realizează prin email, la adresele indicate în Formular, respectiv la contact@emailsbyandreea.com.",
        "18.4. Prezentul Regulament este redactat în limba română. În cazul traducerii sale în alte limbi, versiunea în limba română prevalează.",
      ],
    },
  ],

  closingHeading: "Intră în Black Friday cu emailurile verificate.",
  closingCopy: "Înscrierile se încheie pe 5 noiembrie 2026 sau mai devreme, dacă se ocupă locurile.",
};
