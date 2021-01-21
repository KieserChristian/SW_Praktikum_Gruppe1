from bo.nbo.NamedBusinessObject import NamedBusinessObject
from so.Automat import Automat
from so.State import State
from bo.nbo.ProjectType import ProjectType
from datetime import datetime

"""Realisierung der Projektklasse für die Organisation von Projekten"""
"""Projekte sind Automaten, daher erbt die Klasse Project das Attribut current_state sowie die Methoden aus
der Klasse Automat. Für eine nähere Erläuterung siehe Automat.py."""

class Project(NamedBusinessObject, Automat):

    def __init__(self):
        super().__init__()
        self._capacity = 0
        self._external_partners = ""
        self._short_description = ""
        self._weekly_flag = False
        self._bd_before_lecture_period = 0
        self._bd_in_exam_period = 0
        self._bd_in_lecture_period = 0
        self._bd_preferred_in_lecture_period = 0
        self._special_room = ""
        self._project_type_id = None # Fremdschlüsselbeziehung zu einem Projekttyp
        self._module_id = None #Fremdschlüsselbeziehung zu einem Modul
        self._state_id = None #Fremdschlüsselbeziehung zu einem Zustand

    def set_capacity(self, capacity):
        """Kapazität setzen"""
        self._capacity = capacity
    
    def get_capacity(self):
        """Kapazität auslesen"""
        return self._capacity
    
    def set_external_partners(self, external_partners):
        """Externe Partner setzen"""
        self._external_partners = external_partners

    def get_external_partners(self):
        """externe Partner auslesen"""
        return self._external_partners

    def set_short_description(self, short_description):
        """Kurzbeschreibung setzen"""
        self._short_description = short_description

    def get_short_description(self):
        """Kurzbeschreibung auslesen"""
        return self._short_description

    def set_weekly_flag(self, weekly_flag):
        """wöchentliches Flag setzen"""
        self._weekly_flag = weekly_flag

    def get_weekly_flag(self):
        """wöchentliches Flag auslesen"""
        return self._weekly_flag

    def set_bd_before_lecture_period(self, bd_before_lecture_period):
        """Blocktage vor Vorlesungszeit setzen"""
        self._bd_before_lecture_period = bd_before_lecture_period

    def get_bd_before_lecture_period(self):
        """Blocktage vor Vorlesungszeit auslesen"""
        return self._bd_before_lecture_period

    def set_bd_in_exam_period(self, bd_in_exam_period):
        """Blocktage in Prüfungszeit setzen"""
        self._bd_in_exam_period = bd_in_exam_period 

    def get_bd_in_exam_period(self):
        """Blocktage in Prüfungszeit auslesen"""
        return self._bd_in_exam_period

    def set_bd_in_lecture_period(self, bd_in_lecture_period):
        """Blocktage in Vorlesungszeit setzen"""
        self._bd_in_lecture_period = bd_in_lecture_period 

    def get_bd_in_lecture_period(self):
        """Blocktage in Vorlesungszeit auslesen"""
        return self._bd_in_lecture_period

    def set_bd_preferred_in_lecture_period(self, bd_preferred_in_lecture_period):
        """präferierte Blocktage in Vorlesungszeit setzen"""
        self._bd_preferred_in_lecture_period = bd_preferred_in_lecture_period 

    def get_bd_preferred_in_lecture_period(self):
        """präferierte Blocktage in Vorlesungszeit auslesen"""
        return self._bd_preferred_in_lecture_period

    def set_special_room(self, special_room):
        """Spezieller Raum setzen"""
        self._special_room = special_room

    def get_special_room(self):
        """Spezieller Raum auslesen"""
        return self._special_room

    def set_project_type_id(self, project_type):
        """Setzen eines Fremdschlüssels zu einem Projecttyp"""
        self._project_type_id = project_type
    
    def get_project_type_id(self):
        """Auslesen des Fremdschlüssels zum Projekttyp"""
        return self._project_type_id

    def set_module_id(self, module):
        """Setzen eines Fremdschlüssels zu einem Modul"""
        self._module_id = module

    def get_module_id(self):
        """"Auslesen des Fremdschlüssels zum Modul"""
        return self._module_id

    def set_state_id(self, state_id):
        """Setzen eines Fremdschlüssels zu einem State"""
        self._state_id = state
    
    def get_state_id(self):
        """Auslesen des Fremdschlüssels zum State"""
        return self._state_id


    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Projektinstanz"""
        return  "Projekt: {} {}, Momentaner Zustand: {}, Anzahl der Plätze: {}, Externe Partner: {}," \
                "Kurzbeschreibung: {}, Wöchentliche Veranstalung: {}," \
                "Anzahl der Blocktage vor der Vorlesungszeit: {}, Anzahl der Blocktage in der Vorlesungszeit: {}," \
                "Anzahl der Blocktage in der Prüfungszeit: {}, Präferierte Blocktage in der Vorlesungszeit: {}," \
                "Erforderlichkeit eines besonderen Raums: {}, Projekttyp des Projekts: {}, Modul des Projekts: {}, Zustand des Projekts: {}".format(self.get_id(), 
                                                                    self.get_name(),
                                                                    self.get_state(), 
                                                                    self.get_capacity(),
                                                                    self.get_external_partners(),
                                                                    self.get_short_description(),
                                                                    self.get_weekly_flag(),
                                                                    self.get_bd_before_lecture_period(),
                                                                    self.get_bd_in_lecture_period(),
                                                                    self.get_bd_in_exam_period(),
                                                                    self.get_bd_preferred_in_lecture_period(),
                                                                    self.get_special_room(),
                                                                    self.get_project_type_id(),
                                                                    self.get_module_id(),
                                                                    self.get_state_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        project = Project()
        project.set_id(dictionary["id"])
        project.set_creation_date(dictionary["creation_date"])
        project.set_name(dictionary["name"])
        project.set_state(dictionary["current_state"])
        project.set_capacity(dictionary["capacity"])
        project.set_external_partners(dictionary["external_partners"])
        project.set_short_description(dictionary["short_description"])
        project.set_weekly_flag(dictionary["weekly_flag"])
        project.set_bd_before_lecture_period(dictionary["bd_before_lecture_period"])
        project.set_bd_in_exam_period(dictionary["bd_in_exam_period"])
        project.set_bd_in_lecture_period(dictionary["bd_in_lecture_period"])
        project.set_bd_preferred_in_lecture_period(dictionary["bd_preferred_in_lecture_period"])
        project.set_special_room(dictionary["special_room"])
        project.get_project_type_id(dictionary["project_type_id"])
        project.get_module_id(dictionary["module_id"])
        project.get_state_id(dictionary["state_id"])
        return project