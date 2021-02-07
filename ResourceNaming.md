# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den 
Applikationsserver zuzugreifen.

## Festlegung Ressourcen-Präfix
Die gesamte Applikation benutzt konsistent den Ressourcen-Präfix `/project`.

## A) Zugriff auf `Module`-Objekte

1. Alle Module auslesen:
    ```
    GET /project/modules
    ```
2. Ein Modul per ID auslesen:
    ```
    GET /project/module/<id>
    ```
3. Modul eines Projekts auslesen:
    ```
    GET /project/module_of_project/<id>
    ```
4. Ein Modul per ID löschen:
    ```
    DELETE /project/module/<id>
    ```
5. Ein Mmodul updaten:
    ```
    PUT /project/modules
    ```
6. Ein Modul anlegen:
    ```
    POST /project/modules
    ```


## B) Zugriff auf `Grading`-Objekte

1. Eine Benotung updaten:
    ```
    PUT /project/grading
    ```
2. Eine Benotung festlegen:
    ```
    POST /project/grading
    ```
3. Benotung über die ID bekomen:
    ```
    POST /project/grading/<id>
    ```
4. Eine Benotung löschen:
    ```
    DELETE /project/grading/<id>
    ```
5. Eine Benotung einer Teilnahme ID bekommen:
    ```
    GET /project/grading/<participation_id>
    ```
6. Alle Benotungen auslesen:
    ```
    GET /project/gradings
    ```


## C) Zugriff auf `Participation`-Objekte
1. Alle Teilnahmen auslesen:
    ```
    GET /project/participation
    ```
2. Teilnahme updaten:
    ```
    PUT /project/participation
    ```
3. Setzen einer Teilnahme:
    ```
    POST /project/participation
    ```
4. Auslesen einer Teilnahme über die ID:
    ```
    GET /project/participation/<id>
    ```
5. Auslesen aller Teilnahmen über die ProjectID:
    ```
    GET /project/participations_by_project/<project_id>
    ```
6. Löschen der Teilnahme über die ID:
    ```
    DELETE /project/participation/<id>
    ```

7. Löschen der Teilnahme über die StudentID:
    ```
    DELETE /project/participation/<student_id>
    ```


## D) Zugriff auf `Person`-Objekte
1. Alle Personen auslesen:
    ```
    GET /project/persons
    ```
2. Person updaten:
    ```
    PUT /project/person
    ```
3. Setzen einer Person:
    ```
    POST /project/persons
    ```
4. Auslesen einer Person über die ID:
    ```
    GET /project/person/<id>
    ```
5. Auslesen einer Person über die GoogleID:
    ```
    GET /project/person_by_google_id/<google_id>
    ```
6. Auslesen einer Person über den Namen:
    ```
    GET /project/person_by_name/<name>
    ```
7. Löschen einer Person über die ID:
    ```
    GET /project/person/<person_id>
    ```

## E) Zugriff auf `Projekt`-Objekte
1. Alle Projekte auslesen:
    ```
    GET /project/projects
    ```
2. Projekt updaten:
    ```
    PUT /project/project
    ```
3. Setzen einer Projekts:
    ```
    POST /project/projects
    ```
4. Auslesen eines Projekts über die ID:
    ```
    GET /project/project/<id>
    ```
5. Auslesen eines Projekts über die ParticipationID:
    ```
    GET /project/project_by_participation_id/<participation_id>
    ```
6. Auslesen eines Projekts über eine Person:
    ```
    GET /project/project_by_person/<person_id>
    ```
7. Auslesen eines Projekts über den aktuellen Status:
    ```
    GET /project/project_by_current_state/<current_state>
    ```

8. Auslesen eines Projekts über die registrierten Projekte eines Studenten:
    ```
    GET /project/registered_project_of_student/<student_id>
    ```

9. Löschen eines Projekts über die ID:
    ```
    DELETE /project/project/<project_id>
    ```

## F) Zugriff auf `Rolle`-Objekte
1. Alle Rollen auslesen:
    ```
    GET /project/role
    ```
2. Rolle über ID updaten:
    ```
    PUT /project/role/<id>
    ```
3. Setzen einer Rolle:
    ```
    POST /project/role
    ```
4. Auslesen einer Rolle über die ID:
    ```
    GET /project/role/<id>
    ```
5. Auslesen einer Rolle über die PersonID:
    ```
    GET /project/role_by_person_id/<person_id>
    ```

## G) Zugriff auf `Semester`-Objekte
1. Semester über ProjektID auslesen:
    ```
    GET /project/semester/<project_id>
    ```
2. Semester updaten:
    ```
    PUT /project/semester
    ```
3. Setzen eines Semesters:
    ```
    POST /project/semester
    ```
4. Auslesen eines Semesters über die ID:
    ```
    GET /project/semester/<id>
    ```
5. Löschen eines Semesters über die ID:
    ```
    DELETE /project/semester/<id>
    ```

## H) Zugriff auf `State`-Objekte
1. State über Projekt auslesen:
    ```
    GET /project/state/project
    ```
2. State über ID auslesen:
    ```
    GET /project/state/id
    ```
3. Löschen eines State über ID:
    ```
    DELETE /project/state/id
    ```

## I) Zugriff auf `Student`-Objekte
1. Alle Studenten auslesen:
    ```
    GET /project/students
    ```
2. Student updaten:
    ```
    PUT /project/students
    ```
3. Setzen eines Students:
    ```
    POST /project/students
    ```
4. Auslesen eines Studenten über die ID:
    ```
    GET /project/student/<id>
    ```
5. Auslesen eines Studenten über die GoogleID:
    ```
    GET /project/student_by_google_id/<google_id>
    ```
6. Auslesen eines Studenten über einen Name:
    ```
    GET /project/pstudent_by_name/<name>
    ```
7. Auslesen eines Studenten über die Matrikulationsnummer:
    ```
    GET /project/students_by_matriculation_number/<matriculation_number>
    ```

8. Löschen eines Projekts über die ID:
    ```
    DELETE /project/student/<id>
    ```

9. Auslesen der Studenten über die ProjectID:
    ```
    GET /project/students_by_project/<project_id>
    ```
## Hinweise
Gelegentlich ist es unklar, welche HTTP-Operation unter welchen Bedingungen zu verwenden ist:

**GET** wird verwendet, wenn Objekte ausgegeben werden sollen.

**DELETE** wird verwendet, wenn ein Objekt gelöscht werden soll.

**POST** wird verwendet, wenn *neue* Objekte angelegt werden sollen.

**PUT** wird für ein Update von *bereits bestehenden* Objekten verwendet.

## Allgemeine Infos zum Resource Naming
Weitere Infos zum *Resource Naming* unter: https://restfulapi.net/resource-naming/

Dort wird insbesondere auf die folgenden 4 Archetypen eingegangen:
1. *document*: Zugriff auf einzelne Dokumente / Ressourcen.
2. *collection*: Zugriff auf Mengen von Dokumenten / Ressourcen.
3. *store*: Ein durch den Client verwalteter Bereich für das Anlegen, Anpassen und 
Löschen von Ressourcen. *Kommt in diesem Projekt nicht zur Anwenung.*
4. *controller*: Expliziter Aufruf von Funktionen, die nicht zu 1.-3. gehören.