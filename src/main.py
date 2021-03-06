from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields

from ProjectAdministration import ProjectAdministration
from bo.Participation import Participation
from bo.Grading import Grading
from bo.nbo.Module import Module
from bo.nbo.Project import Project
from bo.nbo.ProjectType import ProjectType
from bo.nbo.Semester import Semester
from bo.nbo.Person import Person
from bo.nbo.Student import Student
from so.State import State
from so.Role import Role
from SecurityDecorator import secured

"""Flask instanzieren"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/project/*', supports_credentials=True)

api = Api(app, version='1.0', title='Promato', description= 'Ein Projektmanagementtool für Hochschulen')

"""Namespace"""
projectTool = api.namespace('project', description= 'Funktionen der Projektverwaltung')

"""
BusinessObject bo als Basisklasse, auf der die anderen Klassen aufbauen.
Es wird definiert, wie sie beim Marshelling definiert werden.
"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id',
                                description='Unique Identifier eines Business Objects'),
    'creation_date': fields.DateTime(attribute='_creation_date',
                                description='Erstellungszeitpunkt eines BusinessObjects')
})

nbo = api.model('NamedBusinessObject', { 
    'name': fields.String(attribute='_name',
                                description='Name eines BusinessObjects bzw. NamedBusinessObjects')
})  

automat = api.model('Automat', {
    'current_state': fields.String(attribute='_current_state',
                                description='Aktueller Zustand')
})

"""Participation, Grading, Module, Project, ProjectType, Semester, Person & Student sind BusinessObjects"""

participation = api.inherit('Participation', bo, {
    "student_id": fields.Integer(attribute='_student_id'),
    'project_id': fields.Integer(attribute='_project_id')
})

grading = api.inherit('Grading', bo, {
    'grade': fields.Float(attribute='_grade', 
                                description='Note zur Bewertung einer Projektteilnahme'),
    'participation_id': fields.Integer(attribute='participation_id')
})

module = api.inherit('Module', bo, nbo, {
    'edv_number': fields.String(attribute='_edv_number',
                                description='EDV-Nummer eines Moduls')
})

project = api.inherit('Project', bo, nbo, automat, {
    'capacity': fields.Integer(attribute='_capacity',
                                description='Kapazität eines Projekts (maximale Teilnehmeranzahl)'),  
    'external_partners': fields.String(attribute='_external_partners',
                                description='Externe Partner, die am Projekt beteiligt sind'),  
    'short_description': fields.String(attribute='_short_description',
                                description='Kurzbeschreibung des Projekts'),                           
    'weekly_flag': fields.Boolean(attribute='_weekly_flag',
                                description='Flag, ob eine Vorlesung wöchentlich stattfindet'),
    'bd_before_lecture_period': fields.String(attribute='_bd_before_lecture_periode',
                                description='Blocktage vor der Vorlesungszeit'), 
    'bd_in_lecture_period': fields.String(attribute='_bd_in_lecture_periode_saturday',
                                description='Blocktage in der Vorlesungszeit (samstags)'),
    'bd_in_exam_period': fields.String(attribute='_bd_in_exam_periode',
                                description='Blocktage während der Prüfungszeit'),
    'bd_preferred_in_lecture_period': fields.String(attribute='_bd_preferred_in_lecture_periode',
                                description='Bevorzugte Blocktage in der Vorlesungszeit'),
    'special_room': fields.String(attribute='_special_room',
                                description='Bevorzugte oder spezielle Räume für das Projekt'),
    'project_type_id': fields.Integer(attribute='_project_type_id',
                                description='Projekttyp des Projekts'),
    'module_id': fields.Integer(attribute='_module_id',
                                description='Modul des Projekts'),
    'person_id': fields.Integer(attribute='_person_id',
                                description='Person des Projekts'),
    'semester_id': fields.Integer(attribute='_semester_id',
                                description='Semester des Projekts')
})

project_type = api.inherit('ProjectType', bo, nbo, {
    'number_ects': fields.Integer(attribute='_number_ects',
                                description='Anzahl der ECTS des Projekts'),
    'number_sws': fields.Integer(attribute='_number_sws',
                                description='Anzahl der SWS des Projekts')
})

