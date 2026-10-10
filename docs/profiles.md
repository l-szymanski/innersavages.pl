# Twój profil w Watasze

Każdy profil to jeden plik Markdown i opcjonalne grafiki w jego katalogu.
Nie musisz edytować HTML, CSS ani listy członków — Hugo sam tworzy kartę
w galerii i indywidualną stronę na podstawie Twojego pliku.

## 1. Gdzie edytować profil

Znajdź swój katalog w `content/members/`, na przykład:

```text
content/members/lukasz-szymanski/
├── index.md
├── portrait.png
└── portrait.prompt.txt
```

- `index.md` — dane profilu i dowolny tekst o Tobie;
- `portrait.png` — portret, jeśli go dodajesz;
- `portrait.prompt.txt` — opcjonalny zapis promptu do grafiki; nie steruje profilem.

Adres tego przykładowego profilu to `/members/lukasz-szymanski/`.
Nazwa katalogu określa adres, a nie wyświetlane imię i nazwisko. Edytując
istniejący profil, zostaw nazwę katalogu, żeby zachować jego URL.
Nie edytuj `content/members/_index.md` — to strona główna Watahy.

Profile Przyjaciół działają podobnie, w `content/friends/`, pod adresami
`/friends/nazwa-profilu/`. Różnice opisano na końcu instrukcji.

## 2. Budowa pliku

Na początku `index.md` jest **frontmatter**: dane w formacie YAML pomiędzy
dwiema liniami `---`. Pod drugą linią możesz pisać zwykły Markdown.

Minimalny profil członka:

```yaml
---
title: "Twoje imię i nazwisko"
membership: regular
---
```

To przykład składni, nie gotowe dane. W swoim profilu zachowaj prawdziwe
imię i nazwisko (lub uzgodnioną publiczną formę, np. z inicjałem nazwiska)
oraz aktualny rodzaj członkostwa.
Puste body i brak pól opcjonalnych są poprawne.

### Wszystkie pola modelu profilu

| Pole | Wymagane? | Co robi |
| --- | --- | --- |
| `title` | Tak | Imię i nazwisko; główna nazwa bez nicka, a przy nicku podpis poniżej. |
| `membership` | Tak, dla członków | Rodzaj członkostwa, widoczny pod portretem. |
| `nickname` | Nie | Nick jako główny nagłówek profilu i nazwa na karcie w galerii. |
| `portrait` | Nie | Nazwa lub względna ścieżka do portretu w katalogu profilu. |
| `tagline` | Nie | Krótkie motto widoczne w galerii i na profilu. |
| `roles` | Nie | Lista rzeczywistych funkcji organizacyjnych. |
| `perks` | Nie | Do 10 własnych statystyk postaci. |
| `links` | Nie | Odnośniki wyświetlane jako ikony w karcie postaci. |

## 3. Imię, nick i motto

```yaml
title: "Twoje imię i nazwisko"
nickname: "TwójNick"
tagline: "Twoje krótkie motto."
```

Jeżeli wpiszesz `nickname`, nick zajmie miejsce głównego nagłówka,
a imię i nazwisko z `title` pojawi się mniejszym tekstem pod nim.
Dotyczy to zarówno indywidualnego profilu, jak i karty w galerii.
Bez nicka głównym nagłówkiem pozostaje imię i nazwisko.
Pole `title` jest nadal wymagane i pozostaje tytułem strony w przeglądarce.
Motto najlepiej ograniczyć do jednego krótkiego zdania.
Jeżeli nie chcesz nicka lub motta, po prostu usuń dane pole.

Galeria jest sortowana alfabetycznie według całego `title`, czyli zwykle
najpierw po imieniu. Zmiana nicka nie zmienia kolejności ani adresu strony.

## 4. Członkostwo i funkcje

### `membership`

Dozwolone wartości:

| Wartość | Wyświetlany tekst |
| --- | --- |
| `regular` | Członek zwyczajny |
| `supporting` | Członek wspierający |

To rzeczywista informacja organizacyjna — zachowaj istniejącą wartość,
chyba że rodzaj Twojego członkostwa się zmienił.
Nieznana wartość powoduje ostrzeżenie przy budowaniu strony.

### `roles`

