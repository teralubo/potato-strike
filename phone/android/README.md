# Potato Strike Android APK

## Najprosciej

1. Pobierz paczke `potato-strike-1.2-beta-folder` z GitHub Actions.
2. Rozpakuj `PotatoStrike-1.2-BETA.zip`.
3. Wejdz na telefonie do folderu:

```text
phone/android/
```

4. Kliknij `PotatoStrike-1.2-BETA.apk`.
5. Jesli Android zapyta, pozwol na instalacje z tego zrodla.
6. Otworz aplikacje `Potato Strike`.

## Co jest w APK

APK to pelna wersja Android oparta o WebView. Laduje jednoplikowa gre `PotatoStrike.html`, wiec nie trzeba instalowac npm ani nic kompilowac na telefonie.

## Wymagania

- Android 5.0 lub nowszy (`minSdk 21`).
- Na bardzo starych telefonach wlacz tryb niskiej grafiki w ustawieniach gry.

## Dla devow

Lokalny build wymaga Android SDK i Gradle:

```powershell
npm run phone:sync
cd phone/android
gradle assembleDebug
```

Gotowy plik po lokalnym buildzie:

```text
phone/android/app/build/outputs/apk/debug/app-debug.apk
```

GitHub Actions kopiuje go do prostszej nazwy:

```text
phone/android/PotatoStrike-1.2-BETA.apk
```
