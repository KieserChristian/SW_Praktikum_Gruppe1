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
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from project")
        tuples = cursor.fetchall()

        for (project_id, edv_number, name, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room) in tuples:
            project = Project()
            project.set_project_id(project_id)
            project.set_edv_number(edv_number)
            project.set_name(name)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_descripton(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    """find by id """

    def find_by_id(self, project_id):
        """Auslesen aller Konten eines durch Fremdschlüssel gegebenen Projects.

        :param project_id Schlüssel des zugehörigen Projekts.
        :return Eine Sammlung mit Project-Objekten, die sämtliche Konten der
                betreffenden Projects repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_id, edv_number, name, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room FROM project WHERE name={} ORDER BY id".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (project_id, edv_number, name, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room) in tuples:
            project = Project()
            project.set_project_id(project_id)
            project.set_edv_number(edv_number)
            project.set_name(name)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_descripton(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            result.append(project)

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
        command = "SELECT project_id, edv_number, name, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room FROM project WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (project_id, edv_number, name, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room) in tuples:
            project = Project()
            project.set_id(project_id)
            project.set_edv_number(edv_number)
            project.set_name(name)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_descripton(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result
    
    """ find by edv"""

    def find_by_edv(self, edv_number):
        """Suchen eines Projects mit vorgegebener EDV Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param edv EDV NUMMER aus der Datenbank. 
        :return Project-Objekt, das dem übergebenen EDV entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT project_id, edv_number, name, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room FROM project WHERE edv_number={}".format(edv_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (project_id, edv_number, name, capacity, external_partners,short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room) = tuples [0]
            project = Project()
            project.set_id(project_id)
            project.set_edv_number(edv_number)
            project.set_name(name)
            project.set_capacity(capacity)
            project.set_external_partners(external_partners)
            project.set_short_descripton(short_description)
            project.set_weekly_flag(weekly_flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_in_exam_period(bd_in_exam_period)
            project.set_bd_in_lecture_period(bd_in_lecture_period)
            project.set_bd_preferred_in_lecture_period(bd_preferred_in_lecture_period)
            project.set_special_room(special_room)
            result=project
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

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
            project.set_id(maxid[0]+1)

        command = "INSERT INTO project (project_id, edv_number, name, capacity, external_partners, short_description, weekly_flag, bd_before_lecture_period, bd_in_exam_period, bd_in_lecture_period, bd_preferred_in_lecture_period, special_room) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (project.get_project_id(), project.get_edv_number(), project.get_name(), project.get_capacity(), project.get_external_partners(), project.get_short_descriptions(), project.get_weekly_flag(), project.get_bd_before_lecture_period(), project.get_bd_in_exam_period(), project.bd_in_lecture_period(), project.bd_preferred_in_lecture_period(), project.special_room())
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

        command = "UPDATE project " + "SET name=%s WHERE project_id=%s"
        data = (project.get_project_id(), project.get_edv_number(), project.get_name(), project.get_capacity(), project.get_external_partners(), project.get_short_descriptions(), project.get_weekly_flag(), project.get_bd_before_lecture_period(), project.get_bd_in_exam_period(), project.bd_in_lecture_period(), project.bd_preferred_in_lecture_period(), project.special_room())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    """delete project""" 

    def delete(self, project):
        """Löschen der Daten eines Project-Objekts aus der Datenbank.

        :param project das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE project_id={}".format(project.get_project_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()