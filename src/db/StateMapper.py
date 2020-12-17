from so.State import State
from db.Mapper import Mapper

"""Mapper-Klasse, die State-Objekte auf eine relationale Datenbank abbildet"""

class StateMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Zustände

        :return Eine Sammlung aller Zustands-Objekte"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT state_id, state_name FROM state")
        tuples = cursor.fetchall()

        for (id, state_name) in tuples:
            state = State()
            state.set_id(id)
            state.set_state_name(state_name)
            result.append(state)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen eines Zustands durch die ID

        :param  state_id
        :return State-Objekt, das der übergebenden ID entspricht"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT state_id, state_name FROM state WHERE state_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, state_name) in tuples:
            state = State()
            state.set_id(id)
            state.set_state_name(state_name)
            result.append(state)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, state):
        """Einfügen eines State-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param  state 
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(state_id) AS maxid FROM state")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem State-Objekt zu."""
                state.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                state.set_id(1)
            

        command = "INSERT INTO state (state_id, state_name) VALUES (%s,%s)"
        data = (state.get_id(), state.get_state_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return state

    def update(self, state):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param state
        """
        cursor = self._cnx.cursor()

        command = "UPDATE state " + "SET state_name=%s WHERE state_id=%s"
        data = (state.get_state_name(), state.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, state):
        """Löschen der Daten eines State-Objekts aus der Datenbank.

        :param state 
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM state WHERE state_id={}".format(state.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

""" if (__name__ == "__main__"):
    with StateMapper() as mapper:
        result = mapper.find_all()
        for s in result:
            print(s) """