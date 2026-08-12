# GitHub Actions Cost Saving Notes

Ten repozytorium ma ciezkie buildy: Windows, Linux, Android, Flipper Zero i release ZIP. Te joby potrafia szybko zuzyc minuty, szczegolnie Windows, Android SDK i kilka wariantow Flippera.

## Co zostalo zoptymalizowane

- Workflow `Potato Strike 1.1 BETA Compatibility Builds` nie odpala sie juz po zwyklym pushu do `main` albo `beta`.
- Ciezkie buildy uruchamiaja sie tylko:
  - recznie przez `workflow_dispatch`,
  - albo po wypchnieciu taga `v*`.
- Workflow GitHub Pages odpala sie tylko na `main` i tylko gdy zmieni sie:
  - `PotatoStrike.html`,
  - albo `.github/workflows/pages.yml`.
- GitHub Pages nie robi juz `npm ci` ani `npm run build:single` na runnerze. Publikuje gotowy `PotatoStrike.html` jako `index.html`.
- Dodane jest `concurrency`, wiec nowszy build anuluje starszy dla tego samego refa.

## Jak wydawac oszczednie

Najtansza codzienna praca:

```powershell
node scripts/verify.js
node scripts/package-compat.js
```

Buildy GitHub Actions uruchamiaj tylko wtedy, gdy naprawde potrzebujesz gotowego APK/FAP/EXE/AppImage:

1. Wejdz w GitHub Actions.
2. Wybierz `Potato Strike 1.1 BETA Compatibility Builds`.
3. Kliknij `Run workflow`.

Albo wypchnij tag release:

```powershell
git tag -f v1.2-BETA
git push --force origin v1.2-BETA
```

## Co kosztuje najwiecej

- Windows desktop build.
- Android SDK + Gradle.
- Trzy warianty Flipper Zero firmware.
- Pelne pakowanie release ZIP po pobraniu artefaktow.

Dlatego te rzeczy nie powinny leciec na kazdy commit.
