from bo.nbo.NamedBusinessObject import NamedBusinessObject
from so.Automat import Automat
from so.State import State
from bo.nbo.ProjectType import ProjectType
from datetime import datetime

"""Realisierung der Projektklasse für die Organisation von Projekten"""

class Project(NamedBusinessObject, Automat):

    def __init__(self):
        super().__init__(State.state_new)
        self._capacity = 0
        self._external_partners = ""
        self._short_description = ""
        self._weekly_flag = False
        self._bd_before_lecture_period = 0
        self._bd_in_exam_period = 0
        self._bd_preferred_in_lecture_period = 0
        self._special_room = ""

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
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Projektinstanz"""
        return "Projekt:{}, Name: {}, Anzahl Plätze: {}, Externe Partner: {}, Kurzbeschreibung: {}, " \
                "Wöchentliche: {}, Anzahl der Blocktage vor der Vorlesungszeit: {}, Anzahl der Blocktage in der Prüfungszeit: {}, " \
                " Präferierte Blocktage in der Vorlesungszeit: {}, " \
                "Besonderer Raum erforderlich: {} ".format(self.get_id(), self.get_name(), self._capacity(),
                                                          self._external_partners(), self._short_description(),
                                                          self._weekly_flag(), self._bd_before_lecture_period(),
                                                          self._bd_in_exam_period(), self._bd_preferred_in_lecture_period(), self._special_room())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict () """
        project = Project()
        project.set_id(dictionary["id"])
        project.set_creation_date(dictionary["creation_date"])
        project.set_name(dictionary["name"])
        project.set_capacity(dictionary["capacity"])
        project.set_external_partners(dictionary["external_partners"])
        project.set_short_description(dictionary["short_description"])
        project.set_weekly_flag(dictionary["weekly_flag"])
        project.set_bd_before_lecture_period(dictionary["bd_before_lecture_period"])
        project.set_bd_in_exam_period(dictionary["bd_in_exam_period"])
        project.set_bd_in_lecture_period(dictionary["bd_in_lecture_period"])
        project.set_bd_preferred_in_lecture_period(dictionary["bd_preferred_in_lecture_period"])
        project.set_special_room(dictionary["special_room"])
        return project

    """ p = Project("IT-Project")

    if p.is_in_state(State.state_new):
        print(p, "in New")
    
    p.set_state(State.state_approved)

    if p.is_in_state(State.state_approved):
        print(p, "in Approved") """