semester = api.inherit('Semester', bo, nbo)

person = api.inherit('Person', bo, nbo, {
    'google_id': fields.String(attribute='_google_id',
                                description='Externe Google-ID der Person'),
    'role_id': fields.Integer(attribute='_role_id',
                                description='Rolle der Person')
})

student = api.inherit('Student', bo, nbo, person, {
    'matriculation_number': fields.String(attribute='_matriculation_number',
                                description='Immatrikulationsnummer des Studenten'),
    'course_abbreviation': fields.String(attribute='_course_abbreviation',
                                description='Studiengangkürzel des Studenten')
})

state = api.model('State', {
    'id': fields.Integer(attribute='_id',
                                description='Unique Identifier eines BusinessObjects'),
    'creation_date': fields.DateTime(attribute='_creation_date',
                                description='Erstellungszeitpunkt eines BusinessObjects'),
    'state_name': fields.String(attribute='_state_name',
                                description='Name des Zustands')
})

role = api.model('Role', {
    'id': fields.Integer(attribute='_id',
                                description='Unique Identifier eines BusinessObjects'),
    'creation_date': fields.DateTime(attribute='_creation_date',
                                description='Erstellungszeitpunkt eines BusinessObjects'),
    'static_attribute': fields.String(attribute='_static_attribute',
                                description='Statisches Attribut')
})

