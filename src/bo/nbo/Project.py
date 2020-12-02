from NamedBusinessObjects import NamedBusinessObjects
from Automat import Argument
from ProjectType import ProjectType
from datetime import datetime

class Project(NamedBusinessObjects, Automat):

    transdisziplinaer = ProjectType("Transdiziplinäres Projekt", l0, 20) 
    interdisziplinaer = ProjectType( "Interdisziplinäres Projekt", 5, 10)
    fachspezifisch = ProjectType("Fachspezifisches Projekt", 3, 5)

    def __init__(self):
        super().__init__()
         self.__name = ""
         self.__capacity = 0
         self.__external_partners = ""
         self.__short_description = ""
         self.__weekly_flag = False
         self.__bd_before_lecture_period = 0
         self.__bd_in_exam_period = 0
         self.__bd_preferred_in_lecture_period = 0
         self.__special_room = ""
         self.__id = 0
         self.__creation_date =datetime.datetime.now()

    def get_name(self):
        """Name auslesen"""
        return self.__name

    def get_capacity(self):
        """Kapazität auslesen"""
        return self.__capacity

    def get_external_partners(self):
        """externe Partner auslesen"""
        return self.__external_partners

    def get_short_description(self):
        """Kurzbeschreibung auslesen"""
        return self.__short_description

    def get_weekly_flag(self):
        """wöchentliches Flag auslesen"""
        return self.__weekly_flag

    def get_bd_before_lecture_period(self):
        """Blocktage vor Vorlesungszeit auslesen"""
        return self.__bd_before_lecture_period

    def get_bd_in_exam_period(self):
        """Blocktage in Prüfungszeit auslesen"""
        return self.__bd_in_exam_period

    def get_bd_in_lecture_period(self):
        """Blocktage in Vorlesungszeit auslesen"""
        return self.__bd_in_lecture_period

    def get_bd_preferred_in_lecture_period(self):
        """präferierte Blocktage in Vorlesungszeit auslesen"""
        return self.__bd_preferred_in_lecture_period

    def get_special_room(self):
        """Spezieller Raum auslesen"""
        return self.__special_room

    def set_name(self, name):
        """Name setzen"""
        self.__name = name

    def set_capacity(self, capacity):
        """Kapazität setzen"""
        self.__capacity = capacity

    def set_external_partners(self, external_partners):
        """Externe Partner setzen"""
        self.__external_partners = external_partners

    def set_short_descripton(self, short_descripton):
        """Kurzbeschreibung setzen"""
        self.__short_descripton = short_descripton

    def set_weekly_flag(self, weekly_flag):
        """wöchentliches Flag setzen"""
        self.__weekly_flag = weekly_flag

    def set_bd_before_lecture_period(self, bd_before_lecture_period):
        """Blocktage vor Vorlesungszeit setzen"""
        self.__bd_before_lecture_period = bd_before_lecture_period
    
    def set_bd_in_exam_period(self, bd_in_exam_period):
        """Blocktage in Prüfungszeit setzen"""
        self.__bd_in_exam_period = bd_in_exam_period  

    def set_bd_in_lecture_period(self, bd_in_lecture_period):
        """Blocktage in Vorlesungszeit setzen"""
        self.__bd_in_lecture_period = bd_in_lecture_period  

    def set_bd_preferred_in_lecture_period(self, bd_preferred_in_lecture_period):
        """präferierte Blocktage in Vorlesungszeit setzen"""
        self.__bd_preferred_in_lecture_period = bd_preferred_in_lecture_period  

    def set_special_room(self, special_room):
        """Spezieller Raum setzen"""
        self.__special_room = special_room

    def get_id (self):
        """Auslesen der ID"""
        return self.__id

    def get_creation_date(self):
        """Auslesen des Erstelldatums"""
        return self.__creation_date

    def set_id (self, value):
        """ID setzen"""
        self.__id = value 

    def set_creation_date (self, creation_date):
        """Erstellungsdatum setzen"""
        self.__creation_date = creation_date

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