from bo.Participation import Participation
from db.Mapper import Mapper

class ParticipationMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from participation")
        tuples = cursor.fetchall()

        for (id, creation_date) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_date(creation_date)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result

    
    """def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT participation_id, creation_date FROM participation WHERE participation_id={} ORDER BY participation_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_date(creation_date)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, participation):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(participation_id) AS maxid FROM participation")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            participation.set_id(maxid[0]+1)

        command = "INSERT INTO participation (participation_id, creation_date) VALUES (%s, CURRENT_TIMESTAMP)"
        data = (participation.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation"""

    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT participation_id, creation_date FROM participation WHERE participation_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_date(creation_date)
            print(participation.get_creation_date())
            result = participation
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, participation):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(participation_id) AS maxid FROM participation")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            participation.set_id(maxid[0]+1)

        command = "INSERT INTO participation (creation_date, participation_id) VALUES (CURRENT_TIMESTAMP, "+str(participation.get_id()) +")"
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()
        return participation


    def update(self, participation):
       
        cursor = self._cnx.cursor()

        command = "UPDATE participation " + "SET participation_id=%s WHERE participation_id=%s"
        data = (participation.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, participation):
    
        cursor = self._cnx.cursor()

        command = "DELETE FROM participation WHERE participation_id={}".format(participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()