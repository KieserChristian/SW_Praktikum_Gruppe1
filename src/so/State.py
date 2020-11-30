


from Automat import Automat


class State(Automat):
    def __init__(self):
        self.state_name = ""

   
    def get_state_name(self):

        """State auslesen"""
        return state_name        

    def set_state_name(self, state_name):
        
        self._state_name

   def __str__(self):
       return self.state_name


if __name__== "__main__":

    a = Automat(Automat.s_new)

    if a.is_in_state(Automat.s_new):
        print ("Zustand des Projekts: Neu")

    a.set_state(Automat.s_approved)

    if a.is_in_state(Automat.s_approved):
        print ("Zustand des Projekts: Genehmigt")

    a.set_state(Automat.s_declined)

    if a.is_in_state(Automat.s_declined):
        print ("Zustand des Projekts: Abgelehnt")

    a.set_state(Automat.s_inReview)

    if a.is_in_state(Automat.s_inReview):
        print ("Zustand des Projekts: In Bewertung")

    a.set_state(Automat.s_reviewCompleted)

    if a.is_in_state(Automat.s_reviewCompleted):
        print ("Zustand des Projekts: Bewertung abgeschlossen")
