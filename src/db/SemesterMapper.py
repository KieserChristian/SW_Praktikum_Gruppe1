from src.bo.nbo.Semester import Semester
from src.db.Mapper import Mapper

class SemesterMapper (Mapper):
    """Mapper-Klasse, die Semester-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    """find all """

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Semester-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from semester")
        tuples = cursor.fetchall()

        for (semester_id, creation_date, name) in tuples:
            semester = Semester()
            semester.set_semester_id(semester_id)
            semester.set_creation_date(creation_date)
            semester.set_name(name)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, semester_id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Semester.

        :param semester_id Schlüssel des zugehörigen Kunden.
        :return Eine Sammlung mit Semester-Objekten, die sämtliche Konten der
                betreffenden Semester repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT semester_id, creation_date, name FROM semester WHERE name={} ORDER BY id".format(semester_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (semester_id, creation_date, name) in tuples:
            semester = Semester()
            semester.set_semester_id(semester_id)
            semester.set_creation_date(creation_date)
            semester.set_name(name)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    """find by name"""

    def find_by_name(self, name):
        """Auslesen aller Semester anhand des Namen.

        :param name Name des zugehörigen Semesters.
        :return Eine Sammlung mit Semester-Objekten, die sämtliche Semester
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT semester_id, creation_date, name FROM semester WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (semester_id, creation_date, name) in tuples:
            semester = Semester()
            semester.set_semester_id(semester_id)
            semester.set_creation_date(creation_date)
            semester.set_name(name)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    """insert semester"""

    def insert(self, semester):
        """Einfügen eines Semester-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param semester das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(semester_id) AS maxid FROM semester ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            semester.set_id(maxid[0]+1)

        command = "INSERT INTO semester (semester_id, creation_date, name) VALUES (%s,%s,%s)"
        data = (semester.get_semester_id(), semester.get_creation_date(), semester.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return semester

    """update semester"""

    def update(self, semester):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param semester das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE semester " + "SET name=%s WHERE semester_id=%s"
        data = (semester.get_semester_id(), semester.get_creation_date(), semester.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete semester""" 

    def delete(self, semester):
        """Löschen der Daten eines Semester-Objekts aus der Datenbank.

        :param semester das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM semester WHERE semester_id={}".format(semester.get_semester_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()