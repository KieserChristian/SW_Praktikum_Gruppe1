from ..Role import Role
from datetime import datetime
from NamedBusinessObject import NamedBusinessObject

class Person (NamedBusinessObject):

     def __init__ (self, id, creation_date, email, google_id, authorization, name):
        super.__init__()
        self._authorization = role
        self._google_id = ""
        self._email = ""

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Personeninstanz"""
        return "Person: {}, Rolle: {}, Google-ID: {}, E-Mail: {} ".format(self.get_id(), self.get_authorization(),
                                                                        self.get_google_id(), self.get_email())

    def set_authorization (self, name):
        """Berechtigung setzen"""
        self._authorization = name

    def get_authorization (self):
        """Berechtigung auslesen"""
        return self._authorization

    def get_id (self):
        """Auslesen der ID"""
        return self._id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date

    def set_id (self, value):
        """ID setzen"""
        self._id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date

     def get_google_id (self):
        """Auslesen der Google Id"""
        return self._google_id

    def get_email (self):
        """Auslesen der Mail"""
        return self._email

    def set_google_id(self, google_id):
        """Google Id setzen"""
        self._google_id = google_id

@staticmethod
    def from_tuples (tuples-list()):
        """Umwandeln eines DB tuples in ein Python Objekt (Person())"""
        result = []
        for (person_id, id, creation_date, email, google_id, authorization, name) in tuples:
            person = Person()
            person.set_id (person_id)
            person.set_creation_date (creation_date)
            person.set_email (email)
            person.set_google_id (google_id)
            person.set_authorization (authorization)
            person.set_name (name)
            result.append (person)
        return result

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandeln eines Python dict () """
    person = Person()
    person.set_id(dictionary["id"])
    person.set_creation_date(dictionary["creation_date"])
    person.set_name(dictionary["name"])
    person.set_authorization(dictionary["authorization"])
    return person

if __name__ == "__main__":

    """Person wird testhalber eine Berechtigung zugewiesen"""

    Mensch1 = Person ()
    Mensch1.set_authorization(Person.student)
    Mensch1.set_name ("Dani")
    Mensch1.set_id (1)
    print(Mensch1)

