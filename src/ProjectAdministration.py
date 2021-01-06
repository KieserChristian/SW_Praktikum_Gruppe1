from bo.Grading import Grading
from bo.Participation import Participation
from bo.nbo.Module import Module
from bo.nbo.Person import Person
from bo.nbo.ProjectType import ProjectType
from bo.nbo.Project import Project
from bo.nbo.Semester import Semester
from bo.nbo.Student import Student
from so.Automat import Automat
from so.State import State
from so.Role import Role

from db.GradingMapper import GradingMapper
from db.ParticipationMapper import ParticipationMapper
from db.ModuleMapper import ModuleMapper
from db.PersonMapper import PersonMapper
from db.ProjectTypeMapper import ProjectTypeMapper
from db.ProjectMapper import ProjectMapper
from db.SemesterMapper import SemesterMapper
from db.StudentMapper import StudentMapper
from db.AutomatMapper import AutomatMapper
from db.StateMapper import StateMapper
from db.RoleMapper import RoleMapper

class ProjectAdministration():

    def __init__(self):
        pass

    """
    Person-Methoden
    """
    def create_person(self, creation_date, name, google_id, email):
        """Eine Person anlegen"""
        person = Person()
        person.set_creation_date(creation_date)
        person.set_name(name)
        person.set_google_id(google_id)
        person.set_email(email)
        person.set_id(1)

        with PersonMapper() as mapper:
            return mapper.insert(person)

    def save_person(self, person):
        """Die Person speichern"""
        with PersonMapper() as mapper:
            mapper.update(person)

    def delete_person(self, person):
        """Person löschen"""
        with PersonMapper() as mapper:
            mapper.delete(person)

    def get_person_by_id(self, id):
        """Die Person mit ihrer gegebenen ID auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_persons(self):
        """Alle Personen ausgeben"""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def get_person_by_name(self, name):
        """Die Person mit ihrem Namen auslesen"""
        with PersonMapper() as mapper:
            return mapper.find_by_name(name)
    
    def get_person_by_google_id (self, google_id):
        """Die Person mit ihrer Google-ID ausgeben"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(google_id)

    def get_persons_by_role_id(self, role):
        """Alle Personen mit einer bestimmten Rolle ausgeben"""
        with PersonMapper() as mapper:
            return mapper.find_by_id(role.get_id())

    """
    Student-Methoden
    """

    def create_student(self, creation_date, name, google_id, email, matriculation_number, course_abbreviation):
        """Einen Studenten anlegen"""
        student = Student()
        student.set_creation_date(creation_date)
        student.set_name(name)
        student.set_google_id(google_id)
        student.set_email(email)
        student.set_matriculation_number(matriculation_number)
        student.set_course_abbreviation(course_abbreviation)
        student.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)
    
    def save_student(self, student):
        """Einen Studenten speichern"""
        with StudentMapper() as mapper:
            mapper.update(student)
    
    def delete_student(self, student):
        """Den gewählten Studenten löschen"""
        """Und die zugehörigen Teilnahmen löschen"""
        with StudentMapper() as mapper:
            participations = self.get_participations_of_student(student)

            if not (participations is None):
                for p in participations:
                    self.delete_participation(p)

            mapper.delete(student)
    
    def get_student_by_id(self, id):
        """Den Studenten mit seiner gegebenen ID auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_students(self):
        """Alle Studenten ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def get_student_by_name(self, name):
        """Den Student mit seinem Namen auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)

    def get_student_by_matriculation_number(self, matriculation_number):
        """Den Student mit seiner Matrikelnummer auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_number(matriculation_number)
    
    def get_student_by_course_abbreviation(self, course_abbreviation):
        """Den Student mit seinem Studiengangskürzel auslesen"""
        with StudentMapper() as mapper:
            return mapper.find_by_course(course_abbreviation)

    """
    Semester-Methoden
    """

    def create_semester(self, id:int, name:str):
        """Ein Semester anlegen"""
        semester = Semester()
        semester.set_name(name)
        semester.set_id(1)

        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def save_semester(self, semester):
        """Ein Semester speichern"""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """Ein Semester löschen"""
        with SemesterMapper() as mapper:
            mapper.delete(semester)

    def get_semester_by_id(self, id):
        """Ein Semester mit seiner gegebenen ID auslesen"""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_semesters(self):
        """Alle Semester ausgeben"""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def get_semester_by_name(self, name):
        """Alle Semester mit ihren Namen ausgeben"""
        with SemesterMapper() as mapper:
            return mapper.find_by_name(name)

    def add_project_to_semester(self, project, semester):
        """Ein Projekt einem Semester hinzufügen"""
        with SemesterMapper() as mapper:
            mapper.add_project_to_semester(project, semester)

    def remove_project_from_semester(self, project, semester):
        """Ein Projekt von einem Semester entfernen"""
        with SemesterMapper() as mapper:
            mapper.remove_project_from_semester(project, semester)

    """
    Role-Methoden
    """

    def create_role_for_person(self, static_attribute:str, person):
        """Eine Rolle anlegen"""
        with RoleMapper() as mapper:
            if person is not None:
                role = Role()
                role.set_static_attribute(static_attribute)
                role.set_role(person.get_id())
                role.id(1)
                return mapper.insert(role)
            else:
                return None
    
    def save_role(self, role):
        """Eine Rolle speichern"""
        with RoleMapper() as mapper:
            mapper.update(role)

    def delete_role(self, role):
        """Eine Rolle löschen"""
        with RoleMapper() as mapper:
            mapper.delete(role)
    
    def get_role_by_id(self, id):
        """Eine Rolle anhand ihrer ID auslesen"""
        with RoleMapper() as mapper:
            return mapper.find_by_id(id)
        
    def get_all_roles(self):
        """Alle Rollen ausgeben"""
        with RoleMapper() as mapper:
            return mapper.find_all()

    """
    Automat-Methoden
    """

    def create_automat(self, state):
        """Einen Automaten anlegen"""
        automat = Automat()
        automat.set_automat(state.get_current_state())
        automat.set_id(1)

        with AutomatMapper() as mapper:
            return mapper.insert(automat)
   
    def save_automat(self, automat):
        """Einen Automaten speichern"""
        with AutomatMapper() as mapper:
            mapper.update(automat)

    def delete_automat(self, automat):
        """Einen Automaten löschen"""
        with AutomatMapper() as mapper:
            mapper.delete(automat)
    
    def get_automat_by_id(self, id):
        """Einen Automaten anhand seiner ID auslesen"""
        with AutomatMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_automats(self):
        """Alle Automaten ausgeben"""
        with AutomatMapper() as mapper:
            return mapper.find_all()
    
    """
    Participation-Methoden
    """

    def create_participation(self, participation):
        """Eine Teilnahme anlegen"""

        participation = Participation()
        #participation.set_name(name)

        with ParticipationMapper() as mapper:
            return mapper.insert(participation)
    
    def save_participation(self, participation):
        """Eine Teilnahme speichern"""
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        """Eine Teilnahme löschen"""
        """Und die zugehörige Bewertung löschen"""
        with ParticipationMapper() as mapper:
            gradings = self.get_grading_of_participation(participation)
            
            if not (gradings is None):
                for g in gradings:
                    self.delete(g)

            mapper.delete(participation)

    def get_participation_by_id(self, id):
        """Eine Teilnahme anhand ihrer ID auslesen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_participations(self):
        """Alle Teilnahmen ausgeben"""
        with ParticipationMapper() as mapper:
            return mapper.find_all()
    
    def get_participations_of_student(self, student):
        """Alle Teilnahmen des Studenten auslesen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(student.get_id())
    
    def get_participations_by_project_id(self, project):
        """Die Teilnehmerliste eines bestimmten Projekts ausgeben"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(project.get_id())

    def add_student_to_participation(self, student, participation):
        """Ein Student einer Teilnahme hinzufügen"""
        with ParticipationMapper() as mapper:
            mapper.add_student_to_participation(student, participation)
    
    def remove_student_from_participation(self, student, participation):
        """Ein Student von einer Teilnahme entfernen"""
        with ParticipationMapper() as mapper:
            mapper.remove_student_from_participation(student, participation)
    
    def add_grading_to_participation(self, grading, participation):
        """Eine Bewertung einer Teilnahme hinzufügen"""
        with ParticipationMapper() as mapper:
            mapper.add_grading_to_participation(grading, participation)

    def remove_grading_from_participation(self, grading, participation):
        """Eine Bewertung von einer Teilnahme entfernen"""
        with ParticipationMapper() as mapper:
            mapper.remove_grading_from_participation(grading, participation)

    """
    Grading-Methoden
    """

    def create_grading_for_participation(self, participation):
        """Eine Bewertung anlegen"""

        grading = Grading()
        grading.set_id(participation.get_id)
        grading.set_id(1)

        with GradingMapper() as mapper:
            return mapper.insert(grading)
    
    def create_grading(self, grade):
        grading = Grading()
        grading.set_grade(grade)

        with GradingMapper() as mapper:
            mapper.insert(grading)
    
    def save_grading(self, grading):
        """Eine Bewertung speichern"""
        with GradingMapper() as mapper:
            mapper.update(grading)

    def delete_grading(self, grading):
        """Eine Bewertung löschen"""
        with GradingMapper() as mapper:
            mapper.delete(grading)
    
    def get_grading_by_id(self, id):
        """Eine Bewertung anhand ihrer ID auslesen"""
        with GradingMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_gradings(self):
        """Alle Bewertungen ausgeben"""
        with GradingMapper() as mapper:
            return mapper.find_all()
    
    def get_grading_by_participation_id(self, participation):
        """Die Bewertung von einer Teilnahme auslesen"""
        with GradingMapper() as mapper:
            return mapper.find_by_id(participation.get_id())

    """
    Project-Methoden
    """

    def create_project(self, name:str, external_partners:str, capacity:int, short_description:str, special_room:str):
        """Ein Projekt anlegen"""

        project = Project()
        project.set_name(name)
        project.set_id(1)
        project.set_external_partners(external_partners)
        project.set_capacity(capacity)
        project.set_weekly_flag(False)
        project.set_bd_preferred_in_lecture_period(0)
        project.set_bd_in_lecture_period(0)
        project.set_bd_in_exam_period(0)
        project.set_bd_before_lecture_period(0)
        project.set_short_description(short_description)
        project.set_special_room(special_room)

        with ProjectMapper() as mapper:
            return mapper.insert(project)
    
    def save_project(self, project):
        """Ein Projekt speichern"""
        with ProjectMapper() as mapper:
            mapper.update(project)
    
    def delete_project(self, project):
        """Ein Projekt löschen"""
        with ProjectMapper() as mapper:
            mapper.delete(project)
    
    def get_project_by_id(self, id):
        """Ein Projekt anhand seiner ID auslesen"""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_projects(self):
        """Alle Projekte ausgeben"""
        with ProjectMapper() as mapper:
            return mapper.find_all()
    
    def get_project_by_name(self, name):
        """Ein Projekt anhand seines Namens auslesen"""
        with ProjectMapper() as mapper:
            return mapper.find_by_name(name)
    
    def get_projects_of_person(self, person):
        """Alle Projekte der gegebenen Person auslesen"""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(person.get_id())
    
    def get_projects_of_student(self, student):
        """Alle Projekte des gegebenen Student auslesen"""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(student.get_id())
    
    def get_projects_by_state_id(self):
        """Alle Projekte, die sich in einem bestimmten Zustand befinden, ausgeben"""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(state.get_id())
    
    def add_person_to_project(self, person, project):
        """Eine Person einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
            mapper.add_person_to_project(person, project)
    
    def remove_person_from_project(self, person, project):
        """Eine Person von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
            mapper.remove_person_from_project(person, project)
    
    def add_participation_to_project(self, participation, project):
        """Eine Teilnahme einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
            mapper.add_participation_to_project(participation, project)
    
    def add_participation_list_to_project(self, participation, project):
        """Eine Teilnehmerliste einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
            mapper.add_participation_list_to_project(participation, project)
    
    def remove_participation_from_project(self, participation, project):
        """Eine Teilnahme von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
            mapper.remove_participation_from_project(participation, project)

    def remove_participation_list_from_project(self, participation, project):
        """Eine Teilnehmerliste von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
            mapper.remove_participation_list_from_project(participation, project)
    
    def add_semester_to_project(self, semester, project):
        """Ein Semester einem Projekt hinzufügen"""
        with ProjectMapper() as mapper:
            mapper.add_semester_to_project(semester, project)
    
    def remove_semester_from_project(self, semester, project):
        """Ein Semester von einem Projekt entfernen"""
        with ProjectMapper() as mapper:
            mapper.remove_semester_from_project(semester, project)
    
    def approve_project(self, project):
        """Ein Projekt genehmigen"""
        with ProjectMapper() as mapper:
            mapper.approve_project(project)    
    
    def reject_project(self, project):
        """Ein Project ablehnen"""
        with ProjectMapper() as mapper:
            mapper.reject_project(project)
    
    """
    ProjectType-Methoden
    """

    def create_project_type(self, name:str, number_ects:int, number_sws:int):
        """Einen Projekttyp anlegen"""

        project_type = ProjectType()
        project_type.set_name(name)
        project_type.set_number_ects(number_ects)
        project_type.set_number_sws(number_sws)
        project_type.set_id(1)

        with ProjectTypeMapper() as mapper:
            return mapper.insert(project_type)
    
    def save_project_type(self, project_type):
        """Einen Projekttyp speichern"""
        with ProjectTypeMapper() as mapper:
            mapper.update(project_type)
    
    def delete_project_type(self, project_type):
        """Einen Projekttyp löschen"""
        with ProjectTypeMapper() as mapper:
            mapper.delete(project_type)
    
    def get_project_type_by_id(self,id):
        """Einen Projekttyp anhand seiner ID auslesen"""
        with ProjectTypeMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_project_types(self):
        """Alle Projekttypen ausgeben"""
        with ProjectTypeMapper() as mapper:
            return mapper.find_all()
    
    def get_project_type_by_name(self, name):
        """Einen Projekttyp anhand seines Namen auslesen"""
        with ProjectTypeMapper() as mapper:
            return mapper.find_by_name(name)
    
    """
    State-Methoden
    """

    def create_state(self, state_name:str):
        """Einen Status anlegen"""

        state = State()
        state.set_state_name(state_name)
        state.set_id(1)

        with StateMapper() as mapper:
            return mapper.insert(state)
    
    def save_state(self, state):
        """Einen Status speichern"""
        with StateMapper() as mapper:
            mapper.update(state)
    
    def delete_state(self, state):
        """Einen Status löschen"""
        with StateMapper() as mapper:
            mapper.delete(state)

    def get_state_by_id(self, id):
        """Einen Status anhand seiner ID auslesen"""
        with StateMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_states(self):
        """Alle Status ausgeben"""
        with StateMapper() as mapper:
            return mapper.find_all()
    
    """
    Module-Methoden
    """

    def create_module(self, name:str, edv_number:str):
        """Ein Modul anlegen"""

        module = Module()
        module.set_name(name)
        module.set_id(edv_number)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)
    
    def save_module(self, module):
        """Ein Modul speichern"""
        with ModuleMapper() as mapper:
            mapper.update(module)

    def delete_module(self, module):
        """Ein Modul löschen"""
        with ModuleMapper() as mapper:
            mapper.delete(module)
    
    def get_module_by_id(self, id):
        """Ein Modul anhand seiner ID auslesen"""
        with ModuleMapper() as mapper:
            return mapper.find_by_id(id)
    
    def get_all_modules(self):
        """Alle Module ausgeben"""
        with ModuleMapper() as mapper:
            return mapper.find_all()
    
    def get_module_by_name(self, name):
        """Ein Modul anhand seines Namen auslesen"""
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)
    
    def get_module_by_edv_number(self, edv_number):
        """Ein Modul anhand seiner EDV-Nummer ausgeben"""
        with ModuleMapper() as mapper:
            return mapper.find_by_number(edv_number)
    
    def add_project_to_module(self, project, module):
        """Ein Projekt einem Modul hinzufügen"""
        with ModuleMapper() as mapper:
            mapper.add_project_to_module(project, module)
            
    def remove_project_from_module(self, project, module):
        """Ein Projekt von einem Modul entfernen"""
        with ModuleMapper() as mapper:
            mapper.remove_project_from_module(project, module)