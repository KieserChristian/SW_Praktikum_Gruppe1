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
        command = "SELECT project_type_id, creation_date, name, number_ects, number_sws FROM project_type WHERE project_type_id='{}' ORDER BY project_type_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, number_ects, number_sws) = tuples[0]
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_date(creation_date)
            project_type.set_name(name)
            project_type.set_number_ects(number_ects)
            project_type.set_number_sws(number_sws)
            result = project_type
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT project_type_id, creation_date, name, number_ects, number_sws FROM project_type WHERE name='{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_date, name, number_ects, number_sws) = tuples[0]
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_date(creation_date)
            project_type.set_name(name)
            project_type.set_number_ects(number_ects)
            project_type.set_number_sws(number_sws)
            result = project_type
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, project_type):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(project_type_id) AS maxid FROM project_type")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project_type.set_id(maxid[0]+1)

        command = "INSERT INTO project_type (project_type_id, creation_date, name, number_ects, number_sws) VALUES (%s,%s,%s,%s,%s)"
        data = (project_type.get_id(), project_type.get_creation_date(), project_type.get_name(), project_type.get_number_ects(), project_type.get_number_sws())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project_type


    def update(self, project_type):
       
        cursor = self._cnx.cursor()

        command = "UPDATE project_type " + "SET name=%s, number_ects=%s, number_sws=%s WHERE project_type_id={}".format(project_type.get_id())
        data = (project_type.get_name(), project_type.get_number_ects(), project_type.get_number_sws())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project_type


    def delete(self, project_type):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM project_type WHERE project_type_id='{}'".format(project_type.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Insert Methode Getestet """

# if (__name__ == "__main__"):
#     project_type = ProjectType()
#     project_type.set_id(id)
#     project_type.set_name("transdisziplinär")
#     project_type.set_number_ects(5)
#     project_type.set_number_sws(4)
#
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.insert(project_type)

"""Delete Methode getestet"""

# if (__name__ == "__main__"):
#     project_type = ProjectType()
#     project_type.set_id(1)
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.delete(project_type)
#         print(result)

"""update methode getestet"""

# if (__name__ == "__main__"):
#     project_type = ProjectType()
#     project_type.set_id(4)
#     project_type.set_name("fachspezifisch")
#     project_type.set_number_ects(4)
#     project_type.set_number_sws(6)
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.update(project_type)

"""find_by_id getestet"""
# if (__name__ == "__main__"):
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.find_by_id(3)
#         for p in result:
#             print(p)

"""find all getestet"""

# if (__name__ == "__main__"):
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.find_all()
#         for p in result:
#             print(p)

"""find_by_name getestet"""

# if (__name__ == "__main__"):
#
#     with ProjectTypeMapper() as mapper:
#         result = mapper.find_by_name("fachspezifisch")
#         for p in result:
#             print(p)


