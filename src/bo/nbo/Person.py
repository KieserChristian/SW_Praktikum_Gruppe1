from datetime import datetime
from bo.nbo.NamedBusinessObject import NamedBusinessObject

"""Realisierung der Personenklasse für die beteiligten Akteure im Projektverwaltungstool"""

class Person(NamedBusinessObject):

    def __init__(self):
        super().__init__()
        self._google_id = ""
        self._email = ""

    def set_google_id(self, google_id):
        """Externe Google ID setzen"""
        self._google_id = google_id
    
    def get_google_id(self):
        """Externe Google ID auslesen"""
        return self._google_id

    def set_email(self, email):
        """Mailadresse setzen"""
        self._email = email

    def get_email(self):
        """Mailadresse auslesen"""
        return self._email

    def to_dict(self):
        """Umwandeln von Person() in ein Python dictionary dict()"""
        result = {
            "id": self.get_id(),
            "creation_date": self.get_creation_date(),
            "name": self.get_name(),
            "google_id": self.get_google_id(),
            "email": self.get_email()
        }
        return result
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Personeninstanz"""
        return "Person: {} {}, Google-ID: {}, E-Mail: {}".format(self.get_id(), self.get_name(), self.get_google_id(), self.get_email())

    @staticmethod
    def from_tuples (tuples=list()):
        """Umwandeln eines DB tuples in ein Python Objekt (Person())"""
        result = []
        for (id, creation_date, name, google_id, email) in tuples:
            person = Person()
            person.set_id (id)
            person.set_creation_date (creation_date)
            person.set_name (name)
            person.set_google_id (google_id)
            person.set_email (email)
            result.append (person)
        return result

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        person = Person()
        person.set_id(dictionary["id"])
        person.set_creation_date(dictionary["creation_date"])
        person.set_name(dictionary["name"])
        person.set_google_id(dictionary["google_id"])
        person.set_email(dictionary["email"])
        return person