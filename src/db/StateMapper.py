from src.so.State import State
from src.db.Mapper import Mapper

class StateMapper (Mapper):
    """Mapper-Klasse, die State-Objekte auf eine relationale
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

        :return Eine Sammlung mit State-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from state")
        tuples = cursor.fetchall()

        for (state_id, creation_date, name) in tuples:
            state = State()
            state.set_id(state_id)
            state.set_creation_date(creation_date)
            state.set_name(name)
            result.append(state)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, state_id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen States.

        :param state_id Schlüssel des zugehörigen Kunden.
        :return Eine Sammlung mit State-Objekten, die sämtliche Konten der
                betreffenden Person repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT state_id, creation_date, name FROM states WHERE name={} ORDER BY id".format(state_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (state_id, creation_date, name) in tuples:
            state = State()
            state.set_id(state_id)
            state.set_creation_date(creation_date)
            state.set_name(name)
            result.append(state)

        self._cnx.commit()
        cursor.close()

        return result

    """insert state"""

    def insert(self, state):
        """Einfügen eines State-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param state das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(state_id) AS maxid FROM state ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            state.set_state_id(maxid[0]+1)

        command = "INSERT INTO state (state_id, creation_date, name) VALUES (%s,%s,%s)"
        data = (state.get_state_id(), state.get_creation_date(), state.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return state

    """update state"""

    def update(self, state):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param state das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE state " + "SET name=%s WHERE state_id=%s"
        data = (state.get_state_id(), state.get_creation_date(), state.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete state""" 

    def delete(self, state):
        """Löschen der Daten eines State-Objekts aus der Datenbank.

        :param state das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM state WHERE state_id={}".format(state.get_state_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()