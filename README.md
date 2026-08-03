# Potato Strike

Lekki CS-like prototyp w HTML Canvas. Dziala bez serwera przez otwarcie `index.html`.

Repozytorium gry: [teralubo/potato-strike](https://github.com/teralubo/potato-strike)

Licencja: GNU GPL 3.0 (`GPL-3.0-only`). Potato Strike ma byc lekkim sandboxem LAN/BOT do edycji, modowania i przerabiania przez graczy.

Workflow repo:
- `beta` - wszystkie nowe zmiany, testy, eksperymenty i wersje beta.
- `main` - pelne wydanie gry po potwierdzeniu.

## Uruchamianie w przegladarce

- Kliknij dwa razy `index.html`, albo uruchom `launch-browser.bat`.
- Alternatywnie uruchom lokalny serwer:

```powershell
npm run serve
```

- Otworz `http://localhost:8787`.
- W menu wybierz tryb, strone startowa, mape i grafike 2D/3D.
- Mozesz wybrac rozmiar meczu: 1v1, 2v2, 3v3, 4v4, 5v5, 8v8 albo 10v10.
- Priorytetem jest tryb BOTY. LAN ma pokoj i uzupelnianie skladu botami.
- Pod `I` sa bindy. Kliknij akcje i nacisnij nowy klawisz.
- W ustawieniach mozna wlaczyc sterowanie telefonem, wtedy pojawiaja sie przyciski dotykowe.
- Generator map jest w menu startowym i tworzy mape `Generated`.

## Lokalny build .exe

Repo ma szkielet Electron, ale samo `.exe` wymaga pobrania zaleznosci Node.

```powershell
npm install
npm run start
npm run start:editor
npm run build:win
npm run build:linux
```

Po zbudowaniu instalator i pliki `.exe` beda w katalogu `dist/`.
Folder gry bez osobnego `release` ani lokalnego folderu `beta` przygotujesz komenda:

```powershell
npm run package:offline
```

Wtedy glowny katalog projektu jest gotowym folderem gry: ma `PotatoStrike.exe`, `PotatoStrike.bat`, `PotatoStrike-Window.bat`, `PotatoStrike-Studio.bat`, `configs/` i `mods/`.
Wersja testowa trafia na branch GitHuba `beta`, nie do folderu `beta/`.
Po `npm install` launcher `PotatoStrike-Window.bat` uruchamia gre jako osobne okno/proces Electron, bez zwyklej karty przegladarki. Pelny plik `.exe` powstaje po `npm run build:win`.
Launcher `PotatoStrike-Studio.bat` uruchamia osobne okno edytora Studio. Na Linuxie build jest w `dist/linux-unpacked/`, a edytor mozna uruchomic argumentem `--editor`.
Configi startowe sa w folderze `configs/`, a export configu zawiera tez mapy i misje stworzone przez gracza. W wersji Electron przycisk eksportu zapisuje config bezposrednio do `configs/`; w wersji HTML pobiera JSON przez przegladarke.

## Tryb fabularny i edytor

- W menu wybierz `Tryb fabularny`, aby grac zapisane misje.
- `EDYTOR` otwiera osobne okno Potato Strike Studio. To lekki graficzny sandbox do map i trybow: widok 2D albo edytowalny 3D, paleta obiektow, workspace z siatka, explorer obiektow, panel wlasciwosci, ustawienia trybu gry, dodawanie, przesuwanie, usuwanie, rozmiar, rotacja, kolor, bombsite A/B, spawny T/CT, triggery, logika, pickupy broni, propy i tekstury.
- Misje zapisuja sie lokalnie i mozna je pozniej zaladowac w przegladarce albo w buildzie offline.
- Generator moze stworzyc losowa mape i misje jako punkt startowy, a potem mozna je normalnie poprawiac w edytorze.
- Studio ma przycisk `Testuj`, ktory uruchamia gre na edytowanej mapie bez potrzeby edycji aktualnej rundy.
- Studio ma liste plikow assetow: mozna dodawac tekstury, JSON, JS, TXT i CSS do sandboxa/modow.
- W puli sa lekkie mapy inspirowane klasykami CS: Dust II, Mirage, Inferno, Nuke, Overpass, Vertigo, Ancient, Anubis, Train, Cache, Office, Italy, Tuscan, Cobblestone i Assault.

## Config

- Config jest profilem gracza. Zawiera nick gracza, automatycznie wygenerowane ID gracza, ustawienia, celownik i bindy.
- Gracz moze nadac nick przy tworzeniu profilu, ale nie nadaje sam ID.
- W menu glownym w rogu jest menu profili: nowy profil, lista profili, wczytanie, import i export.
- Profil zawiera tez `configId`, wygenerowane mapy, misje fabularne, tekstury i mody.
- W wersji Electron profil zapisuje sie w `configs/players/<playerId>/` jako folder danych gracza: `profile.json`, `maps.json`, `missions.json`, `assets.json`.
- W ustawieniach mozna pobrac albo wgrac profil JSON.
- Pauza jest domyslnie pod `P`, a komendy lobby pod klawiszem konsoli.

## Edytor i mody

- W menu jest przycisk `EDYTOR`, ktory od razu otwiera sandbox edytora.
- Edytor pozwala dodawac sciany, skrzynie, oslony, rampy, swiatla, spawny, triggery, logike, bronie i propy.
- Mozna wgrac wlasna teksture, zapisac mape, zapisac misje albo wyeksportowac modpack.
- Folder `mods/` sluzy do modow JSON/JS w wersji offline. Import kodu w UI dziala przez prosty sandbox API.
- W menu ustawien jest wybor jezyka PL/EN.

## Status online/LAN

Offline z botami jest grywalny. Online/LAN maja menu konfiguracyjne i fallback do botow.
`server.js` ma lekki lokalny serwer i endpoint heartbeat dla pokoi LAN, ale prawdziwa synchronizacja meczu gracz kontra gracz wymaga jeszcze podpiecia klienta do stanu serwera.

## README MADE BY AI
## MESSAGE FROM TERALUBO: play
