from ProjectState import ProjectState


class Automat:

    """Unveränderliche oder statische Variablen für die Zustände, die nach dem anlegen eines Automats(Projekts) diesem zugeordnet werden können."""
    """Die statischen Variablen initiert ein Objekt der Klasse ProjectState"""

    ps_new = ProjectState("Neu")
    ps_accepted =  ProjectState ("genehmigt")
    ps_declined = ProjectState ("Abgelehnt")
    ps_inReview = ProjectState ("In Bewertung")
    ps_reviewCompleted = ProjectState ("Bewertung abgeschlossen")


    def __init__(self):

        """Beim erzeugen des Objekts (Projekt) wird der Zustand automatisch auf neu gesetzt"""
        
        self.current_state = Automat.s_new

    def set_state(self, zustand):
        self.current_state = zustand

    def get_state (self):
        return self.current_state

    def is_in_state (self, zustand):
        """Überprüfung , ob dre momentane Zustand mit den übertragenen Attribut übereinstimmt, ja gibt er true aus, sonst False"""
        return zustand == self.current_state



