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

        for (id, creation_date, grade) in tuples:
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            result.append(grading)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT grading_id, creation_date, grade FROM grading WHERE grading_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, grade) = tuples[0]
            grading = Grading()
            grading.set_id(id)
            grading.set_creation_date(creation_date)
            grading.set_grade(grade)
            result = grading
        except IndexError:
            print("There was no object with this id")
            result = None

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
        data = (grading.get_id(), grading.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return grading


    def update(self, grading):
       
        cursor = self._cnx.cursor()

        command = "UPDATE grading " + "SET grade=%s WHERE grading_id=%s"
        data = (grading.get_id(), grading.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, grading):
        cursor = self._cnx.cursor()
        print(grading)
        command = "DELETE FROM grading WHERE grading_id={}".format(grading.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


