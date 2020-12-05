from src.bo.nbo.ProjectType import ProjectType
from src.db.Mapper import Mapper

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

    
    def find_by_project_type_id(self, project_type_id)

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_type_id, name, number_ects, number_sws FROM project_type WHERE name={} ORDER BY project_type_id".format(project_type_id)
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
        command = "SELECT project_type_id, name, number_ects, number_sws FROM project_type WHERE name={} ORDER BY name".format(name)
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
        cursor.execute("SELECT MAX(project_type_id) AS maxid FROM project_type ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project_type.set_id(maxid[0]+1)

        command = "INSERT INTO project_type (project_type_id, name, number_ects, number_sws) VALUES (%s,%s,%s,%s)"
        data = (project_type.get_project_type_id(), project_type.get_name(), project_type.get_number_ects, project_type.get_number_sws)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project_type


    def update(self, project_type):
       
        cursor = self._cnx.cursor()

        command = "UPDATE project_type " + "SET name=%s WHERE project_type_id=%s"
        data = (account.get_name(), account.get_project_type_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, project_type):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM project_type WHERE id={}".format(project_type.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()