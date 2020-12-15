from bo.nbo.Student import Student
from db.Mapper import Mapper

class StudentMapper (Mapper):
    """Mapper-Klasse, die Student-Objekte auf eine relationale
    Datenbank abbildet
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller vorhandenen Studenten.

        :return Eine Sammlung aller Student-Objekte
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, matriculation_number, course_abbreviation FROM student")
        tuples = cursor.fetchall()

        for (id, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen einer Studenten durch die ID

        :param id
        :return Student-Objekt, das der übergebenen ID entspricht
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_number, course_abbreviation FROM student WHERE name={} ORDER BY id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen aller Studenten anhand des Namens.

        :param name
        :return Eine Sammlung mit Student-Objekten, die sämtliche Studenten
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_number, course_abbreviation FROM student WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_matriculation_number(self, matriculation_number):
        """Auslesen eines Studenten durch die Matrikelnummer

        :param matriculation_number
        :return Student-Objekt, das der übergebenen Matrikelnummer entspricht
        """      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_number, course_abbreviation FROM student WHERE matriculation_number LIKE '{}' ORDER BY matriculation_number".format(matriculation_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_course_abbreviation(self, course_abbreviation):
        """Auslesen eines Studenten durch das Studiengangskürzel

        :param course_abbreviation
        :return Student-Objekt, das dem übergebenen Studiengangskürzel entspricht
        """          
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_number, course_abbreviation FROM student WHERE course_abbreviation LIKE '{}' ORDER BY course_abbreviation".format(course_abbreviation)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Einfügen eines Student-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param student
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM student ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            student.set_id(maxid[0]+1)

        command = "INSERT INTO student (id, name, matriculation_number, course_abbreviation) VALUES (%s,%s,%s,%s)"
        data = (student.get_id(), student.get_name(), student.get_matriculation_number, student.get_course_abbreviation)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return student

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param student
        """       
        cursor = self._cnx.cursor()

        command = "UPDATE student " + "SET name=%s WHERE id=%s"
        data = (student.get_id(), student.get_name(), student.get_matriculation_number, student.get_course_abbreviation)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, student):
        """Löschen eines Student-Objekts aus der Datenbank.

        :param student
        """       
        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()