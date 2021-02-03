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

        for (id, creation_date, static_attribute) in tuples:
            role = Role()
            role.set_id(id)
            role.set_creation_date(creation_date)
            role.set_static_attribute(static_attribute)
            result.append(role)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT role_id, creation_date, static_attribute FROM role WHERE role_id={} ORDER BY role_id".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, creation_date, static_attribute) in tuples:
            role = Role()
            role.set_id(id)
            role.set_creation_date(creation_date)
            role.set_static_attribute(static_attribute)
            result = role

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, role):
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(role_id) AS maxid FROM role ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            role.set_id(maxid[0]+1)

        command = "INSERT INTO role (role_id, static_attributeS) VALUES (%s,%s)"
        data = (role.get_id(), role.get_static_attribute())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return role


    def update(self, role):
       
        cursor = self._cnx.cursor()

        command = "UPDATE role " + "SET static_attribute=%s WHERE role_id={}".format(role.get_id())
        data = (role.get_static_attribute())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()


    def delete(self, role):
        
        cursor = self._cnx.cursor()

        command = "DELETE FROM role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def get_role_by_person(self, person_id):
        result = []
        
        cursor = self._cnx.cursor()
        command = """
        SELECT role.role_id, role.static_attribute, person.person_id, person.name
        FROM person
        INNER JOIN role
        ON person.role_id=role.role_id
        WHERE person.person_id={}
        """.format(person_id)
        
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            for(role_id, static_attribute, person_id, person_name) in tuples:
                person_json = {"role_id": role_id, "static_attribute": static_attribute, "person_id": person_id, "person_name": person_name}
                result.append(person_json)
        except IndexError:
            print("There was no object with this id")
            result = None

        self._cnx.commit()
        cursor.close()
        return result