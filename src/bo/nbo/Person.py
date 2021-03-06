from datetime import datetime
from bo.nbo.NamedBusinessObject import NamedBusinessObject

"""Realisierung der Personenklasse für die beteiligten Akteure im Projektverwaltungstool"""

class Person(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._google_id = ""
        self._role_id = None #Fremdschlüsselbeziehung zu einer Rolle

    def set_google_id(self, google_id):
        """Externe Google ID setzen"""
        self._google_id = google_id
    
    def get_google_id(self):
        """Externe Google ID auslesen"""
        return self._google_id

    def set_role_id(self, role_id):
        """Mailadresse setzen"""
        self._role_id = role_id

    def get_role_id(self):
        """Mailadresse auslesen"""
        return self._role_id

    def to_dict(self):
        """Umwandeln von Person() in ein Python dictionary dict()"""
        result = {
            "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "name": self.get_name(),
            "google_id": self.get_google_id(),
            "role_id": self.get_role_id()
        }
        return result
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Personeninstanz"""
        return "Person: {}, Google-ID: {}, Creation-Date: {}, Rolle: {}".format(self.get_id(), self.get_name(), self.get_google_id(), self.get_creation_date(), self.get_role_id())

    @staticmethod
    def from_tuples (tuples=list()):
        """Umwandeln eines DB tuples in ein Python Objekt (Person())"""
        result = []
        for (id, creation_date, name, google_id,role_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_creation_date(creation_date)
            person.set_name(name)
            person.set_google_id(google_id)
            person.set_role_id(role_id)
            result.append(person)
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        person = Person()
        person.set_id(dictionary["id"])
        person.set_creation_date(dictionary["creation_date"])
        person.set_name(dictionary["name"])
        person.set_google_id(dictionary["google_id"])
        person.set_role_id(dictionary["role_id"])
        return person