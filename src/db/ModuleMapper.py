from bo.nbo.Module import Module
from db.Mapper import Mapper

class ModuleMapper (Mapper):

    def __init__(self):
        super().__init__()
        

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        command=("SELECT * from module")
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, edv_number) in tuples:
            module = Module()
            module.set_id(id)
            module.set_creation_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT module_id, creation_date, name, edv_number FROM module WHERE module_id={} ORDER BY module_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name, edv_number) in tuples:
            module = Module()
            module.set_id(id)
            module.set_creation_date(creation_date)
            module.set_name(name)
            module.set_edv_number(edv_number)
            result = module

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT module_id, name, edv_number FROM module WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_number) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, module):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(module_id) AS maxid FROM module ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:

            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem Person-Objekt zu."""
                module.set_id(maxid[0] + 1)

            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                module.set_id(1)

        command = "INSERT INTO module (module_id, creation_date, name, edv_number) VALUES (%s,%s,%s,%s)"
        data = (module.get_id(),module.get_creation_date(), module.get_name(), module.get_edv_number())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return module


    def update(self, module):
       
        cursor = self._cnx.cursor()

        command = "UPDATE module " + "SET name=%s, edv_number=%s WHERE module_id={}".format(module.get_id())
        data = (module.get_name(), module.get_edv_number())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, module):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM module WHERE module_id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Insert Methode Getestet """

# if (__name__ == "__main__"):
#     module = Module()
#     module.set_id(id)
#     module.set_name("name")
#     module.set_edv_number(67890)
#
#     with ModuleMapper() as mapper:
#        result = mapper.insert(module)

"""Delete Methode getestet"""

# if (__name__ == "__main__"):
#     module = Module()
#     module.set_id(1)
#
#     with ModuleMapper() as mapper:
#         result = mapper.delete(module)
#         print(result)

"""find_by_id getestet"""

# if (__name__ == "__main__"):
#
#     with ModuleMapper() as mapper:
#         result = mapper.find_by_id(1)
#         for p in result:
#             print(p)

"""update methode getestet"""

# if (__name__ == "__main__"):
#     module = Module()
#     module.set_id(1)
#     module.set_name("hhhh")
#     module.set_edv_number(890123)
#
#     with ModuleMapper() as mapper:
#         result = mapper.update(module)

"""find all getestet"""

# if (__name__ == "__main__"):
#
#     with ModuleMapper() as mapper:
#         result = mapper.find_all()
#         for p in result:
#             print(p)

"""find_by_name getestet"""

# if (__name__ == "__main__"):
#
#     with ModuleMapper() as mapper:
#         result = mapper.find_by_name("name")
#         for p in result:
#             print(p)
