from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields

from ProjectAdministration import ProjectAdministration
#restliche bo imports fehlen

"""Flask instanzieren"""
app = Flask(__name__)

"""Flask-Erweiterung für Cross-Origin Resource Sharing"""
CORS(app, resources=r'/project/*')

#App name festlegen
api = Api(app, version='1.0', title='ProjectTool API',
    description= 'Ein Projektverwaltungsmodul für Hochschulen')

#Namespace festlegen
"""Namespace"""
ProjectTool = api.namespace('project', description= 'Funktionen der Projektverwaltung')

"""
BusinessObject bo als Basisklasse, auf der die anderen Klassen aufbauen.
Es wird definiert, wie sie beim Marshelling definiert werden.
"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id',
                        description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='_creation_date',
                                    description='Erstellungszeitpunkt des BusinessObjects')
})

nbo = api.model('NamedBusinessObject', {
    'name': fields.String(attribute='_name',
                        description='Name des NBO')
})     

"""Participation, Grading, Module, Project, ProjectType, Semester, Person & Student sind BusinessObjects"""

participation = api.inherit('Participation', bo, {
    'participation_id': fields.Integer(attribute='_participation_id',
                                        description='Teilnahme-ID')
})

grading = api.inherit('Grading', bo, {
    'grading_id': fields.Integer(attribute='_grading_id',
                                description='Bewertungs-ID')

})

module = api.inherit('Module', bo, nbo, {
    'module_id': fields.Integer(attribute='_module_id',
                                description='Modul-ID'),
    'edv_number': fields.Integer(attribute='_edv_number',
                                description='EDV-Nummer des Moduls')   ,
})

project = api.inherit('Project', bo, nbo, {
    'project_id': fields.Integer(attribute='_project_id',
                                description='Projekt-ID'),
    'external_partner': fields.String(attribute='_external_partner',
                                description='Welche externen Partner notwendig sind'),
    'capacity': fields.String(attribute='_capacity',
                                description='Kapazität des Projekts'),                               
    'weekly_flag': fields.Boolean(attribute='_weekly_flag',
                                description='Flag, ob eine Vorlesung wöchentlich stattfindet'),
    'bd_preferred_in_lecture_periode': fields.Integer(attribute='_bd_preferred_in_lecture_periode',
                                description='Bevorzugte Blocktage in der Vorlesungszeit'),
    'bd_in_lecture_periode_saturday': fields.Integer(attribute='_bd_in_lecture_periode_saturday',
                                description='Blocktage in der Vorlesungszeit am Samstag'),
    'bd_in_exam_periode': fields.Integer(attribute='_bd_in_exam_periode',
                                description='Blocktage während der Prüfungszeit'),
    'bd_before_lecture_periode': fields.Integer(attribute='_bd_before_lecture_periode',
                                description='Blocktage vor der Vorlesungszeit'), 
    'short_description': fields.String(attribute='_short_description',
                                description='Kurzbeschreibung des Projekts'),
    'special_room': fields.String(attribute='_special_room',
                                description='Bevorzugte oder spezielle Räume für das Projekt')
})

project_type = api.inherit('ProjectType', bo, nbo, {
    'project_type_id': fields.Integer(attribute='_project_type_id',
                                description='Projekttyp-ID'),
    'number_ects': fields.Integer(attribute='_number_ects',
                                description='Anzahl der ECTS des Projekts'),
    'number_sws': fields.Integer(attribute='_number_sws',
                                description='Anzahl der SWS des Projekts'),
})

semester = api.inherit('Semester', bo, nbo, {
    'semester_id': fields.Integer(attribute='_semester_id',
                                description='Semester-ID'),
})

person = api.inherit('Person', bo, nbo, {
    'person_id': fields.Integer(attribute='_person_id',
                                description='Person-ID'),
I                                description='Google-ID der Person'),
})

student = api.inherit('student', bo, nbo, {
    'student_id': fields.Integer(attribute='_student_id',
                                description='Studenten-ID'),
    'matriculation_number': fields.Integer(attribute='_matriculation_number',
                                description='Matrikulationsnummer des Studenten'),
    'course_abbreviation': fields.String(attribute='_course_abbreviation',
                                description='Studiengangskürzel des Studenten'),
})

@projectTool.route('/person')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('project_id', 'Dies ist die ID von Person')
class PersonOperations(Resource):
    @projectTool.marshal_with(person)
    @secured
    def get(self, person_id):
        """Auslesen eines bestimmten Personen-Objekts, welches durch die person_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        return pers
        
    @secured
    def delete(self, person_id):
        """Löschen eines bestimmten Personen-Objekts, welches durch die person_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return 'gelöscht', 200

    @projectTool.marshal_with(person)
    @projectTool.expect(person, validate=True)
    @secured
    def put(self, person_id):
        """Update eines bestimmten Personen-Objekts."""
        adm = ProjectAdministration()
        pers = person.from_dict(api.payload)

        if pers is not None:
            pers.set_id(person_id)
            adm.save_person(pers)
            return '', 200
        else:
            return '', 500

@projectTool.route('/person')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @projectTool.marshal_list_with(person)
    @secured
    def get(self):
        """Auslesen aller Personen-Objekte"""
        adm = ProjectAdministration()
        person_list = adm.get_all_persons()
        return person_list

    @projectTool.marshal_with(person, code=200)
    @projectTool.expect(person) 
    """Hier wird ein Personen-Objekt von Client-Seite erwartet"""
    @secured
    def post(self):
        """Anlegen eines neuen Personen-Objekts"""
        adm = ProjectAdministration()
        proposal = Person.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden Name und person_id des Proposals für die Erzeugung eines Personen-Objektes."""
            pers = adm.create_person(proposal.get_name(), proposal.get_person_id())

            return pers, 200
        
        else:
                return '', 500
    