Jedna osoba może mieć kilka funkcji, dlatego jest to lista:

```yaml
roles:
  - body: board
    position: "Prezes Zarządu"
```

Przykład dla Komisji Rewizyjnej:

```yaml
roles:
  - body: audit
    position: "Członek Komisji Rewizyjnej"
```

Wpis zawiera:

| Pole | Znaczenie |
| --- | --- |
| `body` | `board` dla Zarządu lub `audit` dla Komisji Rewizyjnej. |
| `position` | Prawdziwa nazwa pełnionej funkcji. Opcjonalna. |

Bez `position` profil pokazuje nazwę organu: „Zarząd” albo „Komisja Rewizyjna”.
Na karcie w galerii Zarządu brak nazwy funkcji daje etykietę „Zarząd”.
Jeżeli nie pełnisz funkcji, pomiń `roles` albo wpisz `roles: []`.
Nie kopiuj przykładowej funkcji do swojego profilu, jeśli jej nie pełnisz.

Hugo automatycznie dzieli galerię:

- osoby z `body: board` trafiają do sekcji **Zarząd**, z nazwą funkcji;
- pozostali członkowie trafiają do sekcji **Wataha**;
- jedna osoba pojawia się tylko raz;
- członkowie zwyczajni i wspierający są pokazywani razem;
- członkostwo i funkcje Komisji Rewizyjnej widać na profilu, nie w galerii.

## 5. Portret

Umieść grafikę w swoim katalogu i podaj nazwę pliku:

```yaml
portrait: "portrait.png"
```

Możesz użyć też podkatalogu, np. `portrait: "images/avatar.webp"`.
Ścieżka jest względna wobec katalogu profilu, bez `content/members/`.
Portret musi być lokalnym obrazem rastrowym obsługiwanym przez Hugo,
np. PNG, JPEG lub WebP. Nie wpisuj tu adresu obrazka z LinkedIn ani SVG.
Nazwa w YAML musi odpowiadać rzeczywistemu plikowi, również wielkością liter.

**Polecany format: 1024 × 1024 px, proporcje 1:1.** To zalecenie,
nie wymóg. Przezroczystość jest opcjonalna. Zostaw trochę miejsca wokół
głowy i ważnych elementów, żeby dobrze wyglądały także na małej karcie.
Portret może przedstawiać dowolną ilustrację lub zdjęcie.

- Galeria ma kwadratowy obszar i wypełnia go obrazem; grafika o innych
  proporcjach może zostać przycięta. Najprościej dostarczyć kwadratowy portret.
- Profil mieści cały obraz w kwadratowym obszarze, zachowując proporcje.
- Brak `portrait` oznacza neutralny placeholder `IS`.
- Brak wskazanego pliku oznacza placeholder oraz ostrzeżenie przy buildzie.

Hugo automatycznie tworzy WebP: warianty o szerokości do 320/640 px dla
galerii i do 640/960 px dla profilu, z jakością 82. Nie powiększa obrazów
ponad szerokość oryginału. Nie musisz przygotowywać tych wariantów ręcznie.

## 6. Perki — Twoje statystyki postaci

Nazwy są dowolne: techniczne, osobiste albo humorystyczne.
To Twoja subiektywna karta postaci; nie ma rankingów ani średnich.

```yaml
perks:
  - name: "Linux"
    level: 8.5
  - name: "Picie kawy"
    level: 9
```

Każdy wpis wymaga dwóch pól:

| Pole | Zasada |
| --- | --- |
| `name` | Niepusta nazwa perka. |
| `level` | Liczba od 0 do 10, z krokiem 0.5. |

**Maksymalnie 10 perków.** Możesz mieć 0, 1, 5, 7 lub dowolną inną liczbę
do 10. Brak pola lub `perks: []` ukrywa panel statystyk.

Poprawne poziomy to `0`, `0.5`, `1`, `1.5`, `2`, `2.5`, …, `9.5`, `10`.
W YAML używaj **kropki** i zapisuj poziom **bez cudzysłowów**:

```yaml
level: 8.5    # poprawnie: liczba
```

