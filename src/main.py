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
api = Api(app, version='1.0', title='ProjectApp API',
    description= 'Ein Projektverwaltungsmodul für Hochschulen')

#Namespace festlegen
"""Namespace"""
ProjectApp = api.namespace('project', description= 'Funktionen der Projektverwaltung')

"""
BusinessObject bo als Basisklasse, auf der die anderen Klassen aufbauen.
Es wird definiert, wie sie beim Marshelling definiert werden.
"""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id',
                        description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='creation_date',
                                    description='Erstellungszeitpunkt des BusinessObjects')
})

nbo = api.model('NamedBusinessObject', {
    'name': fields.String(attribute='name',
                        description='Name des NBO')
})     

"""Participation, Grading, Module, Project, ProjectType, Semester, Person & Student sind BusinessObjects"""

participation = api.inherit('Participation', bo, {
    'participation_id': fields.Integer(attribute='participation_id',
                                        description='Teilnahme-ID')
})

grading = api.inherit('Grading', bo, {
    'grading_id': fields.Integer(attribute='grading_id',
                                description='Bewertungs-ID')

})

module = api.inherit('Module', bo, nbo, {
    'module_id': fields.Integer(attribute='module_id',
                                description='Modul-ID'),
    'edv_number': fields.Integer(attribute='edv_number',
                                description='EDV-Nummer des Moduls')   ,
})

project = api.inherit('Project', bo, nbo, {
    'project_id': fields.Integer(attribute='project_id',
                                description='Projekt-ID'),
    'external_partner': fields.String(attribute='external_partner',
                                description='Welche externen Partner notwendig sind'),
    'capacity': fields.String(attribute='capacity',
                                description='Kapazität des Projekts'),                               
    'weekly_flag': fields.Boolean(attribute='weekly_flag',
                                description='Flag, ob eine Vorlesung wöchentlich stattfindet'),
    'bd_preferred_in_lecture_periode': fields.Integer(attribute='bd_preferred_in_lecture_periode',
                                description='Bevorzugte Blocktage in der Vorlesungszeit'),
    'bd_in_lecture_periode_saturday': fields.Integer(attribute='bd_in_lecture_periode_saturday',
                                description='Blocktage in der Vorlesungszeit am Samstag'),
    'bd_in_exam_periode': fields.Integer(attribute='bd_in_exam_periode',
                                description='Blocktage während der Prüfungszeit'),
    'bd_before_lecture_periode': fields.Integer(attribute='bd_before_lecture_periode',
                                description='Blocktage vor der Vorlesungszeit'), 
    'short_description': fields.String(attribute='short_description',
                                description='Kurzbeschreibung des Projekts'),
    'special_room': fields.String(attribute='special_room',
                                description='Bevorzugte oder spezielle Räume für das Projekt')
})

project_type = api.inherit('ProjectType', bo, nbo, {
    'project_type_id': fields.Integer(attribute='project_type_id',
                                description='Projekttyp-ID'),
    'number_ects': fields.Integer(attribute='number_ects',
                                description='Anzahl der ECTS des Projekts'),
    'number_sws': fields.Integer(attribute='number_sws',
                                description='Anzahl der SWS des Projekts'),
})

semester = api.inherit('Semester', bo, nbo, {
    'semester_id': fields.Integer(attribute='semester_id',
                                description='Semester-ID'),
})

person = api.inherit('Person', bo, nbo, {
    'person_id': fields.Integer(attribute='person_id',
                                description='Person-ID'),
I                                description='Google-ID der Person'),
})

student = api.inherit('student', bo, nbo, {
    'student_id': fields.Integer(attribute='student_id',
                                description='Studenten-ID'),
    'matriculation_number': fields.Integer(attribute='matriculation_number',
                                description='Matrikulationsnummer des Studenten'),
    'course_abbreviation': fields.String(attribute='course_abbreviation',
                                description='Studiengangskürzel des Studenten'),
})

@projectApp.route('/participation')
@projectApp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')