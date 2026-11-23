# City Explorer — laboratorul 4

## Cum pornește

Sunt necesare **două terminale**, deschise amândouă în folderul proiectului.

În primul, serverul de date (rămâne pornit tot laboratorul):

```
npm install
npx json-server db.json --port 3001
```

În al doilea, aplicația:

```
npm run dev
```

Apoi se deschide http://localhost:5173. Verificare rapidă: la
http://localhost:3001/destinatii trebuie să apară lista celor șase destinații
în format JSON.

Arhiva nu conține `node_modules`, de aceea primul pas este `npm install`.

## Unde este fiecare exercițiu

| Exercițiu | Fișiere |
| --- | --- |
| 1a — modulul de cereri | `src/api/destinatii.js` |
| 1b — încărcarea la pornire | `useEffect` și stările `destinatii`, `incarcare`, `eroare` din `src/App.jsx` |
| 1c — marcarea pe server | `handleToggle` din `src/App.jsx` |
| 2a — valorile într-un singur obiect | `src/components/FormularDestinatie.jsx` |
| 2b — funcția de validare | `valideaza(valori)`, în același fișier |
| 2c — afișarea mesajelor | clasele `camp`, `invalid`, `eroare-camp`, în același fișier |
| 3a — câmpul de căutare | `src/components/Cautare.jsx` |
| 3b — filtrarea | `afisate` din `src/App.jsx` |
| 3c — lista goală | cele două paragrafe cu clasa `gol` din `src/App.jsx` |
| 3d — stilurile stărilor | finalul fișierului `src/App.css`, sub comentariu |
| 4 — depanarea | `src/components/PanouStatistici.jsx`, corectat; varianta cu greșeli e în `exercitiul-4/` |
| 5a — setul mare | `genereaza.js`, rulat cu `node genereaza.js`, produce `db-mare.json` |
| 5c — paginarea | `getDestinatii(pagina)`, stările `pagina` și `totalPagini`, butoanele Înapoi/Înainte |

## Exercițiul 4: cele șapte greșeli

În `exercitiul-4/` se află varianta primită, cu greșeli, pentru comparație:
`PanouStatistici.gresit.jsx` și `stiluri-gresite.css`. Versiunea corectată este
cea din `src/components/PanouStatistici.jsx`, iar stilurile corectate sunt la
finalul lui `src/App.css`.

Panoul nu este montat în `App.jsx`, pentru că la finalul lucrării aplicația
arată ca în figura 1, fără el. Ca să se vadă, se adaugă în `src/App.jsx`:

```jsx
import PanouStatistici from './components/PanouStatistici.jsx'

// în return, imediat sub <h1>
<PanouStatistici />
```

Cu pragul 3 trebuie să arate 4 destinații, 18 zile și media 4.5.

## Exercițiul 5: setul de două mii

```
node genereaza.js
npx json-server db-mare.json --port 3002
```

În `src/api/destinatii.js` se schimbă temporar portul din `3001` în `3002`.
**La finalul măsurătorilor se pune înapoi pe 3001**, ca aplicația să revină la
cele șase destinații.

## Ce rămâne de făcut la laborator

Fișa cere valori citite din fila Network și capturi de ecran, care nu se pot
face decât pe calculatorul propriu, cu aplicația pornită. Coloanele „Valoare
măsurată", „Dacă diferă, de ce" și toate casetele de captură sunt goale în fișa
din arhivă.
