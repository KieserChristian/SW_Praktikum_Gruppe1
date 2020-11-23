class ProjectAdministration():

    def __init__(self):
        pass

    """
    Person-Methoden
    """
    def create_person(self):
        """Eine Person anlegen"""
        person = Person()

        with PersonMapr() as mapper:
            return mapper.insert(person)

    def save_person(self, person):
        """Die Person speichern"""
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self):
        """Person löschen"""
        with PersonMapper() as mapper:
            mapper.delete(person)

    def get_person_by_id(self):
        """Die Person mit ihrer gegebenen ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_persons(self):
        """Alle Personen ausgeben"""
        with PersonMapper() as mapper:

    def get_person_by_name(self):
        """Die Person mit ihrem Namen auslesen"""
        with PersonMapper() as mapper:
    
    def add_role_to_person(self):
        """Der Person eine Rolle zuteilen"""
        with PersonMapper() as mapper:
    
    def remove_role_from_person(self):
        """Die Rollenzuteilung einer Person entfernen"""
        with PersonMapper() as mapper:
    
    """
    Student-Methoden
    """

    def create_student(self):
        """Einen Studenten anlegen"""
        student = Student()

        with StudentMapper() as mapper:
    
    def save_student(self):
        """Einen Studenten speichern"""
        with StudentMapper() as mapper:
    
    def delete_student(self):
        """Den gewählten Studenten löschen"""
        with StudentMapper() as mapper:
    
    def get_student_by_id(self):
        """Den Studenten mit seiner gegebenen ID auslesen"""
        with StudentMapper() as mapper:
    
    def get_all_students(self):
        """Alle Studenten ausgeben"""
        with StudentMapper() as mapper:

    def get_student_by_name(self):
        """Den Student mit seinem Namen auslesen"""
        with StudentMapper() as mapper:

    def get_student_by_matriculation_number(self):
        """Den Student mit seiner Matrikelnummer auslesen"""
        with StudentMapper() as mapper:
    
    def get_student_by_course_abbreviation(self):
        """Den Student mit seinem Studiengangskürzel auslesen"""
        with StudentMapper() as mapper:
    
    """
    Semester-Methoden
    """

    def create_semester(self):
        """Ein Semester anlegen"""
        semester = Semester()

        with SemesterMapper() as mapper:

    def save_semester(self):
        """Ein Semester speichern"""
        with SemesterMapper() as mapper:

    def delete_semester(self):
        """Ein Semester löschen"""
        with SemesterMapper() as mapper:

    def get_semester_by_id(self):
        """Ein Semester mit seiner gegebenen ID auslesen"""
        with SemesterMapper() as mapper:

    def get_all_semesters(self):
        """Alle Semester ausgeben"""
        with SemesterMapper() as mapper:

    def get_semester_by_name(self):
        """Alle Semester mit ihren Namen ausgeben"""
        with SemesterMapper() as mapper:

    def add_project_to_semester(self):
        """Ein Projekt einem Semester hinzufügen"""
        with SemesterMapper() as mapper:

    def remove_project_from_semester(self):
        """Ein Projekt von einem Semester entfernen"""
        with SemesterMapper() as mapper:
    
    """
    Role-Methoden
    """

    def create_role(self):
        """Eine Rolle anlegen"""
        role = Role()

        with RoleMapper() as mapper:
    
    def save_role(self)
        """Eine Rolle speichern"""
        with RoleMapper() as mapper:

    def delete_role(self):
        """Eine Rolle löschen"""
        with RoleMapper() as mapper:
    
    def get_role_by_id(self):
        """Eine Rolle anhand ihrer ID auslesen"""
        with RoleMapper() as mapper:
        
    def get_all_roles(self):
        """Alle Rollen ausgeben"""
        with RoleMapper() as mapper:

    """
    Automat-Methoden
    """

    def create_automat(self):
        """Einen Automaten anlegen"""
        automat = Automat()

        with AutomatMapper() as mapper:
    
    def save_automat(self):
        """Einen Automaten speichern"""
        with AutomatMapper() as mapper:

    def delete_automat(self):
        """Einen Automaten löschen"""
        with AutomatMapper() as mapper:
    
    def get_automat_by_id(self):
        """Einen Automaten anhand seiner ID auslesen"""
        with AutomatMapper() as mapper:
    
    def get_all_automats(self):
        """Alle Automaten ausgeben"""
        with AutomatMapper() as mapper:
    
    """
    Participation-Methoden
    """

    def create_participation(self):
        """Eine Teilnahme anlegen"""

        participation = Participation()

        with ParticipationMapper() as mapper:
    
    def save_participation(self):
        """Eine Teilnahme speichern"""
        with ParticipationMapper() as mapper:

    def delete_participation(self):
        """Eine Teilnahme löschen"""
        with ParticipationMapper() as mapper:

    def get_participation_by_id(self):
        """Eine Teilnahme anhand ihrer ID auslesen"""
        with ParticipationMapper() as mapper:
    
    def get_all_participations(self):
        """Alle Teilnahmen ausgeben"""
        with ParticipationMapper() as mapper:
    
    def add_student_to_participation(self):
        """Ein Student einer Teilnahme hinzufügen"""
        with ParticipationMapper() as mapper:
    
    def remove_student_from_participation(self):
        """Ein Student von einer Teilnahme entfernen"""
        with ParticipationMapper() as mapper:
    
    def add_grading_to_participation(self):
        """Eine Bewertung einer Teilnahme hinzufügen"""
        with ParticipationMapper() as mapper:

    def remove_grading_from_participation(self):
        """Eine Bewertung von einer Teilnahme entfernen"""
        with ParticipationMapper() as mapper:
    
    """
    Grading-Methoden
    """

    def create_grading(self):
        """Eine Bewertung anlegen"""

        grading = Grading()

        with GradingMapper() as mapper:
    
    def save_grading(self):
        """Eine Bewertung speichern"""
        with GradingMapper() as mapper:

    def delete_grading(self):
        """Eine Bewertung löschen"""
        with GradingMapper() as mapper:
    
    def get_grading_by_id(self):
        """Eine Bewertung anhand ihrer ID auslesen"""
        with GradingMapper() as mapper:

    def get_all_gradings(self):
        """Alle Bewertungen ausgeben"""
        with GradingMapper() as mapper:

    """
    Project-Methoden
    """

    def create_project(self):
        """Ein Projekt anlegen"""

        project = Project()

        with ProjectMapper() as mapper:
    
    def save_project(self):
        """Ein Projekt speichern"""
        with ProjectMapper() as mapper:
    
    def delete_project(self):
        """Ein Projekt löschen"""
        with ProjectMapper() as mapper:
    
    def get_project_by_id(self):
        """Ein Projekt anhand seiner ID auslesen"""
        with ProjectMapper() as mapper:
    
    def get_all_projects(self):
        """Alle Projekte ausgeben"""
        with ProjectMapper() as mapper:
    
    def get_project_by_name(self):
        """Ein Projekt anhand seines Namens auslesen"""
        with ProjectMapper() as mapper:
    
    def add_person_to_project(self):
        """Eine Person einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
    
    def remove_person_from_project(self):
        """Eine Person von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
    
    def add_participation_to_project(self):
        """Eine Teilnahme einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
    
    def remove_participation_from_project(self):
        """Eine Teilnahme von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
    
    def add_semester_to_project(self):
        """Ein Semester einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:    
    
    def remove_semester_from_project(self):
        """Ein Semester von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
    
    def add_module_to_project(self):
        """Ein Modul einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
    
    def remove_module_from_project(self):
        """Ein Modul von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
    
    def add_projecttype_to_project(self):
        """Ein Projekttyp einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
    
    def remove_projecttype_from_project(self):
        """Ein Projekttyp von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
    
    """
    ProjectType-Methoden
    """

    def create_projecttype(self):
        """Einen Projekttyp anlegen"""

        projecttype = Projecttype()

        with ProjectTypeMapper() as mapper:
    
    def save_projecttype(self):
        """Einen Projekttyp speichern"""
        with ProjectTypeMapper() as mapper:
    
    def delete_projecttype(self):
        """Einen Projekttyp löschen"""
        with ProjectTypeMapper() as mapper:
    
    def get_projecttype_by_id(self):
        """Einen Projekttyp anhand seiner ID auslesen"""
        with ProjectTypeMapper() as mapper:
    
    def get_all_projecttypes(self):
        """Alle Projekttypen ausgeben"""
        with ProjectTypeMapper() as mapper:
    
    def get_projecttype_by_name(self):
        """Einen Projekttyp anhand seines Namen auslesen"""
        with ProjectTypeMapper() as mapper:
    
    """
    State-Methoden
    """

    def create_state(self):
        """Einen Status anlegen"""

        state = State()

        with StateTypeMapper() as mapper:
    
    def save_state(self):
        """Einen Status speichern"""
        with StateTypeMapper() as mapper:
    
    def delete_state(self):
        """Einen Status löschen"""
        with StateTypeMapper() as mapper:

    def get_state_by_id(self):
        """Einen Status anhand seiner ID auslesen"""
        with StateTypeMapper() as mapper:
    
    def get_all_states(self):
        """Alle Status ausgeben"""
        with StateTypeMapper() as mapper:
    
    """
    Module-Methoden
    """

    def create_module(self):
        """Ein Modul anlegen"""

        module = Module()

        with ModuleMapper() as mapper:
    
    def save_module(self):
        """Ein Modul speichern"""
        with ModuleMapper() as mapper:

     def delete_module(self):
         """Ein Modul löschen"""
        with ModuleMapper() as mapper:
    
     def get_module_by_id(self):
         """Ein Modul anhand seiner ID auslesen"""
        with ModuleMapper() as mapper:
    
     def get_all_modules(self):
         """Alle Module ausgeben"""
        with ModuleMapper() as mapper:
    
     def get_module_by_name(self):
         """Ein Modul anhand seines Namen auslesen"""
        with ModuleMapper() as mapper:
    
     def get_module_by_edv_number(self):
         """Ein Modul anhand seiner EDV-Nummer ausgeben"""
        with ModuleMapper() as mapper:
    
     def add_project_to_module(self):
         """Ein Projekt einem Modul hinzufügen"""
        with ModuleMapper() as mapper:
    
     def remove_project_from_module(self):
         """Ein Projekt von einem Modul entfernen"""
        with ModuleMapper() as mapper: