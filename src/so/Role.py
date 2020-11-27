class Role():

    def __init__(self, __name):

        """Basisklasse, für die Zuweisung der Berechtigungen der Personen"""
        self.__name = __name

        def set_name (self, name):
            """Setzen eines Rollenname"""
            self.__name = name 

        def get_name (self):
            """Auslesen des Rollennamen"""
            return self.__name

        def __str__ (self):
            return self.__name