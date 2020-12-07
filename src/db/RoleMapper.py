from so.Role import Role
from db.Mapper import Mapper

class RoleMapper (Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from role")
        tuples = cursor.fetchall()

        for (id, creation_date, name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_creation_date(creation_date)
            role.set_name(name)
            result.append(role)

        self._cnx.commit()
            cursor.close()

            return result


     def find_by_role_id(self, role_id)

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT role_id, name FROM role WHERE name={} ORDER BY role_id".format(role_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_creation_date(creation_date)
            role.set_name(name)
            result.append(role)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, role):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(role_id) AS maxid FROM role ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            role.set_id(maxid[0]+1)

        command = "INSERT INTO role (role_id, name) VALUES (%s,%s)"
        data = (account.get_role_id(), account.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return role


    def update(self, role):
       
        cursor = self._cnx.cursor()

        command = "UPDATE role " + "SET name=%s WHERE role_id=%s"
        data = (account.get_name(), account.get_role_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, role):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()