@projectTool.route('/person')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonOperations(Resource):
    @projectTool.marshal_with(person)
    @projectTool.expect(person, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Personen-Objekts."""
        adm = ProjectAdministration()
        pers = Person.from_dict(api.payload)
        print(pers)

        if pers is not None:
            adm.save_person(pers)
            return pers, 200
        else:
            return '', 500

@projectTool.route('/person/<int:person_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('person_id', 'Dies ist die ID von Person')
class PersonOperations(Resource):
    @projectTool.marshal_with(person)
    @secured
    def get(self, person_id):
        """Auslesen eines bestimmten Personen-Objekts, welches durch die person_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        pers = adm.get_person_by_id(person_id)
        return pers

    @projectTool.marshal_with(person)   
    @secured
    def delete(self, person_id):
        """Löschen eines bestimmten Personen-Objekts, welches durch die person_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        pers = adm.get_person_by_id(person_id)

        if pers is not None:
            adm.delete_person(pers)
            return 'gelöscht', 200
        else:
            return 'There was some error', 500

@projectTool.route('/person-by-name/<string:name>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('name', 'Dies ist der Name von Person')
class PersonByNameOperations(Resource):
    @projectTool.marshal_with(person)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Personen-Objekts, welches durch den Namen bestimmt wird."""

        adm = ProjectAdministration()
        pers = adm.get_person_by_name(name)
        return pers

@projectTool.route('/person-by-google-id/<string:google_id>')    
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('google_id', 'Die Google-Mail der Person')
class PersonByGoogleMailOperations(Resource):
    @projectTool.marshal_with(person)
    #darf nicht @secured haben..
    def get(self, google_id):
        """Auslesen eines Student-Objekts, das durch die Google-Mail bestimmt wird.
        Das auszulesende Objekt wird durch 'google_id' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_google_id(google_id)
        return pers

@projectTool.route('/person-by-role/<int:role_id>')    
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('role_id', 'Die Role ID der Person')
class PersonByRoleIdOperations(Resource):
    @projectTool.marshal_with(person)
    @secured
    def get(self, role_id):
        """Auslesen eines Student-Objekts, das durch die Google-Mail bestimmt wird.
        Das auszulesende Objekt wird durch 'google_id' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_role_id(role_id)
        return pers

@projectTool.route('/persons')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @projectTool.marshal_list_with(person)
    #@secured
    def get(self):
        """Auslesen aller Personen-Objekte"""
        adm = ProjectAdministration()
        person_list = adm.get_all_persons()
        return person_list

    @projectTool.marshal_with(person, code=200)
    @projectTool.expect(person) 
    @secured
        #Hier wird ein Personen-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Personen-Objekts"""
        adm = ProjectAdministration()
        proposal = Person.from_dict(api.payload)

        if proposal is not None:
            pers = adm.create_person(proposal.get_creation_date(), proposal.get_name(), proposal.get_google_id(), proposal.get_role_id())
            return pers, 200
        else:
            return '', 500
    
@projectTool.route('/student/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('student_id', 'Dies ist die ID von Student')
class StudentOperations(Resource):
    @projectTool.marshal_with(student)
    @secured
    def get(self, student_id):
        """Auslesen eines bestimmten Student-Objekts, welches durch die student_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        stud = adm.get_student_by_id(student_id)
        return stud
        
    @secured
    def delete(self, student_id):
        """Löschen eines bestimmten Student-Objekts, welches durch die student_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        stud = adm.get_student_by_id(student_id)
        if stud is not None:
            adm.delete_student(stud)
            return 'gelöscht', 200
        else:
            return 'There was no student object with this id', 500


@projectTool.route('/student/<int:student_id>/projects')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('student_id', 'Dies ist die ID von Student')
class StudentRelatedProjectOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, student_id):
        """Auslesen aller Project-Objekte eines bestimmten Student-Objekts, welches durch die ID von Student bestimmt wird."""

        adm = ProjectAdministration()
        stud = adm.get_student_by_id(student_id)
        
        if stud is not None:
            project_list = adm.get_projects_of_student(stud)
            return project_list
        else:
            return "Student not found", 500

@projectTool.route('/students')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListOperations(Resource):
    @projectTool.marshal_list_with(student)
    @secured
    def get(self):
        """Auslesen aller Student-Objekte"""
        adm = ProjectAdministration()
        student_list = adm.get_all_students()
        return student_list

    @projectTool.marshal_with(student, code=200)
    @projectTool.expect(student) 
    @secured
        #Hier wird ein Student-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Student-Objekts"""
        adm = ProjectAdministration()
        proposal = Student.from_dict(api.payload)
        print(proposal)
        if proposal is not None:
            stud = adm.create_student(proposal.get_creation_date(), proposal.get_name(), proposal.get_google_id(), proposal.get_role_id(), proposal.get_matriculation_number(), proposal.get_course_abbreviation())
            return stud, 200       
        else:
            return '', 500 

    @projectTool.marshal_with(student)
    @projectTool.expect(student, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Student-Objekts"""

        adm = ProjectAdministration()
        stud = Student.from_dict(api.payload)

        if stud is not None:
            adm.save_student(stud)
            return stud, 200
        else:
            return '', 500

@projectTool.route('/student-by-matriculation-number/<string:matriculation_number>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('matriculation_number', 'Die Matrikelnummer des Studenten')
class StudentByMatriculationNumberOperations(Resource):
    @projectTool.marshal_with(student)
    @secured
    def get(self, matriculation_number):
        """Auslesen von Student-Objekten, die durch die Matrikelnummer bestimmt werden.
        Die auszulesenden Objekte werden durch 'matriculation_number' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stud = adm.get_student_by_matriculation_number(matriculation_number)
        return stud

@projectTool.route('/student-by-name/<string:name>')    
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('name', 'Der Name des Studenten')
class StudentByNameOperations(Resource):
    @projectTool.marshal_with(student)
    @secured
    def get(self, name):
        """Auslesen von Student-Objekten, die durch den Namen bestimmt werden.
        Die auszulesenden Objekte werden durch 'name' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stud = adm.get_student_by_name(name)
        return stud

@projectTool.route('/student-by-google-id/<string:google_id>')    
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('google_id', 'Die Google-Mail des Studenten')
class StudentByGoogleMailOperations(Resource):
    @projectTool.marshal_with(student)
    @secured
    def get(self, google_id):
        """Auslesen eines Student-Objekts, das durch die Google-Mail bestimmt wird.
        Das auszulesende Objekt wird durch 'google_id' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stud = adm.get_student_by_google_id(google_id)
        return stud

@projectTool.route('/students_by_project/<int:project_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @secured
    def get(self, project_id):
        """Auslesen aller Studneten eines bestimmten Projekts"""
        adm = ProjectAdministration()
        students_by_project = adm.get_students_by_project(project_id)
        
        if students_by_project != []:
            return students_by_project, 200
        else:
            return 'There are no Students for that Project', 500

@projectTool.route('/state/<int:state_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('state_id', 'Dies ist die ID von State')
class StateOperations(Resource):
    @projectTool.marshal_with(state)
    @secured
    def get(self, state_id):
        """Auslesen eines bestimmten State-Objektes, welches durch die state_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        stat = adm.get_state_by_id(state_id)
        return stat
    
    @secured
    def delete(self, state_id):
        """Löschen eines bestimmten State-Objekts, welches durch die state_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        stat = adm.get_state_by_id(state_id)
        if stat is not None:
            adm.delete_state(stat)
            return 'gelöscht', 200
        else:
            return 'There was some error', 500

@projectTool.route('/state/project')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('state_id', 'Dies ist die ID von Project')
class StateRelatedProjectOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, state_id):
        """Auslesen aller Project-Objekte bezüglich eines bestimmten State-Objekts"""
        adm = ProjectAdministration()
        """Zunächst wird die ID des State benötigt"""
        stat = adm.get_state_by_id(state_id)

        if stat is not None:
            project_list = adm.get_projects_by_state_id(state.get_id())
            return project_list
        else:
            return 'State not found', 500

@projectTool.route('/semester')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterOperations(Resource):
    @projectTool.marshal_with(semester, code=200)
    @projectTool.expect(semester) 
    @secured
        #Hier wird ein Semester-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Semester-Objekts"""
        adm = ProjectAdministration()
        proposal = Semester.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden Semester_id und Grade des Proposals für die Erzeugung eines Semester-Objektes."""
            sem = adm.create_semester(proposal.get_id(), proposal.get_name())
            return sem, 200
        else:
            return '', 500


    @projectTool.marshal_with(semester)
    @projectTool.expect(semester, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Semester-Objektes."""
        adm = ProjectAdministration()
        sem = Semester.from_dict(api.payload)

        if sem is not None:
            adm.save_semester(sem)
            return sem, 200
        else:
            return '', 500

@projectTool.route('/semester/<int:semester_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('semester_id', 'Dies ist die ID des Semesters')
class SemesterOperations(Resource):
    @projectTool.marshal_with(semester)
    @secured
    def get(self, semester_id):
        """Auslesen eines bestimmten Semester-Objektes, welches durch die semester_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(semester_id)

        if sem is not None:
            return sem, 200
        else:
            return 'Semester nicht vorhanden', 500

    @projectTool.marshal_list_with(semester)
    @secured
    def delete(self, semester_id):
        """Löschen eines bestimmten Semester-Objektes, welches durch die semester_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(semester_id)
        
        if sem is not None:
            adm.delete_semester(sem)
            return 'gelöscht', 200
        else:
            return 'There was some error', 500

@projectTool.route('/semester/project')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('semester_id', 'Dies ist die ID von Semester')
class SemesterRelatedProjectOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, semester_id):
        """Auslesen aller Project-Objekte bezüglich eines bestimmten Semester-Objekts"""
        adm = ProjectAdministration()
        """Zunächst wird die ID des Semesters benötigt"""
        sem = adm.get_semester_by_id(semester_id)

        if sem is not None:
            project_list = adm.get_projects_by_semester_id(semester.get_id())
            return project_list
        else:
            return 'Semester not found', 500

@projectTool.route('/role/<int:role_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('role_id', 'Dies ist die ID von Role')
class RoleOperations(Resource):
    @projectTool.marshal_with(role)
    @secured
    def get(self, role_id):
        """Auslesen eines bestimmten Role-Objektes, welches durch die role_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        rol = adm.get_role_by_id(role_id)
        return rol
    
    @projectTool.marshal_with(role)
    @projectTool.expect(role, validate=True)
    @secured
    def put(self, role_id):
        #Update eines bestimmten Role-Objekts.
        adm = ProjectAdministration()
        rol = Role.from_dict(api.payload)

        if rol is not None:
            rol.set_id(role_id)
            adm.save_role(rol)
            return '', 200
        else:
            return '', 500

@projectTool.route('/role')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RoleListOperations(Resource):
    @projectTool.marshal_list_with(role)
    @secured
    def get(self):
        """Auslesen aller Role-Objekte"""
        adm = ProjectAdministration()
        role_list = adm.get_all_roles()
        return role_list
    
    @projectTool.marshal_with(role, code=200)
    @projectTool.expect(role)
    @secured
        #Hier wird ein Role-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Role-Objekts"""
        adm = ProjectAdministration()
        proposal = Role.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden role_id des Proposals für die Erzeugung eines Role-Objektes."""
            rol = adm.create_role_for_person(proposal.get_role_id())
            #muss noch gefixed werden, mehr Übergabeparameter nötig; vergleiche l192 ProjectAdmin
            return rol, 200
        else:
            return '', 500

@projectTool.route('/role_by_person/<int:person_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RoleRelatedPersonOperations(Resource):
    @secured
    def get(self, person_id):
        """Auslesen der Rolle eines bestimmten Personen-Objekts"""
        adm = ProjectAdministration()
        role_by_person = adm.get_role_by_person(person_id)

        if role_by_person != []:
            return role_by_person, 200
        else:
            return 'Role not found', 500

@projectTool.route('/grading/<int:grading_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('grading_id', 'Dies ist die ID von Grading')
class GradingOperations(Resource):
    @projectTool.marshal_list_with(grading)
    #@projectTool.param('grading_id', 'Dies ist die ID von unserem Grading Objekt')
    @secured
    def get(self, grading_id):
        """Auslesen eines bestimmten Grading-Objektes, welches durch die grading_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        grad = adm.get_grading_by_id(grading_id)
        print(grad)
        return grad
    
    def delete(self, grading_id):
        """Löschen eines bestimmten Grading-Objektes, welches durch die grading_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        grad = adm.get_grading_by_id(grading_id)
     
        if grad is not None:
            adm.delete_grading(grad)
            return 'gelöscht', 200
        else:
            return 'There was some error', 500


@projectTool.route('/grading')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GradingOperations(Resource):
    @projectTool.marshal_with(grading, code=200)
    @projectTool.expect(grading) 
    @secured
        #Hier wird ein Grading-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Grading-Objekts"""
        adm = ProjectAdministration()
        proposal = Grading.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden Grading_id und Grade des Proposals für die Erzeugung eines Grading-Objektes."""
            grad = adm.create_grading(proposal.get_grade(), proposal.get_participation_id())
            return grad, 200
        else:
            return '', 500

    @projectTool.marshal_with(grading)
    @projectTool.expect(grading, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Grading-Objekts."""
        adm = ProjectAdministration()
        grad = Grading.from_dict(api.payload)
        if grad is not None:
            adm.save_grading(grad)
            return grad, 200
        else:
            return '', 500


@projectTool.route('/gradings')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GradingListOperations(Resource):
    @projectTool.marshal_list_with(grading)
    @secured
    def get(self):
        """Auslesen aller Grading-Objekte"""
        adm = ProjectAdministration()
        grading_list = adm.get_all_gradings()
        return grading_list


@projectTool.route('/grading_by_participation/<int:participation_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GradingByParticipationOperations(Resource):
    @secured
    def get(self, participation_id):
        """Auslesen eines Grading-Objektes, welches durch die Participation-ID bestimmt wird.
        Das auszulesende Objekt wird durch 'participation_id' in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        grading_by_participation = adm.get_grading_by_participation_id(participation_id)

        if grading_by_participation != []:
            return grading_by_participation, 200
        else:
            return 'There is no Grading for that Participation', 500


@projectTool.route('/project/<int:project_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('project_id', 'Dies ist die ID von Project')
class ProjectOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, project_id):
        """Auslesen eines bestimmten Project-Objektes, welches durch die project_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        proj = adm.get_project_by_id(project_id)
        return proj
    
    @secured
    def delete(self, project_id):
        """Löschen eines bestimmten Project-Objektes, welches durch die project_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        proj = adm.get_project_by_id(project_id)
        if proj is not None:
            adm.delete_project(proj)
            return 'gelöscht', 200
        else:
            return '', 500


@projectTool.route('/project')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperations(Resource):
    @projectTool.marshal_with(project)
    @projectTool.expect(project)
    #@secured
    def put(self):
        """Update eines bestimmten Project-Objekts."""
        adm = ProjectAdministration()
        proj = Project.from_dict(api.payload)
        print(proj)
        print("****")

        if proj is not None:
            adm.save_project(proj)
            return proj, 200
        else:
            return 'There was an error with that project object', 500

@projectTool.route('/projects')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @projectTool.marshal_list_with(project)
    @secured
    def get(self):
        """Auslesen aller Project-Objekte"""
        adm = ProjectAdministration()
        project_list = adm.get_all_projects()
        return project_list

    @projectTool.marshal_with(project, code=200)
    @projectTool.expect(project) 
    @secured
        #Hier wird ein Personen-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Project-Objekts"""
        adm = ProjectAdministration()
        proj = Project.from_dict(api.payload)

        if proj is not None:
            proj = adm.create_project(proj.get_name(), proj.get_id(), proj.get_external_partners(), proj.get_capacity(), proj.get_weekly_flag(), proj.get_bd_preferred_in_lecture_period(), proj.get_bd_in_lecture_period(), proj.get_bd_in_exam_period(), proj.get_bd_before_lecture_period(), proj.get_short_description(), proj.get_special_room(), proj.get_project_type_id(), proj.get_module_id(), proj.get_person_id(), proj.get_semester_id())
            return proj, 200
        else:
            return '', 500

@projectTool.route('/project-type-of-project/<int:project_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @secured
    def get(self, project_id):
        """Auslesen aller Project-Objekte eines bestimmten project_types"""
        adm = ProjectAdministration()
        project_type_of_project = adm.get_project_type_of_project(project_id)
        
        if project_type_of_project != []:
            return project_type_of_project, 200
        else:
            return 'There is no Project with that Project_type', 500

@projectTool.route('/module_of_project/<int:project_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @secured
    def get(self, project_id):
        """Auslesen aller Project-Objekte eines bestimmten modules"""
        adm = ProjectAdministration()
        module_of_project = adm.get_module_of_project(project_id)
        
        if module_of_project != []:
            return module_of_project, 200
        else:
            return 'There is no Project with that module', 500

@projectTool.route('/projects_by_person/<int:person_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectRelatedPersonOperations(Resource):
    @secured
    def get(self, person_id):
        """Auslesen aller Project-Objekte eines bestimmten Person-Objekts, welches durch die ID von Person bestimmt wird."""

        adm = ProjectAdministration()
        projects_by_person = adm.get_projects_by_person(person_id)
        
        if projects_by_person != []:
            return projects_by_person
        else:
            return "Person not found", 500

@projectTool.route('/projects_by_state/<string:current_state>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, current_state):
        """Auslesen aller Project-Objekte eines bestimmten states"""
        adm = ProjectAdministration()
        projects_by_state = adm.get_projects_by_state(current_state)
        if projects_by_state != []:
            return projects_by_state, 200
        else:
            return 'There is no Project with that state', 500

@projectTool.route('/available_projects_for_student/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('student_id', 'Dies ist die ID von Student')
class ProjectListOperations(Resource):
    @projectTool.marshal_with(project)
    @secured
    def get(self, student_id):
        """Auslesen aller genehmigten Project-Objekte für einen bestimmten Student"""
        adm = ProjectAdministration()
        available_projects_for_student = adm.get_available_projects_for_student(student_id)
        if available_projects_for_student != []:
            return available_projects_for_student, 200
        else:
            return 'There are no projects for that student', 500

@projectTool.route('/registered_projects_of_student/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @secured
    def get(self, student_id):
        """Auslesen aller Projekt-Objekte/Projekte eines bestimmten Students"""
        adm = ProjectAdministration()
        registered_projects_of_student = adm.get_registered_projects_of_student(student_id)
        
        if registered_projects_of_student != []:
            return registered_projects_of_student, 200
        else:
            return 'There is no Participation for that Student', 500

@projectTool.route('/graded_projects_of_student/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @secured
    def get(self, student_id):
        """Auslesen aller Projekt-Objekte/Projekte eines bestimmten Students"""
        adm = ProjectAdministration()
        graded_projects_of_student = adm.get_graded_projects_of_student(student_id)
        
        if graded_projects_of_student != []:
            return graded_projects_of_student, 200
        else:
            return 'There is no graded Project for that Student', 500


@projectTool.route('/project-type/<int:project_type_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('project_type_id', 'Dies ist die ID von ProjectType')
class ProjectTypeOperations(Resource):
    @projectTool.marshal_with(project_type)
    @secured
    def get(self, project_type_id):
        """Auslesen eines bestimmten ProjectType-Objektes, welches durch die project_type_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        projtyp = adm.get_project_type_by_id(project_type_id)
        return projtyp
    
    @secured
    def delete(self, project_type_id):
        """Löschen eines bestimmten ProjectType-Objektes, welches durch die project_type_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        projtyp = adm.get_project_type_by_id(project_type_id)
        if projtyp is not None:
            adm.delete_project_type(projtyp)
            return 'gelöscht', 200
        else:
            return '', 500
    
    @projectTool.marshal_with(project_type)
    @projectTool.expect(project_type, validate=True)
    @secured
    def put(self, project_type_id):
        """Update eines bestimmten ProjectType-Objekts."""
        adm = ProjectAdministration()
        projtyp = ProjectType.from_dict(api.payload)

        if projtyp is not None:
            projtyp.set_id(project_type_id)
            adm.save_project_type(projtyp)
            return projtyp, 200
        else:
            return '', 500

@projectTool.route('/project-types')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @projectTool.marshal_list_with(project_type)
    @secured
    def get(self):
        """Auslesen aller ProjectType-Objekte"""
        adm = ProjectAdministration()
        project_type_list = adm.get_all_project_types()
        return project_type_list

    @projectTool.marshal_with(project_type, code=200)
    @projectTool.expect(project_type) 
    @secured
        #Hier wird ein ProjectType-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen ProjectType-Objekts"""
        adm = ProjectAdministration()
        proposal = ProjectType.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden Name und project_type_id des Proposals für die Erzeugung eines ProjectType-Objektes."""
            projtyp = adm.create_project_type(proposal.get_name(), proposal.get_number_ects(), proposal.get_number_sws())
            return projtyp, 200
        else:
            return '', 500

@projectTool.route('/automat/<int:automat_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('automat_id', 'Dies ist die ID von Automat')
class AutomatOperations(Resource):
    @projectTool.marshal_with(automat)
    @secured
    def get(self, automat_id):
        """Auslesen eines bestimmten Automat-Objektes, welches durch die automat_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        aut = adm.get_automat_by_id(automat_id)
        return aut
        
@projectTool.route('/module/<int:module_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('module_id', 'Dies ist die ID von Module')
class ModuleOperations(Resource):
    @projectTool.marshal_with(module)
    @secured
    def get(self, module_id):
        """Auslesen eines bestimmten Module-Objektes, welches durch die module_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        mod = adm.get_module_by_id(module_id)
        return mod
    
    @secured
    def delete(self, module_id):
        """Löschen eines bestimmten Module-Objektes, welches durch die module_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        mod = adm.get_module_by_id(module_id)
        if mod is not None:
            adm.delete_module(mod)
            return 'gelöscht', 200
        else:
            return 'There was some error', 500
    

@projectTool.route('/modules')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleListOperations(Resource):
    @projectTool.marshal_list_with(module)
    @secured
    def get(self):
        """Auslesen aller Module-Objekte"""
        adm = ProjectAdministration()
        module_list = adm.get_all_modules()
        return module_list

    @projectTool.marshal_with(module, code=200)
    @projectTool.expect(module) 
    @secured
        #Hier wird ein Module-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Module-Objekts"""
        adm = ProjectAdministration()
        proposal = Module.from_dict(api.payload)
        print(proposal)
        if proposal is not None:
            """Wir verwenden module_name und edv_number des Proposals für die Erzeugung eines Module-Objektes."""
            mod = adm.create_module(proposal.get_name(), proposal.get_edv_number())
            return mod, 200       
        else:
            return '', 500 

    @projectTool.marshal_with(module)
    @projectTool.expect(module, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Module-Objekts."""
        adm = ProjectAdministration()
        mod = Module.from_dict(api.payload)

        if mod is not None:
            adm.save_module(mod)
            return mod, 200
        else:
            return '', 500

@projectTool.route('/participation/<int:participation_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('participation_id', 'Dies ist die ID von Participation')
class ParticipationOperations(Resource):
    @projectTool.marshal_list_with(participation)
    @secured
    def get(self, participation_id):
        """Auslesen eines bestimmten Participation-Objektes, welches durch die participation_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        part = adm.get_participation_by_id(participation_id)
        return part
    
    @secured
    def delete(self, participation_id):
        """Löschen eines bestimmten Participation-Objektes, welches durch die participation_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        part = adm.get_participation_by_id(participation_id)
        if part is not None:
            adm.delete_participation(part)
            return 'gelöscht', 200
        else:
            return 'There is no participation object with that id', 500
    
@projectTool.route('/participation')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    @projectTool.marshal_list_with(participation)
    @secured
    def get(self):
        """Auslesen aller Participation-Objekte"""
        adm = ProjectAdministration()
        participation_list = adm.get_all_participations()
        return participation_list

    @projectTool.marshal_with(participation, code=200)
    @projectTool.expect(participation) 
    @secured
        #Hier wird ein Participation-Objekt von Client-Seite erwartet
    def post(self):
        """Anlegen eines neuen Participation-Objekts"""
        adm = ProjectAdministration()
        proposal = Participation.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden die participation_id des Proposals für die Erzeugung eines Participation-Objektes."""
            part = adm.create_participation(proposal)
            return part, 200       
        else:
            return '', 500

    @projectTool.marshal_with(participation)
    @projectTool.expect(participation, validate=True)
    @secured
    def put(self):
        """Update eines bestimmten Participation-Objekts."""
        adm = ProjectAdministration()
        part = Participation.from_dict(api.payload)

        if part is not None:
            adm.save_participation(part)
            print(part) 
            return part, 200
        else:
            return '', 500

@projectTool.route('/participations/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('student_id', 'Dies ist die ID von Student')
class ParticipationOperations(Resource):
    @projectTool.marshal_list_with(participation)
    @secured
    def delete(self, student_id):
        """Löschen eines bestimmten Participation-Objektes, welches durch die student_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        adm.delete_participation_by_student(student_id)
        return 'gelöscht', 200

@projectTool.route('/participation_by_student/<int:student_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    #@secured
    def get(self, student_id):
        """Auslesen eines Participation-Objektes eines bestimmten Students"""
        adm = ProjectAdministration()
        participation_by_student = adm.get_participation_by_student(student_id)
        
        if participation_by_student != []:
            return participation_by_student, 200
        else:
            return 'There is no Participation for that Student', 500

@projectTool.route('/project_of_participation/<int:participation_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    @secured
    def get(self, participation_id):
        """Auslesen aller Participation-Objekte"""
        adm = ProjectAdministration()
        project_of_participation = adm.get_project_of_participation(participation_id)
        
        if project_of_participation != []:
            return project_of_participation, 200
        else:
            return 'There is no Project for that Participation', 500

@projectTool.route('/participations_by_project/<int:project_id>')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('project_id', 'Dies ist die ID von Project')
class ParticipationRelatedProjectOperations(Resource):
    @secured
    def get(self, project_id):
        """Auslesen aller Participation-Objekte bezüglich eines bestimmten Project-Objekts"""
        adm = ProjectAdministration()
        participations_by_project = adm.get_participations_by_project(project_id)

        if participations_by_project != []:
            return participations_by_project, 200
        else:
            return 'There is no Participation for that Project', 500

if __name__ == '__main__':
    app.run(debug=True)