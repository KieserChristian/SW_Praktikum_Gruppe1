from bo.nbo.Project import Project
from db.Mapper import Mapper

class ProjectMapper (Mapper):
    """Mapper-Klasse, die Project-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """
    def __init__(self):
        super().__init__()

    """find all """

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Project-Objekten, die sämtliche Konten
                repräsentieren.
                "SELECT * from it_project.project"
        """
        result = []
        cursor = self._cnx.cursor()
        command=("SELECT * from project")
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type, module, person) in tuples:
            project = Project()
            project.set_id(id)
            project.set_creation_date(creation_date)
            project.set_name(name)
            project.set_state(current_state)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_description(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            project.set_project_type_id(project_type)
            project.set_module_id(module)
            project.set_person_id(person)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Projects.

        :param project_id Schlüssel des zugehörigen Projekts.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Konten der
                betreffenden Projects repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_id, creation_date, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id FROM project WHERE project_id={} ORDER BY project_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try: 
            (id, creation_date, name, current_state, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_creation_date(creation_date)
            project.set_name(name)
            project.set_state(current_state)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_description(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            project.set_project_type_id(project_type_id)
            project.set_module_id(module_id)
            project.set_person_id(person_id)
            result = project
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    """find by name"""

    def find_by_name(self, name):
        """Auslesen aller Projekte anhand des Namen.

        :param name des zugehörigen Projects.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Projects
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_id, creation_date, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id FROM project WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, current_state, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id) in tuples:
            project = Project()
            project.set_id(id)
            project.set_creation_date(creation_date)
            project.set_name(name)
            project.set_state(current_state)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_description(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            project.set_project_type_id(project_type_id)
            project.set_module_id(module_id)
            project.set_person_id(person_id)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    """insert project"""

    def insert(self, project):
        """Einfügen eines Project-Objekts in die Datenbank.
        
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param project das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(project_id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Person-Objekt zu."""
                project.set_id(maxid[0] + 1)

            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                project.set_id(1)

        command = "INSERT INTO project (project_id, creation_date, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (project.get_id(), project.get_creation_date(), project.get_name(), project.get_state(), project.get_capacity(), project.get_external_partners(), project.get_short_description(), project.get_weekly_flag(), project.get_bd_before_lecture_period(), project.get_bd_in_lecture_period(), project.get_bd_in_exam_period(), project.get_bd_preferred_in_lecture_period(), project.get_special_room(), project.get_project_type_id(), project.get_module_id(), project.get_person_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project

    """update project"""

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param project das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE project " + "SET creation_date=%s, name=%s, current_state=%s, capacity=%s, external_partners=%s, short_description=%s, weekly_flag=%s, bd_before_lecture_period=%s, bd_in_lecture_period=%s, bd_in_exam_period=%s, bd_preferred_in_lecture_period=%s, special_room=%s, project_type_id=%s, module_id=%s, person_id=%s WHERE project_id={}".format(project.get_id())
        data = (project.get_creation_date(), project.get_name(), project.get_state(), project.get_capacity(), project.get_external_partners(), project.get_short_description(), project.get_weekly_flag(), project.get_bd_before_lecture_period(), project.get_bd_in_lecture_period(), project.get_bd_in_exam_period(), project.get_bd_preferred_in_lecture_period(), project.get_special_room(), project.get_project_type_id(), project.get_module_id(), project.get_person_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete project""" 

    def delete(self, project):
        """Löschen der Daten eines Project-Objekts aus der Datenbank.

        :param project das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE project_id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def get_project_type_of_project(self, project_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT project.project_id, project.name, project_type.project_type_id, project_type.name
        FROM project
        INNER JOIN project_type
        ON project.project_type_id=project_type.project_type_id
        WHERE project.project_id={0}
        """.format(project_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(project_id, project_name, project_type_id, project_type_name) in tuples:
                project_type_json = {"project_id": project_id, "project_name": project_name, "project_type_id": project_type_id, "project_type_name": project_type_name}
                result.append(project_type_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_module_of_project(self, project_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT project.project_id, project.name, module.module_id, module.name
        FROM project
        INNER JOIN module
        ON project.module_id=module.module_id
        WHERE project.project_id={0}
        """.format(project_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(project_id, project_name, module_id, module_name) in tuples:
                module_json = {"project_id": project_id, "project_name": project_name, "module_id": module_id, "module_name": module_name}
                result.append(module_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_projects_by_person(self, person_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT project.project_id, project.name, person.person_id, person.name
        FROM project
        INNER JOIN person
        ON project.person_id=person.person_id
        WHERE project.person_id={0}
        """.format(person_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(project_id, project_name, person_id, person_name) in tuples:
                person_json = {"project_id": project_id, "project_name": project_name, "person_id": person_id, "person_name": person_name}
                result.append(person_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_projects_by_state(self, current_state):
        result = []
        
        cursor = self._cnx.cursor()
        command = " SELECT * from project WHERE project.current_state = '{}'".format(current_state)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, current_state, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id) in tuples:
            project = Project()
            project.set_id(id)
            project.set_creation_date(creation_date)
            project.set_name(name)
            project.set_state(current_state)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_description(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            project.set_project_type_id(project_type_id)
            project.set_module_id(module_id)
            project.set_person_id(person_id)
            result.append(project)

        self._cnx.commit()
        cursor.close()
        return result


    def get_registered_projects_of_student(self, student_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT project.project_id, project.name, project.current_state, project.capacity, project.external_partners, project.short_description, project.weekly_flag, project.bd_before_lecture_period, project.bd_in_lecture_period, project.bd_in_exam_period, project.bd_preferred_in_lecture_period, project.special_room, project.project_type_id, project.module_id
        FROM participation
        INNER JOIN student
        ON participation.student_id=student.student_id
        INNER JOIN project
        ON participation.project_id=project.project_id
        WHERE participation.student_id={}
        """.format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(project_id, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id) in tuples:
                student_json = {"project_id": project_id, "name": name, "current_state": current_state, "capacity": capacity, "external_partners": external_partners, "short_description": short_description, "weekly_flag": weekly_flag, "bd_before_lecture_period": bd_before_lecture_period, "bd_in_lecture_period": bd_in_lecture_period, "bd_in_exam_period": bd_in_exam_period, "bd_preferred_in_lecture_period": bd_preferred_in_lecture_period, "special_room": special_room, "project_type_id": project_type_id, "module_id": module_id}
                result.append(student_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result


    def get_available_projects_for_student(self, student_id):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE project.project_id NOT IN (SELECT participation.project_id FROM student LEFT JOIN participation ON student.student_id = participation.student_id WHERE student.student_id = {}) and project.current_state = 'Genehmigt' ".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, current_state, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, person_id) in tuples:
            project = Project()
            project.set_id(id)
            project.set_creation_date(creation_date)
            project.set_name(name)
            project.set_state(current_state)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_description(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            project.set_project_type_id(project_type_id)
            project.set_module_id(module_id)
            project.set_person_id(person_id)
            result.append(project)    

        self._cnx.commit()
        cursor.close()
        return result


    def get_graded_projects_of_student(self, student_id):
        result = []
        cursor = self._cnx.cursor()
        command = """
        SELECT project.project_id, project.name, project.current_state, project.capacity, project.external_partners, project.short_description, project.weekly_flag, project.bd_before_lecture_period, project.bd_in_lecture_period, project.bd_in_exam_period, project.bd_preferred_in_lecture_period, project.special_room, project.project_type_id, project.module_id, participation.participation_id, participation.student_id, grading.grading_id, grading.grade
        FROM sw_praktikum_cloud.participation
        LEFT JOIN sw_praktikum_cloud.project
        ON participation.project_id=project.project_id
        LEFT JOIN sw_praktikum_cloud.grading
        ON participation.participation_id=grading.participation_id
        WHERE participation.student_id= {} and project.current_state = 'Bewertung abgeschlossen'""".format(student_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(project_id, name, current_state, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_lecture_period, bd_in_exam_period, bd_preferred_in_lecture_period, special_room, project_type_id, module_id, participation_id, student_id, grading_id, grade) in tuples:
                student_json = {"project_id": project_id, "project_name": name, "current_state": current_state, "capacity": capacity, "external_partners": external_partners, "short_description": short_description, "weekly_flag": weekly_flag, "bd_before_lecture_period": bd_before_lecture_period, "bd_in_lecture_period": bd_in_lecture_period, "bd_in_exam_period": bd_in_exam_period, "bd_preferred_in_lecture_period": bd_preferred_in_lecture_period, "special_room": special_room, "project_type_id": project_type_id, "module_id": module_id, "participation_id": participation_id, "student_id": student_id, "grading_id": grading_id, "grade": grade}
                result.append(student_json)
        except IndexError:
            print("There was no object with this id")
            result = None    

        self._cnx.commit()
        cursor.close()
        return result

    







"""Insert Methode Getestet """

# if (__name__ == "__main__"):
#     project = Project()
#     project.set_id(id)
#     project.set_name("stini")
#     project.set_capacity(124)
#     project.set_external_partners("sap")
#     project.set_short_description("ReWe")
#     project.set_weekly_flag(0)
#     project.set_bd_before_lecture_period(1)
#     project.set_bd_in_exam_period(2)
#     project.set_bd_in_lecture_period(3)
#     project.set_bd_preferred_in_lecture_period(4)
#     project.set_special_room("audimax")
#
#     with ProjectMapper() as mapper:
#        result = mapper.insert(project)

"""Delete Methode getestet"""

#if (__name__ == "__main__"):
    #project = Project()
    #project.set_id(3)

    #with ProjectMapper() as mapper:
        #result = mapper.delete(project)
        #print(result)

"""find_by_id getestet"""
#if (__name__ == "__main__"):

    #with ProjectMapper() as mapper:
        #result = mapper.find_by_id(1)
        #for p in result:
            #print(p)

"""update methode getestet"""
#if (__name__ == "__main__"):
    #project = Project()
    #project.set_id(2)
    #project.set_name("ggg")
    #project.set_capacity(12)
    #project.set_external_partners("yyy")
    #project.set_short_description("sdf")
    #project.set_weekly_flag(1)
    #project.set_bd_before_lecture_period(2)
    #project.set_bd_in_exam_period(3)
    #project.set_bd_in_lecture_period(4)
    #project.set_bd_preferred_in_lecture_period(5)
    #project.set_special_room("audimaxx")

    #with ProjectMapper() as mapper:
        #result = mapper.update(project)

"""find all getestet"""

# if (__name__ == "__main__"):
#
#     with ProjectMapper() as mapper:
#         result = mapper.find_all()
#         for p in result:
#             print(p)

"""find_by_name getestet"""

# if (__name__ == "__main__"):
#
#     with ProjectMapper() as mapper:
#         result = mapper.find_by_name("peter")
#         for p in result:
#             print(p)