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
        cursor.execute("SELECT * FROM student")
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen einer Studenten durch die ID

        :param  id
        :return Student-Objekt, das der übergebenen ID entspricht
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE student_id={} ORDER BY student_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
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
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE name={} ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_google_id(self, google_id):
        """Auslesen eines Studenten durch die Google-ID

        :param  google_id
        :return Student-Objekt, das der übergebenen Google-ID entspricht
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE google_id={} ORDER BY google_id".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
            student.set_matriculation_number(matriculation_number)
            student.set_course_abbreviation(course_abbreviation)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_email(self, email):
        """Auslesen eines Studenten durch die E-Mail-Adresse

        :param  email
        :return Student-Objekt, das der übergebenen E-Mail-Adresse entspricht
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE email={} ORDER BY email".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
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
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE matriculation_number={} ORDER BY matriculation_number".format(matriculation_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
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
        command = "SELECT student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation FROM student WHERE course_abbreviation={} ORDER BY course_abbreviation".format(course_abbreviation)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) in tuples:
            student = Student()
            student.set_id(id)
            student.set_creation_date(creation_date)
            student.set_name(name)
            student.set_google_id(google_id)
            student.set_email(email)
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

        :param  student
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(student_id) AS maxid FROM student")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Student-Objekt zu."""
                student.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                student.set_id(1)

        command = "INSERT INTO student (student_id, creation_date, name, google_id, email, matriculation_number, course_abbreviation) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (student.get_id(), student.get_creation_date(), student.get_name(), student.get_google_id(), student.get_email(), student.get_matriculation_number(), student.get_course_abbreviation())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return student

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param student
        """       
        cursor = self._cnx.cursor()

        command = "UPDATE student " + "SET creation_date=%s, name=%s, google_id=%s, email=%s, matriculation_number=%s, course_abbreviation=%s WHERE student_id=%s"
        data = (student. get_creation_date(), student.get_name(), student.get_google_id(), student.get_email(), student.get_matriculation_number, student.get_course_abbreviation, student.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, student):
        """Löschen eines Student-Objekts aus der Datenbank.

        :param student
        """       
        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE student_id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()