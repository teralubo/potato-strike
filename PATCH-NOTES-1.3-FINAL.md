# Potato Strike 1.3 FINAL

Aktualny patch: `1.3`.

Strona gry: [https://teralubo.itch.io/potato-strike](https://teralubo.itch.io/potato-strike)

## Patch 1.3 - LAN

- Osobne przyciski tworzenia i dolaczania do LAN.
- Konfiguracja serwera przed utworzeniem lobby.
- Poczekalnia z rosterem, ustawieniami, lokalnymi slotami, transferem dowodcy, kickiem, banem i unbanem.
- Walidacja uprawnien i banow wykonywana przez serwer.

## Patch 1.1 - kompatybilnosc

- Android: uniwersalny APK dla Androida 5.0+ z pelna gra i sterowaniem dotykowym.
- Windows: portable x64/ia32 oraz jednoplikowy HTML jako lekka droga dla Windows 7/8.
- Linux: AppImage, deb, rpm, tar.gz, `linux-unpacked` oraz launchery portable/server.
- Flipper Zero: bardzo mala natywna gra `Potato Strike Mini` jako osobne `.fap` dla Official, Momentum i Unleashed.
- Gotowe binaria sa budowane recznie lub przez tag w workflow `Potato Strike 1.3 FINAL Patch 1.1 Compatibility Builds`.

Potato Strike 1.3 FINAL stabilizuje lekki tryb FPS 3D bez usuwania widoku 2D, Studio, modow, botow ani LAN.

## Najwazniejsze zmiany

- Lekkie sprite'y FreEDoom 0.13.0 sa legalnym zrodlem tekstur broni 3D; pliki WAD nie sa wymagane przez gre.
- Kazda wbudowana bron ma osobny cache'owany wariant koloru, skali i sylwetki, m.in. tlumiki, lunety, magazynki i dual pistols.
- Kamera FPS obsluguje plynny yaw i pitch, ADS, scope AWP oraz zakres pionowy okolo 70 stopni.
- Ustawienia obejmuja precyzyjna czulosc myszy, czulosc ADS, raw input, akceleracje, FOV, view bob, limity FPS i V-Sync.
- Domyslny celownik to staly punkt; dostepne sa presety, wylaczenie, mini-paint oraz import i export.
- Strefy kupowania T/CT dzialaja w 2D i 3D, a sklep i Fast Bind respektuja buy-time, druzyne, pieniadze i pozycje gracza.
- Wygenerowane i wlasne mapy otrzymuja buy-zone automatycznie; przesuniecie spawnu w edytorze przesuwa strefe.
- Bronie 2D maja rozne sylwetki, AWP zabija przeciwnika jednym trafieniem w cialo lub glowe, a friendly fire zadaje domyslnie 50% obrazen.
- Poziom botow ma skale `0-5` (kampania: `5`), a dowodca LAN ustawia buy-time, czasy rundy, pieniadze, grawitacje i zasady friendly fire.

## Warianty wydania

- `PotatoStrike-1.3-FINAL.zip` zawiera pelny zestaw gry, zrodla, Studio, DEV-tools, mody oraz pliki kompatybilnosci.
- `PotatoStrike-1.3-BETA-FINAL.zip` zawiera ten sam runtime gry w mniejszej paczce bez ciezszych materialow developerskich.

Licencja gry: GNU GPL 3.0. Wyeksportowane assety FreEDoom zachowuja licencje BSD 3-Clause i informacje o zrodle w `game/assets/weapons/freedoom/`.
