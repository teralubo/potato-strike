# Potato Strike 1.1 BETA compatibility launchers

Ten folder jest dla graczy, ktorzy maja slabszy albo starszy system i chca uruchomic gre bez recznego grzebania.

Najpewniejszy tryb na kazdym OS:

1. Otworz `PotatoStrike.html` w aktualnej przegladarce.
2. Jesli system blokuje pliki lokalne, uruchom lokalny serwer przez `npm run serve` albo uzyj launchera z tego folderu.
3. Wersje `.exe`, AppImage, deb, rpm i tar.gz sa budowane przez GitHub Actions w artefaktach `1.1 BETA`.

## Windows

- `compat/windows/PotatoStrike-Windows-Legacy.cmd` otwiera jednoplikowa wersje HTML i dziala tak prosto, jak pozwala system.
- Na Windows 7/8 najlepsza droga to aktualny Firefox ESR/Chromium portable i `PotatoStrike.html`.
- Electron 31 jest przeznaczony dla nowych Windowsow. Dla bardzo starych Windowsow traktuj HTML jako glowny tryb kompatybilnosci.
- Workflow `build:win:compat` buduje portable Windows x64 i ia32, gdy GitHub runner to obsluguje.

## Linux

- `compat/linux/PotatoStrike-Linux-Portable.sh` probuje otworzyc gre przez lokalne Electron, xdg-open, gio, kde-open, gnome-open albo popularne przegladarki.
- `compat/linux/PotatoStrike-Linux-Server.sh` startuje lokalny serwer na porcie `8787`, jesli system ma Node.js.
- Artefakty CI buduja AppImage, deb, rpm, tar.gz i `linux-unpacked`.
- Na starych dystrybucjach, gdzie AppImage nie startuje przez glibc/FUSE, uzyj `tar.gz`, `linux-unpacked` albo zwyklego HTML.

## macOS best effort

macOS nie jest glownym celem 1.1 BETA, ale `compat/macos/PotatoStrike-macOS.command` otwiera HTML przez domyslna przegladarke.

## Zasada kompatybilnosci

Core gry zostaje jeden: `PotatoStrike.html`. Buildy desktop i mobile tylko opakowuja ten sam plik, dlatego update kompatybilnosci nie rozjezdza mechanik gry.
