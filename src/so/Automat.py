from State import State
from datetime import datetime

class Automat ():

    """Unveränderliche oder statische Variablen für die Zustände, die nach dem anlegen eines Automats(Projekts) diesem zugeordnet werden können."""
    """Die statischen Variablen initiert ein Objekt der Klasse State"""

    state_new = State("Neu")
    state_accepted =  State ("Genehmigt")
    state_declined = State ("Abgelehnt")
    state_inReview = State ("In Bewertung")
    state_reviewCompleted = State ("Bewertung abgeschlossen")


    def __init__(self):

        """Beim erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        
        self.current_state = Automat.state_new
        super().__init__()
            self.__id = 0
            self.__creation_date = datetime.datetime.now()
        

    def set_state(self, state):
        self.current_state = state

    def get_state (self):
        return self.current_state

    def is_in_state (self, state):
        """Überprüfung , ob der momentane Zustand mit den übertragenen Attribut übereinstimmt, ja gibt er true aus, sonst False"""
        return state == self.current_state

   

