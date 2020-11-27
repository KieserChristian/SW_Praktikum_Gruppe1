


from Automat import Automat


class ProjectState(Automat):
    def __init__(self):
        self.state_name = None

    def __init__(self, ):
        pass

    def get_state_name(self, ):
        pass

    def set_state_name(self, ):
        pass

    def from_dict(self, dictionary):
        pass

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
