from server.nbo.Module import Module
from server.db.Mapper import Mapper

class ModuleMapper (Mapper):

    def __init__(self):
        super().__init__()
        

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from module")
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


    def find_by_module_id(self, module_id)

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT module_id, name, edv_number FROM module WHERE edv_number={} ORDER BY module_id".format(module_id)
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


    def find_by_name(self, name):
      
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT module_id, name, edv_number FROM module WHERE name={} ORDER BY module_id".format(module_id)
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


    def insert(self, module):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(module_id) AS maxid FROM module ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            module.set_id(maxid[0]+1)

        command = "INSERT INTO module (module_id, name, edv_number) VALUES (%s,%s,%s)"
        data = (module.get_module_id(), module.get_name(), module.get_edv_number)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return module


    def update(self, module):
       
        cursor = self._cnx.cursor()

        #command = "UPDATE module " + "SET owner=%s WHERE id=%s"
        #data = (module.get_owner(), module.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, module):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM module WHERE id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
    

    