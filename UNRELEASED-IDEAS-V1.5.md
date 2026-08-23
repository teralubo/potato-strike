# Potato Strike - pomysly do wersji unreleased

Ten plik zawiera propozycje do prototypowania. Nie sa czescia stabilnego wydania V1.4.

## Boty i walka

- Pamiec celu: bot przez kilka sekund pamieta ostatnia widziana pozycje przeciwnika, ale nie zna jego pozycji przez sciany.
- Ocena zagrozenia: wybor celu uwzglednia odleglosc, widocznosc, obrazenia i cel rundy, zamiast zawsze wybierac tylko najblizsza postac.
- Role druzynowe: entry, support, sniper i obronca bombsite z prostymi zachowaniami przypisanymi na poczatku rundy.
- Boty podnoszace bronie: po utracie ekwipunku bot moze znalezc lepsza bron lezaca na mapie i podniesc ja, jesli droga jest bezpieczna.
- Krotkie komunikaty zespolowe o kontakcie, bombie, przegrupowaniu i potrzebie wsparcia.

## Bronie i ekwipunek

- Fizyczny rzut upuszczonej broni z niewielkim odbiciem i zatrzymaniem na przeszkodach.
- Podglad nazwy, amunicji i kategorii broni po skierowaniu na nia celownika.
- Opcjonalne automatyczne podnoszenie lepszej broni, oddzielnie konfigurowane dla gracza i botow.
- Skrzynki ekwipunku w Sandboxie, ktore mozna skonfigurowac jako nieskonczone albo jednorazowe.

## Tryby gry

- Gun Game z automatycznym przechodzeniem przez liste broni po fragach.
- Survival przeciw kolejnym falom botow z zakupami miedzy falami.
- Extraction: zebranie przedmiotu misji i dotarcie do punktu ewakuacji.
- Trening druzynowy z zapisywanymi trasami, pozycjami i czasem wykonania scenariusza.

## Aktualizacje i jakosc

- Plik manifestu wydania z wersja, rozmiarem paczki i suma SHA-256, wyswietlany przed pobraniem aktualizacji.
- Kanal aktualizacji `stable` lub `beta` wybierany w ustawieniach.
- Ekran informacji o zmianach pokazywany tylko raz po uruchomieniu nowej wersji.
- Powtorki ostatnich kilkunastu sekund rundy do analizy trafien i zachowania botow.

