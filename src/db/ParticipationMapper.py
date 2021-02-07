from bo.Participation import Participation
from db.Mapper import Mapper

class ParticipationMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        command=("SELECT * from participation")
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, student_id) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_date(creation_date)
            participation.set_student_id(student)
            participation.set_project_id(project)
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
        command = "SELECT participation_id, creation_date, student_id, project_id FROM participation WHERE participation_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, student_id, project_id) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_creation_date(creation_date)
            participation.set_student_id(student_id)
            participation.set_project_id(project_id)
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

        command = "INSERT INTO participation (creation_date, participation_id, student_id, project_id) VALUES (CURRENT_TIMESTAMP, "+str(participation.get_id()) +", "+str(participation.get_student_id()) +", "+str(participation.get_project_id()) +")"
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()
        return participation


    def update(self, participation):
       
        cursor = self._cnx.cursor()

        command = "UPDATE participation " + "SET student_id=" + str(participation.get_student_id()) + " WHERE participation_id={}".format(participation.get_id())
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

    def delete_participation_by_student(self, student_id):

        cursor = self._cnx.cursor()
        print(student_id)
        command = "DELETE FROM participation WHERE student_id={}".format(student_id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
    

    def get_participation_by_student(self, student_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT participation_id, student_id, project_id 
        FROM participation
        WHERE participation.student_id={}""".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(participation_id, student_id, project_id) in tuples:
                student_json = {"participation_id": participation_id, "student_id": student_id, "project_id": project_id}
                result.append(student_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_project_of_participation (self, participation_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT participation.participation_id, project.project_id, project.name
        FROM participation
        INNER JOIN project
        ON participation.project_id=project.project_id
        WHERE participation.participation_id={0}
        """.format(participation_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(participation_id, project_id, name) in tuples:
                project_json = {"participation_id": participation_id, "project_id": project_id, "project_name": name}
                result.append(project_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_participations_by_project (self, project_id):
        result = []
        cursor = self._cnx.cursor()

        command = """
        SELECT participation.participation_id, participation.student_id, project.project_id
        FROM participation
        INNER JOIN project
        ON participation.project_id=project.project_id
        WHERE participation.project_id={}
        """.format(project_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()
        print(tuples)

        try:
            for(participation_id, student_id, project_id) in tuples:
                participation_json = {"id": participation_id, "student_id": student_id, "project_id": project_id}
                result.append(participation_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result