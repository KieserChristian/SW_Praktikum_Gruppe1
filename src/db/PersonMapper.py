from bo.nbo.Person import Person
from db.Mapper import Mapper

class PersonMapper (Mapper):
    """Mapper-Klasse, die Person-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    """find all"""

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Person-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from person")
        tuples = cursor.fetchall()

        for (person_id, creation_date, name, google_id) in tuples:
            person = Person()
            person.set_person_id(person_id)
            person.set_google_id(google_id)
            person.set_creation_date(creation_date)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, person_id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Person.

        :param person_id Schlüssel des zugehörigen Kunden.
        :return Eine Sammlung mit Person-Objekten, die sämtliche Konten der
                betreffenden Person repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT person_id, google_id, name, creation_date FROM person WHERE name={} ORDER BY person_id".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (person_id, google_id, creation_date, name) in tuples:
            person = Person()
            person.set_person_id(person_id)
            person.set_google_id(google_id)
            person.set_creation_date(creation_date)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    """find by name"""

    def find_by_name(self, name):
        """Auslesen aller Kunden anhand des Namens.

        :param name Name der zugehörigen Person.
        :return Eine Sammlung mit Person-Objekten, die sämtliche Personen
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT person_id, google_id, name, creation_date FROM person WHERE name={} ORDER BY person_id".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (person_id, google_id, creation_date, name) in tuples:
            person = Person()
            person.set_person_id(person_id)
            person.set_google_id(google_id)
            person.set_creation_date(creation_date)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    """insert person"""

    def insert(self, person):
        """Einfügen eines Person-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param person das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(person_id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0]+1)

        command = "INSERT INTO person (person_id, google_id, creation_date, name) VALUES (%s,%s,%s,%s)"
        data = (person.get_person_id(), person.get_creation_date(), person.get_name(),person.get_google_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return person

    """update person"""

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param person das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET name=%s WHERE person_id=%s"
        data = (person.get_name(), person.get_person_id(), person.get_creation_date(), person.get_google_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete person""" 

    def delete(self, person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param person das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE person_id={}".format(person.get_person_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()