# Potato Strike 1.3 FINAL Patch 1.1 Phone Pack

This folder contains compatibility builds and build instructions.

## Android APK

`phone/android` is a small native Android WebView wrapper for the self-contained `PotatoStrike.html` build.

Targets:

- Android 5.0+ (`minSdk 21`) for old devices.
- Modern Android with hardware acceleration enabled.
- LAN/browser features that work inside Android WebView.

Build on GitHub:

1. Push to `beta`.
2. Open GitHub Actions.
3. Run `Potato Strike 1.3 FINAL Patch 1.1 Compatibility Builds` (ordinary pushes do not start the expensive build).
4. Download the `potato-strike-android-apk` artifact or the complete `potato-strike-1.3-final-folder` zip.
5. In the complete zip, click `phone/android/PotatoStrike-1.3-FINAL-PATCH-1.1.apk` on Android and install it.

Build locally if Android SDK and Gradle are installed:

```powershell
npm run phone:sync
cd phone/android
gradle assembleDebug
```

The debug APK output is:

```text
phone/android/app/build/outputs/apk/debug/app-debug.apk
```

## Flipper Zero

`phone/flipperzero` is not the full Potato Strike game. Flipper Zero has very limited RAM, CPU, screen size, and controls, so this is `Potato Strike Mini`: a tiny monochrome survival/shooting mini-game inspired by the main game.

Build on GitHub:

1. Push to `beta`.
2. Open GitHub Actions.
3. Download the matching Flipper artifact or the complete `potato-strike-1.3-final-folder` zip.
4. In the complete zip, copy the matching file from `phone/flipperzero/` to the Flipper Zero SD card:
   - `PotatoStrikeMini-1.3-FINAL-PATCH-1.1-official.fap`
   - `PotatoStrikeMini-1.3-FINAL-PATCH-1.1-momentum.fap`
   - `PotatoStrikeMini-1.3-FINAL-PATCH-1.1-unleashed.fap`

Build locally if `ufbt` is installed:

```powershell
cd phone/flipperzero
ufbt
```

Install the `.fap` on Flipper Zero by copying it to:

```text
/ext/apps/Games/
```
