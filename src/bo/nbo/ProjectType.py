from NamedBusinessObjects import NamedBusinessObject

class ProjectType(NamedBusinessObject):

    def __init__(self):
        super.__init__(self)
        self.__number_ects = 0
        self.__number_sws = 0
        self.__name = name


    def get_number_ects(self):
        """ects anzahl auslesen"""
        return self.__number_ects

    def set_number_ects(self, value):
        """ects anzahl setzen"""
        self.__number_ects = value

    def get_number_sws(self):
        """semester wochenstunden auslesen"""
        return self.__number_sws

    def set_number_sws(self, value):
        """semester wochenstunden setzen"""
        self.__number_sws = value
   

@staticmethod
def from_dict(dictionary=dict()):
    """Umwandeln eines Python dict () """
    projecttype = ProjectType()
    projecttype.set__id(dictionary["id"])
    projecttype.set__creation_date(dictionary["creation_date"])
    projecttype.set_number_ects(dictionary["number_ects"])
    projecttype.set_number_sws(dictionary["number_sws"])
    return projecttype