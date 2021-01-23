from bo.Grading import Grading
from db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from grading")
        tuples = cursor.fetchall()

        for (id, creation_date, grade, participation_id) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            grading.set_participation_id(participation_id)
            result.append(grading)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT grading_id, creation_date, grade, participation_id FROM grading WHERE grading_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, grade, participation_id) = tuples[0]
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            grading.set_participation_id(participation_id)
            result = grading
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result
             

    def insert(self, grading):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(grading_id) AS maxid FROM grading")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            grading.set_id(maxid[0]+1)

        command = "INSERT INTO grading (grading_id, creation_date, grade, participation_id) VALUES (%s, CURRENT_TIMESTAMP,%s, %s)"
        data = (grading.get_id(), grading.get_grade(), grading.get_participation_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return grading


    def update(self, grading):
       
        cursor = self._cnx.cursor()

        command = "UPDATE grading " + "SET grade=" + str(grading.get_grade()) + " WHERE grading_id={}".format(grading.get_id())
        data = (grading.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return grading


    def delete(self, grading):
        cursor = self._cnx.cursor()
        command = "DELETE FROM grading WHERE grading_id={}".format(grading.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def get_grading_by_participation(self, participation_id):
            result = []
            
            cursor = self._cnx.cursor()
            command = """
            SELECT grading.grading_id, grading.grade, participation.participation_id, participation.student_id
            FROM grading
            INNER JOIN participation
            ON grading.participation_id=participation.participation_id
            WHERE grading.participation_id={0}
            """.format(participation_id)
            
            cursor.execute(command)
            tuples = cursor.fetchall()

            try:
                for(grading_id, grade, participation_id, student_id) in tuples:
                    participation_json = {"grading_id": grading_id, "grade": grade, "participation_id": participation_id, "student_id": student_id}
                    result.append(participation_json)
            except IndexError:
                print("There was no object with this id")
                result = None

            self._cnx.commit()
            cursor.close()
            return result

