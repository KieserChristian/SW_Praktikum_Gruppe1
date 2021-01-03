from bo.nbo.ProjectType import ProjectType
from db.Mapper import Mapper

class ProjectTypeMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from project_type")
        tuples = cursor.fetchall()

        for (id, creation_date, name, number_ects, number_sws) in tuples:
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_date(creation_date)
            project_type.set_name(name)
            project_type.set_number_ects(number_ects)
            project_type.set_number_sws(number_sws)
            result.append(project_type)

        self._cnx.commit()
        cursor.close()

        return result

    
    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_type_id, creation_date, name, number_ects, number_sws FROM project_type WHERE name={} ORDER BY project_type_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, number_ects, number_sws) in tuples:
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_date(creation_date)
            project_type.set_name(name)
            project_type.set_number_ects(number_ects)
            project_type.set_number_sws(number_sws)
            result.append(project_type)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_type_id, creation_date, name, number_ects, number_sws FROM project_type WHERE name={} ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, number_ects, number_sws) in tuples:
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_date(creation_date)
            project_type.set_name(name)
            project_type.set_number_ects(number_ects)
            project_type.set_number_sws(number_sws)
            result.append(project_type)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, project_type):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(project_type_id) AS maxid FROM project_type")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Person-Objekt zu."""
                project_type.set_id(maxid[0] + 1)

            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                project_type.set_id(1)

        command = "INSERT INTO project_type (project_type_id, creation_date, name, number_ects, number_sws) VALUES (%s,%s,%s,%s,%s)"
        data = (project_type.get_id(), project_type.get_creation_date(), project_type.get_name(), project_type.get_number_ects(), project_type.get_number_sws())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project_type


    def update(self, project_type):
       
        cursor = self._cnx.cursor()

        command = "UPDATE project_type " + "SET name=%s WHERE project_type_id=%s"
        data = (account.get_name(), account.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, project_type):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM project_type WHERE id={}".format(project_type.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

if (__name__ == "__main__"):
    project_type = ProjectType
    project_type.set_id(id)
    project_type.set_name("transdisziplinär")
    project_type.set_number_ects(5)
    project_type.set_number_sws(4)


    with ProjectTypeMapper() as mapper:
        result = mapper.insert(project_type)

