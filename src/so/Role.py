from datetime import datetime
 
"""Realisierung der Rollenklasse für die Berechtigungen von Personen"""

class Role():

    student = "Student"
    dozent = "Dozent"
    admin = "Admin"

    def __init__(self):
        self._id = 0
        self._creation_date = datetime.now()
        self._static_attribute = ""

    def set_static_attribute(self, static_attribute):
        """Setzen eines statischen Attributs"""
        self._static_attribute = static_attribute

    def get_static_attribute(self, static_attribute):
        """Auslesen eines statischen Attributs"""
        return self._static_attribute
    
    def set_id(self, value):
        """ID setzen"""
        self._id = value

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_creation_date(self, creation_date):
        """Erstellungsdatum setzen"""
        self._creation_date = creation_date
    
    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self._creation_date
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Rolleninstanz"""
        return "Rolle: {} {} ".format(self.get_id(), self.get_static_attribute())

    @staticmethod
    def from_dict(dictionary=dict()):
         """Umwandeln eines Python dict () """
         role = Role()
         role.set_id(dictionary["id"])
         role.set_creation_date(dictionary["creation_date"])
         role.set_static_attribute(dictionary["static_attribute"])
         return role 