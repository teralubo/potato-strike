# Potato Strike 1.1 BETA Patch Notes

Potato Strike 1.1 BETA is a compatibility update.

## Android

- Added a full Android project in `phone/android`.
- The Android version loads the self-contained `PotatoStrike.html` in a native WebView.
- Minimum Android target is Android 5.0 (`minSdk 21`) to support older phones.
- The APK is built by GitHub Actions as `potato-strike-android-apk`.

## Flipper Zero

- Added `Potato Strike Mini` in `phone/flipperzero`.
- This is a deliberately tiny Flipper version, not the full HTML game.
- It removes heavy systems such as editor, LAN, textures and complex AI.
- It is built as a `.fap` by GitHub Actions using `ufbt`.

## Release Folder

- Added `scripts/package-compat.js`.
- The compatibility package is named `PotatoStrike-1.1-BETA.zip`.
- The package includes:
  - browser/offline game files,
  - modding files,
  - `phone/`,
  - Android source and APK build instructions,
  - Flipper Zero source and `.fap` build instructions.

## GitHub

- Added `.github/workflows/potato-strike-1-1-beta.yml`.
- The workflow builds:
  - Android APK,
  - Flipper Zero FAP,
  - complete compatibility ZIP.

## Notes

The local machine used for this update did not have Android Gradle tooling or `ufbt`, so the real APK/FAP binaries are produced by GitHub Actions after the branch is pushed.
