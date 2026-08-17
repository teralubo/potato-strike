# Potato Strike 1.2 BETA Sandbox Examples

Ten plik opisuje lekkie przykladowe mody dolaczone do `1.2 BETA`. Nie zmieniaja podstawowej gry, mozna je importowac, modyfikowac albo usunac.

## Kierunek 1.2

- Wiekszy nacisk na sandbox i mody bez zwiekszania wagi gry.
- Gotowe prototypy trybow, ktore gracz moze wlaczyc przez import moda.
- Mapy projektowane pod czytelne 3D FPS i szybkie testy botow.
- Pomysly, ktore da sie wyrzucic albo zmienic bez ruszania stabilnego `main`.

## Dodane prototypy

### Aim Lab Bunker

Plik: `mods/examples/1.2-beta/aim-lab-bunker.json`

Krotka mapa treningowa do testowania recoil, botow i celownika. Ma jasne sciany, mala odleglosc walki i bron treningowa `PS-12 Trainer`.

### Extraction Sweep

Plik: `mods/examples/1.2-beta/extraction-sweep.json`

Prototyp trybu fabularno-ekstrakcyjnego: wejdz, wyeliminuj boty i przetrwaj. Mapa ma proste korytarze, zielony extraction zone i cel story w `map.meta.storyGoal`.

### Micro Royale

Plik: `mods/examples/1.2-beta/micro-royale.json`

Bardzo szybki, maly tryb do testow 1v1/2v2/3v3, z krotkim czasem rundy i tania bronia eksperymentalna. Dobry do sprawdzania bot economy i czytelnego FPS.

## Jak testowac

1. Uruchom Potato Strike 1.2 BETA.
2. Wejdz w menu `Mody`.
3. Wybierz import JSON.
4. Wgraj jeden z plikow z `mods/examples/1.2-beta/`.
5. Wlacz mod, ustaw priorytet i rozpocznij mecz.

## Zasada

Przyklady sa odseparowane od runtime gry. Wlaczaja sie dopiero po imporcie w menu `Mody`.
