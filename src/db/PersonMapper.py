from bo.nbo.Person import Person
from db.Mapper import Mapper

class PersonMapper (Mapper):
    """Mapper-Klasse, die Person-Objekte auf eine relationale
    Datenbank abbildet
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Personen.

        :return Eine Sammlung aller Personen-Objekte
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, google_id, name FROM person")
        tuples = cursor.fetchall()

        for (id, google_id, name) in tuples:
            person = Person()
            person.set_id(id)
            person.set_google_id(google_id)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen einer Person durch die ID

        :param id
        :return Person-Objekt, das der übergebenen ID entspricht
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, google_id, name FROM person WHERE id={} ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, google_id, name) in tuples:
            person = Person()
            person.set_id(id)
            person.set_google_id(google_id)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen aller Personen anhand des Namens.

        :param name
        :return Eine Sammlung mit Person-Objekten, die sämtliche Personen
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, google_id, name FROM person WHERE name={} ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, google_id, name) in tuples:
            person = Person()
            person.set_id(id)
            person.set_google_id(google_id)
            person.set_name(name)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):
        """Einfügen eines Person-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param person
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0]+1)

        command = "INSERT INTO person (id, google_id, name) VALUES (%s,%s,%s,%s)"
        data = (person.get_id(), person.get_google_id(), person.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return person

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param person
        """
        cursor = self._cnx.cursor()

        command = "UPDATE person " + "SET name=%s WHERE id=%s"
        data = (person.get_id(), person.get_google_id(), person.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):
        """Löschen eines Person-Objekts aus der Datenbank.

        :param person
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()