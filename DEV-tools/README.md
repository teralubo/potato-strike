# Potato Strike DEV-tools

Ten folder jest dla modderow i devow. Gra dla gracza moze dalej byc jednym lekkim plikiem `PotatoStrike.html`, a tutaj trzymamy szablony i narzedzia do tworzenia modow, map i profili.

## Zasady

- Nie wrzucaj tu `node_modules`, buildow Electron ani duzych tekstur.
- Mody powinny byc JSON/JS i miec `id`, `name`, `enabled`, `priority`.
- Profil gracza przechowuje nick, ID, ustawienia, mapy, misje, tekstury i mody.
- Branch `beta` sluzy do testow. `main` tylko po potwierdzeniu wydania.

## Szybki build

```powershell
npm run build:single
```

Wynik: `PotatoStrike.html`.
