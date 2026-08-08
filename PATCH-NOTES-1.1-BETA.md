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

## Desktop OS Compatibility

- Added `compat/windows/PotatoStrike-Windows-Legacy.cmd` for older Windows systems that should use the one-file browser build instead of Electron.
- Added `compat/linux/PotatoStrike-Linux-Portable.sh` with fallbacks for Electron, xdg-open, gio, KDE/GNOME openers and common browsers.
- Added `compat/linux/PotatoStrike-Linux-Server.sh` for distros where local file opening is blocked or broken.
- Added `compat/macos/PotatoStrike-macOS.command` as best-effort HTML launch support.
- Added GitHub Actions desktop artifacts for Windows x64/ia32 and Linux AppImage, deb, rpm, tar.gz and unpacked builds.

## GitHub

- Added `.github/workflows/potato-strike-1-1-beta.yml`.
- Added `.github/workflows/pages.yml`, which deploys `PotatoStrike.html` as `index.html` so GitHub Pages opens the playable game instead of README.
- The workflow builds:
  - Windows compatibility builds,
  - Linux compatibility builds,
  - Android APK,
  - Flipper Zero FAP,
  - complete compatibility ZIP.

## Notes

The local machine used for this update did not have Android Gradle tooling or `ufbt`, so the real APK/FAP binaries are produced by GitHub Actions after the branch is pushed.
