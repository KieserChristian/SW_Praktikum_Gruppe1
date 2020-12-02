from State import State
from datetime import datetime

class Automat:

    """Unveränderliche oder statische Variablen für die Zustände, die nach dem anlegen eines Automats(Projekts) diesem zugeordnet werden können."""
    """Die statischen Variablen initiert ein Objekt der Klasse ProjectState"""

    state_new = ProjectState("Neu")
    state_accepted =  ProjectState ("genehmigt")
    state_declined = ProjectState ("Abgelehnt")
    state_inReview = ProjectState ("In Bewertung")
    state_reviewCompleted = ProjectState ("Bewertung abgeschlossen")


    def __init__(self):

        """Beim erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        
        self.current_state = Automat.s_new
        super().__init__()
            self.__id = 0
            self.__creation_date = datetime.datetime.now()
        

    def set_state(self, zustand):
        self.current_state = zustand

    def get_state (self):
        return self.current_state

    def is_in_state (self, zustand):
        """Überprüfung , ob der momentane Zustand mit den übertragenen Attribut übereinstimmt, ja gibt er true aus, sonst False"""
        return zustand == self.current_state

   