@projectTool.route('/student')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('student_id', 'Dies ist die ID von Student')
class StudentOperations(Resource):
    @projectTool.marshal_with(student)
    @secured
    def get(self, student_id):
        """Auslesen eines bestimmten Student-Objektes, welches durch die student_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        stud = adm.get_student_by_id(student_id)
        return stud
        
    @secured
    def delete(self, student_id):
        """Löschen eines bestimmten Student-Objektes, welches durch die student_id in dem URI bestimmt wird."""

        adm = ProjectAdministration()
        stud = adm.get_student_by_id(student_id)
        adm.delete_student(stud)
        return 'gelöscht', 200

    @projectTool.marshal_with(student)
    @projectTool.expect(student, validate=True)
    @secured
    def put(self, student_id):

        adm = ProjectAdministration()
        stud = Student.from_dict(api.payload)

        if stud is not None:
            stud.set_id(student_id)
            adm.save_student(stud)
            return '', 200
        else:
            return '', 500

@projectTool.route('/student')
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
    """Hier wird ein Student-Objekt von Client-Seite erwartet"""
    @secured
    def post(self):
        """Anlegen eines neuen Student-Objekts"""
        adm = ProjectAdministration()
        proposal = Student.from_dict(api.payload)

        if proposal is not None:
            """Wir verwenden student_id und matriculation_number des Proposals für die Erzeugung eines Studenten-Objektes."""
            stud = adm.create_student(proposal.get_student_id(), proposal.get_matriculation_number())

            return stud, 200
        
        else:
                return '', 500 

@projectTool.route('/student-by-matriculation-number')
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



@projectTool.route('/student-by-name')    
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

@projectTool.route('/state')
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

@projectTool.route('/semester')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('semester', 'Dies ist die ID von Semester')
class SemesterOperations(Resource):
    @projectTool.marshal_with(semester)
    @secured
    def get(self, semester_id):
        """Auslesen eines bestimmten Semester-Objektes, welches durch die semester_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(semester_id)
        return sem

    @secured
    def delete(self, semester_id):
        """Löschen eines bestimmten Semester-Objektes, welches durch die semester_id in dem URI bestimmt wird."""
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(semester_id)
        if sem is not None:
            adm.delete_semester(sem)
            return 'gelöscht', 200
        else:
            return '', 500
    
    @projectTool.marshal_with(semester)
    @projectTool.expect(semeser, validate=True)
    @secured
    def put(self, semester_id):
        """Update eines bestimmten Semester-Objektes."""
        adm = ProjectAdministration()
        sem = Semester.from_dict(api.payload)

        if sem is not None:
            sem.set_id(semester_id)
            adm.save_semester(sem)
            return '', 200
        else:
            return '', 500

@projectTool.route('/role')
@projectTool.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectTool.param('role', 'Dies ist die ID von Role')
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
    def put(self, role_id)
    """Update eines bestimmten Role-Objekts."""
    adm = ProjectAdministration()
    rol = Role.from_dict(api.payload)

    if rol is not None:
        rol.set_id(role_id)
        adm.save_role(rol)
        return '', 200
    else:
        return '', 500


if __name__ == '__main__':
    app.run(debug=True)