`-0.5`, `7.3`, `10.5`, `"8.5"`, `"abc"` i brak poziomu są niepoprawne.
Nieprawidłowy wpis jest pomijany z ostrzeżeniem, bez zaokrąglania.
Przy więcej niż 10 wpisach Hugo ostrzega i rozpatruje tylko pierwsze 10,
także wtedy, gdy któryś z nich jest niepoprawny.

Kolejność jest dokładnie taka jak w pliku. Na desktopie perki układają się
w dwóch kolumnach, wierszami: 1 i 2, potem 3 i 4 itd. Na wąskim ekranie
przechodzą do jednej kolumny. Nie musisz dzielić danych na dwie listy.

Każdy wskaźnik ma 20 kresek: jeden punkt zapala dwie, pół punktu jedną.
Przy `level: 0` perk pozostaje widoczny, ale żadna kreska nie świeci;
przy `level: 0.5` świeci jedna.
Wartości liczbowe nie są widoczne, ale poziom jest opisany dla czytników ekranu.
Perki pojawiają się tylko na indywidualnym profilu, nie w galerii.

## 7. Linki jako ikony

```yaml
links:
  - label: "Moja strona"
    url: "https://example.com/"
    category: homepage
  - label: "Napisz do mnie"
    url: "mailto:kontakt@example.com"
    category: email
```

Każdy link ma:

| Pole | Zasada |
| --- | --- |
| `url` | Wymagany adres; wpis bez adresu nie jest wyświetlany. |
| `label` | Zalecana etykieta, dostępna po najechaniu i dla czytników ekranu. |
| `category` | Opcjonalny wybór ikony; domyślnie `default`. |

Dozwolone kategorie:

| `category` | Ikona | Przykładowy `url` |
| --- | --- | --- |
| `email` | Koperta | `mailto:kontakt@example.com` |
| `homepage` | Dom | `https://example.com/` |
| `linkedin` | LinkedIn | `https://www.linkedin.com/in/example/` |
| `github` | GitHub | `https://github.com/example` |
| `default` | Odnośnik | Dowolny inny adres, np. `/kronika/` |

Brak kategorii lub nieznana wartość daje ikonę `default`.
Ikona nie jest automatycznie rozpoznawana z adresu.
Brak `label` daje ogólną etykietę odpowiedniej kategorii, np. „GitHub” lub „Link”.
Warto wpisać własną, szczególnie gdy kilka linków ma tę samą ikonę.

**Przy e-mailu koniecznie wpisz `mailto:`.** Sama kategoria `email` ustawia
tylko kopertę. Adres bez tego prefiksu zostanie potraktowany jak ścieżka strony.
Zewnętrzne strony podawaj z `https://`, a wewnętrzne ścieżki zaczynaj od `/`.

Linki HTTP/HTTPS otwierają nową kartę z `rel="noopener noreferrer"`.
Odnośniki wewnętrzne pozostają w tej samej karcie; `mailto:` uruchamia
obsługę poczty w przeglądarce/systemie. Ikony zachowują kolejność z pliku.
Brak `links` lub `links: []` oznacza brak rzędu ikon.

## 8. Dowolna treść pod kartą postaci

Za zamykającą linią `---` możesz pisać o sobie w Markdownie:

```markdown
## O mnie

Tu możesz napisać, co Cię interesuje i czym się zajmujesz.

## Projekty

- [Nazwa projektu](https://example.com/projekt/)
- Inny temat, o którym chcesz wspomnieć.

![Opis zdjęcia](zdjecie.jpg)
```

Zdjęcia do treści możesz trzymać obok `index.md` i wskazywać po nazwie.
Dodawaj opis w nawiasach kwadratowych, żeby obraz był dostępny także
dla osób korzystających z czytników ekranu.
Obrazy w treści nie korzystają z automatycznych wariantów WebP portretu;
przygotuj je w rozsądnym rozmiarze do publikacji.

Możesz używać nagłówków, list, pogrubień, linków i cytatów.
Nie ma wymaganej długości ani układu opisu; pusty tekst też jest w porządku.
Główny nagłówek z nickiem lub imieniem jest generowany automatycznie, więc w treści
zaczynaj od `##`, jeśli chcesz dodać sekcję.
Nie musisz powtarzać członkostwa, funkcji ani listy perków w opisie.

## 9. Dodatkowe ustawienia Hugo

