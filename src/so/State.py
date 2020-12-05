from Automat import Automat
from datetime import datetime

class State(Automat):
    def __init__():
        self.state_name = ""
        super().__init__()
        self.__name = ""
        self.__id = 0
        self.__creation_date = datetime.datetime.now()
        

   
    def get_state_name(self):

        """State auslesen"""
        return state_name        

    def set_state_name(self, name):
        
        self._state_name = ""

   def __str__(self, name):
        return self.state_name


if __name__== "__main__":

    a = Automat(Automat.state_new)

    if a.is_in_state(Automat.state_new):
        print ("Zustand des Projekts: Neu")

    a.set_state(Automat.state_approved)

    if a.is_in_state(Automat.state_approved):
        print ("Zustand des Projekts: Genehmigt")

    a.set_state(Automat.state_declined)

    if a.is_in_state(Automat.state_declined):
        print ("Zustand des Projekts: Abgelehnt")

    a.set_state(Automat.state_inReview)

    if a.is_in_state(Automat.state_inReview):
        print ("Zustand des Projekts: In Bewertung")

    a.set_state(Automat.state_reviewCompleted)

    if a.is_in_state(Automat.state_reviewCompleted):
        print ("Zustand des Projekts: Bewertung abgeschlossen")

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