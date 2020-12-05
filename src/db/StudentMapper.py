from src.bo.nbo.Student import Student
from src.db.Mapper import Mapper

class StudentMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from student")
        tuples = cursor.fetchall()

        for (id, creation_date, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
            cursor.close()

            return result

    
    def find_by_student_id(self, student_id)

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, name, matriculation_number, course_abbreviation FROM student WHERE name={} ORDER BY student_id".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, name, matriculation_number, course_abbreviation FROM student WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_matricualtion_number(self, matricualtion_number):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, name, matriculation_number, course_abbreviation FROM student WHERE matricualtion_number LIKE '{}' ORDER BY matricualtion_number".format(matricualtion_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    
    def find_by_course_abbreviation(self, course_abbreviation):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, name, matriculation_number, course_abbreviation FROM student WHERE course_abbreviation LIKE '{}' ORDER BY course_abbreviation".format(course_abbreviation)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, student):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(student_id) AS maxid FROM student ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            student.set_id(maxid[0]+1)

        command = "INSERT INTO student (student_id, name, matriculation_number, course_abbreviation) VALUES (%s,%s,%s,%s)"
        data = (account.get_student_id(), account.get_name(), account.get_matriculation_number, account.get_course_abbreviation)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return student


    def update(self, student):
       
        cursor = self._cnx.cursor()

        command = "UPDATE student " + "SET name=%s WHERE student_id=%s"
        data = (account.get_student_id(), account.get_name(), account.get_matriculation_number, account.get_course_abbreviation)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, student):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()