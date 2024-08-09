#WebconNote

### Zadanie

Twoim pierwszym zadaniem jest stworzenie aplikacji internetowej służącej do tworzenia i zarządzania notatkami.
W kolejnych punktach znajduje się opis wymagań funkcjonalnych i niefunkcjonalnych. 
Do budowy rozwiązania wykorzystaj technologie, z którymi zapoznałeś się w poprzednim etapie stażu.

Pamiętaj o dobrych praktykach tworzenia aplikacji:
* System kontroli wersji `Git`
* Testy jednostkowe
* Tworzenie izolowanych komponentów `StoryBook`

Twoja aplikacja powinna prawidłowo działać w najnowszych wersjach przeglądarek oraz powinna być używalna na urządzaniach mobilnych - tablety i telefony.

Nie musisz martwić się częścią backendową. W tym projekcie znajduje się aplikacja NodeJs zapewniająca interfejs REST oraz persystencję danych w lokalnej bazie danych `db.json`.
Jedyne, co musisz zrobić, to uruchomić aplikację poleceniem `npm start`. Interfejs jest dostępny pod adresem `http://localhost:3000`. 

1. Prosta edycja notatek

    Pierwszym krokiem w tworzeniu twojej aplikacji jest dodanie funkcjonalności edytowania notatek.
    Na tym etapie musisz stworzyć ogólny design twojej aplikacji, listę notatek, stronę pozwalającą na dodawanie i edycję notatek oraz komunikację z Api. Kontrakt komunikacji REST znajduję się w sekcji `Kontrakt`.

    Do testowania zapytań do Api służy np `Postman` https://www.getpostman.com/. Użyj go, jeśli będziesz miał problemy z komunikacją.

    Oczywiście całość musi być połączona odpowiednio zaprojektowaną nawigacją. 

    * Warunki zakończenia
        * Design graficzny aplikacji
        * Możliwość dodania notatki
        * Możliwość usunięcia notatki
        * Możliwość edycji notatki   
2. Podgląd w popupie

    Zadania bardzo często formułowane są w formie `UserStory` - krótkiej historyjki użytkownika - w formie 
    ```Jako [aktor] chciałbym [działanie] aby [cel]```.
    W dalszej częsci zadania właśnie tak będziemy pracować. 

    **Jako użytkownik WebconNote chciałbym mieć możliwość edytowania notatek w popupie, abym nie musiał zawsze przechodzić do strony edycji**
    
    Twoim zadaniem jest dodanie funkcjonalności edytowania notatki w oknie modalnym - bez nawigowania do osobnej strony edycyjnej.
    Pamiętaj o odświeżeniu notatki po zakończeniu edycji oraz o anulowaniu edycji.
    
     * Warunki zakończenia
         * Możliwość edycji notatki bez wchodzenia w stronę edycji - popup
         * Możliwość anulowania edycji
3. Tagowanie i filtrowanie

    **Jako użytkownik WebconNote chciałbym móc dodać tag do mojej notatki, abym mógł je kategoryzować**
    
    **Jako użytkownik WebconNote chciałbym móc filtrować listę notatek po tagach, abym mógł przeglądać tylko interesujące mnie notatki**

    Tagi możesz pobrać za pomocą metody `GET` `/tags` - zwraca ona tablicę tagów w postaci tablicy stringów.

    Tagi w notatce powinny być przechowywane w postaci stringa oddzielonego przecinkami, w polu tags.
    
    * Warunki zakończenia
        * Możliwość dodania taga do notatki
        * Możliwość filtrowania listy notatek po podanym tagu
4. Ulubione

    **Jako użytkownik WebconNote chciałbym mieć możliwość oznaczenia notatki jako ulubionej, abym mógł wyświetlić tylko ulubione notatki**
    
    Bardzo fajną funkcjonalnością jest możliwość określania ulubionych elementów w systemie. Chcielibyśmy, abyś zaimplementował taką funkcjonalność w swoim projekcie.
    
    * Warunki zakończenia
        * Możliwość oznaczenia notatki jako ulubionej
        * Możliwość filtrowania po ulubionych notatkach
5. Wyszukiwanie
    
    **Jako użytkownik WebconNote chciałbym mieć możliwość wyszukiwania notatek, abym mógł w prosty sposób znaleźć moją notatkę**
    
    W sytuacji, gdy Twój system będzie zawierał bardzo dużo różnych notatek, trudnym stanie się sprawne przeglądanie i wyszukiwanie pożądanych treści. Musisz rozwiązać ten problem. Dostarczona funkcja Api `/search?q={phrase}` dostarcza funkcjonalności wyszukiwania notatek po frazie.

    * Warunki zakończenia
        * Możliwość wyszukiwania notatek po określonej frazie
6. Jednoczesna edycja
    **Jako użytkownik WebconNote chciałbym mieć możliwość jednoczesnej edycji notatki na kilka kartach**

    Przy użyciu window.postMessage i ReduxSaga ta sama notatka otwarta na kilka kartach powinna synchronizować swoje zmiany

7. MacOS & iOS

    Bardzo ważnym aspektem tworzenia aplikacji jest zapewnienie jak najszerszego dostępu. Jeśli ktoś nie będzie mógł uruchomić Twojego projektu - nie skorzysta z niego. 
    
    Chcielibyśmy, abyś zmierzył się z problemem kompatybilności ze różnymi przeglądarkami.
    
    Musisz zapewnić prawidłowe działanie Twojej aplikacji na środowisku MacOS i iOS
   
    Przy okazji zapoznaj się ze środowiskiem pracy (narzedzia developerskie) MacOS
    * Warunki zakończenia
        * Działanie wszystkich funkcjonalności w Safari na MacOS i iOS
		
###Kontrakt
* GET
  * /notes ```[{ "id" : string, "fav": boolean, "tags": string, ..rest}]```
  * /tags ```[strings]```
  * /notes/{id} ```{ "id" : string, "fav": boolean, "tags": string, ..rest}```
  * /search?q={query} ```[{ "id" : string, "fav": boolean, "tags": string, ..rest}]```
  * /notes/tags/{tag} ```[{ "id" : string, "fav": boolean, "tags": string, ..rest}]```
  * /notes/favourites ```[{ "id" : string, "fav": boolean, "tags": string, ..rest}]```
* POST
  * /notes``` body: {"tags": string, "fav": boolean, ..rest}``` ``` response: { "id" : string, "fav": boolean, "tags": string, ..rest}```
* PUT
  * /notes/{id}``` body: {"id" : string, "fav": boolean,"tags": string, ..rest}```
* DELETE
  * /notes/{id}