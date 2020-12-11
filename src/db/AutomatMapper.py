from so.Automat import Automat
from db.Mapper import Mapper

class AutomatMapper (Mapper):
    """Mapper-Klasse, die Automat-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    """find all """

    def find_all(self):
        """Auslesen aller Automaten.

        :return Eine Sammlung mit Automat-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from automat")
        tuples = cursor.fetchall()

        for (id, current_state, creation_date) in tuples:
            automat = Automat()
            automat.set_id(id)
            automat.set_current_state(current_state)
            automat.set_creation_date(creation_date)
            result.append(automat)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Automats.

        :param automat_id Schlüssel des zugehörigen Kunden.
        :return Eine Sammlung mit Automat-Objekten, die sämtliche Konten der
                betreffenden Automaten repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT automat_id, current_state, creation_date FROM automat WHERE automat_id={} ORDER BY automat_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, current_state, creation_date) in tuples:
            automat = Automat()
            automat.set_id(id)
            automat.set_current_state(current_state)
            automat.set_creation_date(creation_date)
            result.append(automat)

        self._cnx.commit()
        cursor.close()

        return result

    """insert automat"""

    def insert(self, automat):
        """Einfügen eines Automat-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param automat das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(automat_id) AS maxid FROM automat ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            automat.set_id(maxid[0]+1)

        command = "INSERT INTO automat (automat_id, current_state, creation_date) VALUES (%s,%s,%s)"
        data = (automat.get_id(), automat.get_current_state(),automat.get_creation_date())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return automat

    """update automat"""

    def update(self, automat):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param automat das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE automat " + "SET name=%s WHERE automat_id=%s"
        data = (automat.get_current_state(), automat.get_id(), automat.get_creation_date)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete automat""" 

    def delete(self, automat):
        """Löschen der Daten eines Automaten-Objekts aus der Datenbank.

        :param automat das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM automat WHERE automat_id={}".format(automat.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()