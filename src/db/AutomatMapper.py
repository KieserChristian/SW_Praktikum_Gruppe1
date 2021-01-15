from so.Automat import Automat
from db.Mapper import Mapper

"""Mapper-Klasse, die Automat-Objekte auf eine relationale Datenbank abbildet"""

class AutomatMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Automaten

        :return Eine Sammlung aller Automat-Objekte"""
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT automat_id, current_state FROM automat")
        tuples = cursor.fetchall()

        for (id, current_state) in tuples:
            automat = Automat()
            automat.set_id(id)
            automat.set_state(current_state)
            result.append(automat)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen eines Automats durch die ID

        :param  automat_id
        :return Automatobjekt, das der übergebenen ID entspricht"""
            
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT automat_id, current_state FROM automat WHERE automat_id={} ORDER BY automat_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, current_state) = tuples[0]
            automat = Automat()
            automat.set_id(id)
            automat.set_state(current_state)
            result = automat

        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, automat):
        """Einfügen eines Automat-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param  automat
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(automat_id) AS maxid FROM automat")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Automat-Objekt zu."""
                automat.set_id(maxid[0]+1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                automat.set_id(1)

        command = "INSERT INTO automat (automat_id, current_state) VALUES (%s,%s)"
        data = (automat.get_id(), automat.get_state())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return automat

    def update(self, automat):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param automat 
        """
        cursor = self._cnx.cursor()

        command = "UPDATE automat " + "SET current_state=%s WHERE automat_id=%s"
        data = (automat.get_state(), automat.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, automat):
        """Löschen der Daten eines Automat-Objekts aus der Datenbank.

        :param automat das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM automat WHERE automat_id={}".format(automat.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

""" if (__name__ == "__main__"):
    with AutomatMapper() as mapper:
        result = mapper.find_all()
        for a in result:
            print(a) """