from server.bo.Grading import Grading
from server.db.Mapper import Mapper


class GradingMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from grading")
        tuples = cursor.fetchall()

        for (id, creation_date, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            result.append(grading)

        self._cnx.commit()
            cursor.close()

            return result

    def find_by_grading_id(self, grading_id)

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT grading_id, grade FROM grading WHERE grade={} ORDER BY grading_id".format(grading_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            result.append(grading)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, grading):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(grading_id) AS maxid FROM grading ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            grading.set_id(maxid[0]+1)

        command = "INSERT INTO grading (grading_id, grade) VALUES (%s,%s)"
        data = (grading.get_grading_id(), grading.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return grading


    def update(self, grading):
       
        cursor = self._cnx.cursor()

        command = "UPDATE grading " + "SET grade=%s WHERE id=%s"
        data = (grading.get_grading_id(), grading.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, grading):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM grading WHERE id={}".format(grading.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