Poza modelem profilu działają też ustawienia publikacji i metadanych:

```yaml
description: "Krótki opis strony do wyszukiwarek i podglądów linku."
draft: false
featuredImage: "portrait.png"
```

- `description` nie wyświetla się w karcie; jest używane w metadanych strony.
  Bez niego strona korzysta z domyślnego opisu serwisu.
- `draft: true` ukrywa profil w zwykłym buildzie i galerii. Brak pola lub
  `draft: false` oznacza publikowanie. Do podglądu szkiców użyj `hugo server -D`.
- `featuredImage` jest opcjonalnym polem obsługiwanym przez wspólny szablon
  metadanych: wskazuje obraz z katalogu profilu do podglądów udostępnianego
  linku. Nie zastępuje `portrait` i nie zmienia grafiki karty postaci.
  Portret nie jest automatycznie ustawiany jako obraz podglądu; możesz wskazać
  ten sam plik osobno. Wpisz nazwę istniejącego obrazu, bez adresu zewnętrznego.

Pozostałe standardowe ustawienia Hugo nie są potrzebne do zwykłej edycji profilu.
W szczególności zmiana adresu przez `url` lub `slug` nie jest konieczna.

## 10. Pełny przykład do dostosowania

Wszystkie dane poniżej są przykładowe. Zastąp je własnymi i usuń opcjonalne
pola, których nie potrzebujesz. `membership` zachowaj zgodne z rzeczywistością.
`roles` dodaj wyłącznie wtedy, gdy pełnisz daną funkcję.

```markdown
---
title: "Twoje imię i nazwisko"
membership: regular
nickname: "TwójNick"
portrait: "portrait.png"
tagline: "Twoje krótkie motto."
description: "Krótki opis Twojego profilu."
perks:
  - name: "Linux"
    level: 8.5
  - name: "Picie kawy"
    level: 9
links:
  - label: "Moja strona"
    url: "https://example.com/"
    category: homepage
  - label: "Napisz do mnie"
    url: "mailto:kontakt@example.com"
    category: email
  - label: "LinkedIn"
    url: "https://www.linkedin.com/in/example/"
    category: linkedin
  - label: "GitHub"
    url: "https://github.com/example"
    category: github
  - label: "Inny projekt"
    url: "https://example.com/projekt/"
    category: default
---

## O mnie

Twój tekst, w dowolnym stylu i długości.
```

## 11. Profile Przyjaciół

W `content/friends/nazwa-profilu/index.md` działają te same pola osobiste:
`title`, `nickname`, `portrait`, `tagline`, `perks`, `links` oraz treść Markdown.
Zachowuj uzgodnioną publiczną nazwę, także jeśli zawiera tylko inicjał nazwiska.

Nie trzeba wpisywać `membership`: profil automatycznie pokazuje
„Przyjaciel watahy”. Nie dodawaj przyjacielowi funkcji członka stowarzyszenia.
Przyjaciele trafiają do osobnej sekcji w galerii Watahy; adresy ich stron
zaczynają się od `/friends/`.

## 12. Jak sprawdzić zmianę

1. Zapisz plik w UTF-8. W YAML używaj spacji, nie tabulatorów;
   trzymaj jednakowe wcięcia list, jak w przykładach.
2. Teksty i adresy najwygodniej ujmować w cudzysłowy. Poziomy perków
   pozostaw liczbami bez cudzysłowów.
3. Z katalogu głównego repozytorium uruchom `hugo --minify`.
   Błąd składni YAML trzeba poprawić; ostrzeżenie o portrecie lub perku
   wskazuje konkretne dane do sprawdzenia.
4. Do lokalnego podglądu uruchom `hugo server` i otwórz adres wypisany
   w terminalu, zwykle `http://localhost:1313/members/nazwa-katalogu/`.
5. Obejrzyj profil i jego kartę w galerii, także przy wąskim oknie.
   Kliknij swoje linki i sprawdź portret oraz kolejność perków.
6. Przekaż zmieniony `index.md` i ewentualne grafiki w zwykłym trybie
   współpracy nad repozytorium.

Nie edytuj `public/` ani `resources/` — to pliki generowane przez Hugo.
Do uzupełnienia własnego profilu wystarczy Twój katalog w `content/`.
