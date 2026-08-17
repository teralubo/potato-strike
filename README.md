# Potato Strike

Lekki CS-like sandbox w HTML Canvas. Dziala bez serwera przez otwarcie `PotatoStrike.html`.

Repozytorium gry: [teralubo/potato-strike](https://github.com/teralubo/potato-strike)

Licencja: GNU GPL 3.0 (`GPL-3.0-only`). Potato Strike ma byc lekkim sandboxem LAN/BOT do edycji, modowania i przerabiania przez graczy.

Workflow repo:
- `unreleased` - eksperymentalne pomysly i szkice kolejnego update.
- `beta` - zmiany gotowe do szerszych testow.
- `main` - wydania zaakceptowane do publikacji.

## 1.2 FINAL Sandbox Studio

Wersja `1.2 FINAL` rozwija Potato Strike w lekka platforme sandbox:

- Studio ma osobny plan misji 2D inspirowany klasycznym workflow Arma 2 oraz bezposredni edytor sceny 3D inspirowany Eden/Arma 3.
- W 2D sa tryby obiektow, grup, triggerow, waypointow, synchronizacji i markerow pod `F1`-`F6`, zaznaczanie wielu obiektow, prostokat zaznaczenia, kopiowanie, zoom i przesuwanie mapy.
- W 3D jest prawdziwa kamera perspektywiczna, bezposrednie zaznaczanie i ustawianie obiektow, ruch `WASD`, gora/dol `Q/Z`, obracanie kamery PPM oraz narzedzia `1`-`4`: wybor, przesuwanie, obracanie i skala.
- Warstwy mozna tworzyc, ukrywac i blokowac. Explorer oraz panel wlasciwosci obsluguja obiekty, jednostki T/CT, grupy, triggery, waypointy, markery, systemy i pickupy.
- Format map `editorData.version: 2` zachowuje stare `obstacles`, dzieki czemu mapy 1.1 nadal sie wczytuja.
- Test Studio przekazuje do gry spawny jednostek, trasy botow, pickupy i kod triggerow.
- Renderer FPS ma poprawiona wysokosc scian, rotacje kolizji, czytelniejsze modele, mgle, teren i lekkie proceduralne materialy bez pobierania duzych tekstur.
- Tryb 3D ma skok, kucanie, kamere gora/dol oraz granaty wybierane z ekwipunku, rzucane po puszczeniu LPM i zsynchronizowany jump-throw.
- Foldery w `mods/` sa kategoriami menedzera modow. Domyslny, wylaczony mod `mods/default/fps_info` pokazuje maly licznik FPS.
- Ustawienia zawieraja nielimitowane, zapisywane w profilu `Fast Bind`, np. `F` do zakupu calego zestawu: broni, kamizelki i granatu. Kazdy wpis mozna wlaczyc, wylaczyc lub usunac, a pelny stan jest eksportowany z configiem. Skroty respektuja pieniadze, buy time i ograniczenia stron.
- Domyslny V-Sync laczy odswiezanie z ekranem i presetem wydajnosci; nadal mozna wybrac reczny limit 30/60/120 lub maksymalna szybkosc przegladarki.
- Dowodca pokoju LAN zarzadza server configiem, widocznoscia enemy na minimapie i konsola w stylu CS/GoldSrc. Config serwera mozna zapisac, wgrac jako JSON lub `.cfg` i wykonac przez `exec`.
- Dowodca wybiera zachowanie PPM w 3D: brak akcji, samo przyblizenie z klasycznym celownikiem albo potato-przyrzady celownicze ze scope AWP. Glock zachowuje przelaczanie semi/burst.
- Menu oferuje funkcjonalne presety Classic, Competitive 5v5, Wingman 2v2, Retake, Deathmatch, Casual 10v10 i Training 1v1. Retake startuje z podlozona bomba, a Deathmatch/Training maja odrodzenia i wynik fragowy.
- W trybie fabularnym bind `J` pokazuje podpowiedz. Studio pozwala zapisac wlasna podpowiedz razem z celem misji.
- Biblioteka 3D Studio jest dostarczana lokalnie w `game/vendor/three.min.js`; edytor nie wymaga CDN ani internetu.
- Szczegoly wydania sa w `PATCH-NOTES-1.2-FINAL.md`.

Opcjonalne lekkie prototypy `Aim Lab Bunker`, `Extraction Sweep` i `Micro Royale` sa w `mods/examples/1.2-beta/` jako material do importu i dalszego modowania.

## GitHub Actions Costs

Zeby oszczedzac minuty GitHub Actions, ciezkie buildy APK/FAP/EXE/Linux nie uruchamiaja sie juz na kazdy push. Odpalaja sie recznie albo po tagu `v*`.
GitHub Pages publikuje gotowy `PotatoStrike.html` jako `index.html` bez `npm ci`.
Szczegoly sa w `GITHUB-ACTIONS-COST-SAVING.md`.

## Compatibility Pack

Pakiet kompatybilnosci z 1.1 jest dalej utrzymywany i wersjonowany razem z 1.2:

- `phone/android/` zawiera natywna wersje Android WebView ladujaca `PotatoStrike.html`.
- `phone/flipperzero/` zawiera ultra-mini wersje `Potato Strike Mini` dla Flipper Zero.
- `.github/workflows/potato-strike-1-2-beta.yml` buduje APK, FAP i paczki kompatybilnosci jako artefakty GitHub Actions.
- `.github/workflows/pages.yml` publikuje jednoplikowa wersje HTML na GitHub Pages, jesli Pages jest wlaczone w repo.
- `compat/` zawiera launchery i instrukcje dla starszych Windowsow, roznych dystrybucji Linuxa i awaryjnego HTML/server mode.
- `PATCH-NOTES-1.1-BETA.md` i `PATCH-NOTES-1.2-BETA.md` zachowuja historie, a `PATCH-NOTES-1.2-FINAL.md` opisuje aktualne wydanie.

Android APK buduje sie na GitHubie jako artifact `potato-strike-android-apk`.
Flipper Zero `.fap` buduje sie na GitHubie osobno dla Official, Momentum i Unleashed firmware.
Pelna paczka lokalna to `PotatoStrike-1.2-FINAL.zip`. Odchudzona paczka galezi beta to `PotatoStrike-1.2-BETA-FINAL.zip`.
Wersja webowa na GitHub Pages jest budowana z `PotatoStrike.html` i publikowana jako `index.html`, wiec po wejsciu na strone otwiera sie gra, a nie README.
Buildy desktop kompatybilnosci buduja sie jako `potato-strike-windows-compat` oraz `potato-strike-linux-compat`.

## GitHub Actions Costs

Zeby oszczedzac minuty GitHub Actions, ciezkie buildy APK/FAP/EXE/Linux nie uruchamiaja sie juz na kazdy push. Odpalaja sie recznie albo po tagu `v*`.
GitHub Pages publikuje gotowy `PotatoStrike.html` jako `index.html` bez `npm ci`.
Szczegoly sa w `GITHUB-ACTIONS-COST-SAVING.md`.

Lokalne przygotowanie paczki:

```powershell
npm run package:compat
npm run package:beta-final
```

Jesli lokalnie nie masz Android SDK/Gradle albo `ufbt`, skorzystaj z GitHub Actions.

## Uruchamianie w przegladarce

- Najlzejsza wersja gry to jeden plik `PotatoStrike.html`. Kliknij go dwa razy albo uruchom `PotatoStrike.bat`.
- Pliki developerskie `node_modules/`, `dist/`, `.git/` i lokalne `.exe` nie sa potrzebne do wersji przegladarkowej i nie powinny trafic do malej paczki gry.
- Edytowalne zrodla gry sa w folderze `game/`, a narzedzia modderskie w `DEV-tools/`.
- Tryb developerski mozesz odpalic przez `game/index.html`, albo `launch-browser.bat`.
- Gracze nie musza miec npm. Npm jest potrzebny tylko devom do Electron/buildow; pomocniczy skrypt jest w `DEV-tools/install-dev-deps.bat`.
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

Wtedy glowny katalog projektu dostaje lekki build `PotatoStrike.html` oraz launcher `PotatoStrike.bat`.
Do wersji lokalnej w przegladarce wystarczy jeden plik `PotatoStrike.html`.
Opcjonalny Electron/EXE nadal wymaga `npm install` i osobnego buildu, ale nie jest potrzebny do potato-wersji.
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
- Folder `DEV-tools/` ma szablony modow, map i profilu gracza dla modderow.
- Zakladka `Mody` w menu pozwala widziec mody z profilu, wlaczac/wylaczac je, ustawiac priorytet i usuwac.
- W menu ustawien jest wybor jezyka PL/EN.

## Status online/LAN

Offline z botami jest grywalny. Online/LAN maja menu konfiguracyjne i fallback do botow.
`server.js` ma lekki lokalny serwer, heartbeat pokoi LAN, wybor dowodcy i autoryzowany server config. Prawdziwa synchronizacja meczu gracz kontra gracz nadal wymaga podpiecia klienta do pelnego stanu serwera.

## README MADE BY AI
## MESSAGE FROM TERALUBO: play
