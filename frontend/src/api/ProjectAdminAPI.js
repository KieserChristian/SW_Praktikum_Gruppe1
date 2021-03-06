/**Stellt die Verknüpfung von Front und Backend dar. Dabei bezieht sich die Datei auf die Projectadministration
im Backend und soll zur übermittlung der Daten dienen. Die ProjectAdmin.js ruft die im backend (Datei "ProjectAdministration")
auf und befüllt darauf die Datenbank mit den eingegebenen Daten */

import PersonNBO from "./PersonNBO";
import ProjectNBO from "./ProjectNBO";
import ProjectTypeNBO from "./ProjectTypeNBO";
import StudentNBO from "./StudentNBO";
import ModuleNBO from "./ModuleNBO";
import GradingBO from "./GradingBO";
import ParticipationBO from "./ParticipationBO";
import SemesterNBO from "./SemesterNBO";
import RoleNBO from "./RoleNBO";

export default class ProjectAdminAPI {

    static #api = null;

    // Local Backend
    #projectServerBaseURL = 'http://backend.promato.xyz/project';
    //#projectServerBaseURL = 'http://localhost:5000/project';


    // Grading related
    #getAllGradingsURL = () => `${this.#projectServerBaseURL}/gradings`;
    #getGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #getGradingByIdURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingURL = (grading) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingForParticipationURL = () => `${this.#projectServerBaseURL}/gradings`;
    #saveGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #deleteGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #updateGradingURL = (gradingBO) => `${this.#projectServerBaseURL}/gradings`;
    #addGradingURL = () => `${this.#projectServerBaseURL}/grading`;
    #removeGradingFromParticipationURL = (gradingId, participationId) => `${this.#projectServerBaseURL}/gradings`;
    #getGradingByParticipationURL = (participationId) => `${this.#projectServerBaseURL}/grading_by_participation/${participationId}`

    #getModuleByProjectURL = (projectId) => `${this.#projectServerBaseURL}/module-by-project/${projectId}`;
     // Module related
/*     #getAllModulesURL = () => `${this.#projectServerBaseURL}/modules`;
    
    #getModuleByNameURL = (name) => `${this.#projectServerBaseURL}/modules`;
    #getModuleByEdvNumberURL = (edvNumber) => `${this.#projectServerBaseURL}/modules`;
    #createModuleURL = () => `${this.#projectServerBaseURL}/modules`;
    #saveModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #deleteModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #updateModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;  */
    #getModuleByIdURL = (moduleId) => `${this.#projectServerBaseURL}/module/${moduleId}`;
       
    // Participation related
    #getAllParticipationsURL = () => `${this.#projectServerBaseURL}/participations`;
    #getParticipationsByProjectURL = (projectId) => `${this.#projectServerBaseURL}/participations_by_project/${projectId}`
    #addParticipationURL = () => `${this.#projectServerBaseURL}/participation`;
    #deleteParticipationURL = (participationId) => `${this.#projectServerBaseURL}/participation/${participationId}`
    #getParticipationByStudentURL = (studentId) => `${this.#projectServerBaseURL}/participation_by_student/${studentId}`

    // Person related
    #getAllPersonsURL = () => `${this.#projectServerBaseURL}/persons`;
    #deletePersonURL = (personId) => `${this.#projectServerBaseURL}/person/${personId}`;
    #updatePersonURL = (personId) => `${this.#projectServerBaseURL}/person`;
    #getRoleByPersonURL = (personId) => `${this.#projectServerBaseURL}/role_by_person/${personId}`;
    #addPersonURL = () => `${this.#projectServerBaseURL}/persons`;
    #getPersonByGoogleIdURL = (googleId) => `${this.#projectServerBaseURL}/person-by-google-id/${googleId}`;
    #getPersonsByRoleURL = (roleId) => `${this.#projectServerBaseURL}/person-by-role/${roleId}`;
    #getPersonByIdURL = (personId) => `${this.#projectServerBaseURL}/person/${personId}`;
   
   
   
    // Project related
    #getAllProjectsURL = () => `${this.#projectServerBaseURL}/projects`;
    #getProjectsByPersonURL = (personId) => `${this.#projectServerBaseURL}/projects_by_person/${personId}`;
    #getProjectByIdURL = (projectId) => `${this.#projectServerBaseURL}/project/${projectId}`;
    #getProjectsByCurrentState = (currentState) => `${this.#projectServerBaseURL}/projects_by_state/${currentState}`;
    #getRegisteredProjectsOfStudentURL = (studentId) => `${this.#projectServerBaseURL}/registered_projects_of_student/${studentId}`;
    #getAvailableProjectsOfStudentURL = (studentId) => `${this.#projectServerBaseURL}/available_projects_for_student/${studentId}`;
    #addProjectURL = () => `${this.#projectServerBaseURL}/projects`;
    #deleteProjectURL = (projectId) => `${this.#projectServerBaseURL}/project/${projectId}`;
    #updateProjectURL = () => `${this.#projectServerBaseURL}/project`;

    // ProjectType related
    #getProjectTypeByIdURL = (projectTypeId) => `${this.#projectServerBaseURL}/project-type/${projectTypeId}`;
    #getProjectTypeOfProjectURL = (projectId) => `${this.#projectServerBaseURL}/project-type-of-project/${projectId}`;

    // Semester related
    #getSemesterByIdURL = (semesterId) => `${this.#projectServerBaseURL}/semester/${semesterId}`;

    // Student related
    #getStudentByGoogleIdURL = (googleId) => `${this.#projectServerBaseURL}/student-by-google-id/${googleId}`;
    #getAllStudentsURL = () => `${this.#projectServerBaseURL}/students`;
    #addStudentURL = () => `${this.#projectServerBaseURL}/students`;
    #getStudentsByProjectURL = (projectId) => `${this.#projectServerBaseURL}/students_by_project/${projectId}`;
    #deleteStudentURL = (studentId) => `${this.#projectServerBaseURL}/student/${studentId}`;
    #updateStudentURL = (studentId) => `${this.#projectServerBaseURL}/students`;


    static getAPI() {
        if (this.#api == null) {
            this.#api = new ProjectAdminAPI();
        }
        return this.#api;
    }

    // fetchAdv frägt eine URL an und gibt die Antwort direkt als JSON Objekt zurück
    // init wird später für alle requests verwendet, die nicht GET sind:
    // default 'GET' wird überschrieben mit jeweiliger Methode
    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })

    //Person

    addPerson(personNBO) {
      return this.#fetchAdvanced(this.#addPersonURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(personNBO)
      }).then((responseJSON) => {
        let personNBO = PersonNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(personNBO);
        })
      })
    }  

    getAllPersons() {
      return this.#fetchAdvanced(this.#getAllPersonsURL(), {credentials: 'include'})
      .then((responseJSON) => {
        let PersonNBOs = PersonNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(PersonNBOs);
        })
      })
    }

    deletePerson(personId) {
      return this.#fetchAdvanced(this.#deletePersonURL(personId), {
        method: 'DELETE', credentials: 'include'
      }).then((responseJSON) => {
        let responsePerson = PersonNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(responsePerson);
        })
      })
    }


    updatePerson(personNBO) {
      console.log(JSON.stringify(personNBO))
      return this.#fetchAdvanced(this.#updatePersonURL(personNBO),{
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(personNBO) 
      }).then((responseJSON) => {
        let responsePersonNBO = PersonNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responsePersonNBO);
        })
      })
    }

    getRoleByPerson(personId) {
      return this.#fetchAdvanced(this.#getRoleByPersonURL(personId), {credentials: 'include'})
      .then((responseJSON) => {
        let RoleNBOs = RoleNBO.fromJSON(responseJSON)[0];
        console.log(RoleNBOs)
        return new Promise(function (resolve) {
          resolve(RoleNBOs);
        })
      })
    }

    getPersonByGoogleId(googleId) {
      return this.#fetchAdvanced(this.#getPersonByGoogleIdURL(googleId), {credentials: 'include'}).then((responseJSON) => {
        let personNBO = PersonNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve(personNBO)
        })
      })
    }

    getPersonById(personId) {
      return this.#fetchAdvanced(this.#getPersonByIdURL(personId), {credentials: 'include'}).then((responseJSON) => {
        let PersonNBOs = PersonNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(PersonNBOs)
        })
      })
    }

    getPersonsByRole(roleId) {
      return this.#fetchAdvanced(this.#getPersonsByRoleURL(roleId), {credentials: 'include'})
      .then((responseJSON) => {
        let docentBOs = PersonNBO.fromJSON(responseJSON);
        console.log(docentBOs)
        return new Promise(function (resolve) {
          resolve(docentBOs);
        })
      })
    }

    //Project

    getAllProjects() {
      return this.#fetchAdvanced(this.#getAllProjectsURL(), {credentials: 'include'})
      .then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      })
    }

    getProjectById(projectId) {
      return this.#fetchAdvanced(this.#getProjectByIdURL(projectId), {credentials: 'include'})
      .then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      })
    }

    getProjectsByCurrentState(currentState) {
      return this.#fetchAdvanced(this.#getProjectsByCurrentState(currentState), {credentials: 'include'})
      .then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      })
    }

    getProjectsByPerson(personId) {
      return this.#fetchAdvanced(this.#getProjectsByPersonURL(personId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseProject = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseProject);
        })
      })
    }

    getAvailableProjectsOfStudent(studentId) {
      return this.#fetchAdvanced(this.#getAvailableProjectsOfStudentURL(studentId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseProject = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve(responseProject);
        })
      })
    }

    getRegisteredProjectsOfStudent(studentId) {
      return this.#fetchAdvanced(this.#getRegisteredProjectsOfStudentURL(studentId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseProject = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve (responseProject);
        })
      })
    }

    addProject(projectNBO) {
      return this.#fetchAdvanced(this.#addProjectURL(), {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(projectNBO)
      }).then((responseJSON) => {
        let projectNBO = ProjectNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(projectNBO);
        })
      })
    }

    updateProject(projectNBO) {
      return this.#fetchAdvanced(this.#updateProjectURL(),{
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(projectNBO) 
      }).then((responseJSON) => {
        let responseProjectNBO = ProjectNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseProjectNBO);
        })
      })
    }

    deleteProject(projectId) {
      return this.#fetchAdvanced(this.#deleteProjectURL(projectId), {
        method: 'DELETE',
        credentials: 'include'

      }).then((responseJSON) => {
        let responseProjectNBO = ProjectNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseProjectNBO);
        })
      })
    }

    //ProjectType

    getProjectTypeById(projectTypeId) {
      return this.#fetchAdvanced(this.#getProjectTypeByIdURL(projectTypeId), {credentials: 'include'})
      .then((responseJSON) => {
        let ProjectTypeNBOs = ProjectTypeNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(ProjectTypeNBOs);
        })
      })
    }

    getProjectTypeOfProject(projectId) {
      return this.#fetchAdvanced(this.#getProjectTypeOfProjectURL(projectId), {credentials: 'include'}).then((responseJSON) => {
          let responseProjectType = ProjectTypeNBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
              resolve(responseProjectType)
          })
      })
    };
   
    // Grading

    getAllGradings() {
      return this.#fetchAdvanced(this.#getAllGradingsURL(), {credentials: 'include'}).then((responseJSON) => {
        let gradingBOs = GradingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(gradingBOs)
        })
      })
    };

    //Module
    
    getModuleByProject(projectId) {
      return this.#fetchAdvanced(this.#getModuleByProjectURL(projectId), {credentials: 'include'}).then((responseJSON) => {
          let responseModule = ModuleNBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
              resolve(responseModule)
          })
      })
    };

    getModuleById(moduleId) {
      return this.#fetchAdvanced(this.#getModuleByIdURL(moduleId), {credentials: 'include'})
      .then((responseJSON) => {
        let ModuleNBOs = ModuleNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(ModuleNBOs);
        })
      })
    }

    //Participation

    addParticipation(participationBO) {
      return this.#fetchAdvanced(this.#addParticipationURL(), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(participationBO)
      }).then((responseJSON) => {
        let participationBO = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(participationBO);
        })
      })
    }

    getParticipationByStudent(studentId) {
      return this.#fetchAdvanced(this.#getParticipationByStudentURL(studentId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(responseParticipation);
        })
      })
    }

    getAllParticipations() {
      return this.#fetchAdvanced(this.#getAllParticipationsURL(), {credentials: 'include'})
      .then((responseJSON) => {
        let ParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ParticipationBOs);
        })
      })
    }

    getParticipationsByProject(projectId) {
      return this.#fetchAdvanced(this.#getParticipationsByProjectURL(projectId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipation);
        })
      })
    }

    deleteParticipation(participationId) {
      return this.#fetchAdvanced(this.#deleteParticipationURL(participationId), {
        method: 'DELETE',
        credentials: 'include'
      }).then((responseJSON) => {
        let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(responseParticipation);
        })
      })
    }

    //Student

    addStudent(studentNBO) {
      return this.#fetchAdvanced(this.#addStudentURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(studentNBO)
      }).then((responseJSON) => {
        let studentNBO = StudentNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(studentNBO);
        })
      })
    }

    getStudentByGoogleId(googleId) {
      return this.#fetchAdvanced(this.#getStudentByGoogleIdURL(googleId), {credentials: 'include'}).then((responseJSON) => {
        let studentNBO = StudentNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve(studentNBO)
        })
      })
    }

    getStudentsByProject(projectId) {
      return this.#fetchAdvanced(this.#getStudentsByProjectURL(projectId)).then((responseJSON) => {
        let studentNBO = StudentNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve(studentNBO)
        })
      })
    }


    getAllStudents() {
      return this.#fetchAdvanced(this.#getAllStudentsURL(), {credentials: 'include'})
      .then((responseJSON) => {
        let StudentNBOs = StudentNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(StudentNBOs);
        })
      })
    }

    deleteStudent(studentId) {
      return this.#fetchAdvanced(this.#deleteStudentURL(studentId), {
        method: 'DELETE', credentials: 'include'
      }).then((responseJSON) => {
        let responseStudent = StudentNBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(responseStudent);
        })
      })
    }

    updateStudent(studentNBO) {
      console.log(JSON.stringify(studentNBO))
      return this.#fetchAdvanced(this.#updateStudentURL(studentNBO),{
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(studentNBO) 
      }).then((responseJSON) => {
        let responseStudentNBO = StudentNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStudentNBO);
        })
      })
    }

    //Semester

    getSemesterById(semesterId) {
      return this.#fetchAdvanced(this.#getSemesterByIdURL(semesterId), {credentials: 'include'})
      .then((responseJSON) => {
        let SemesterNBOs = SemesterNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(SemesterNBOs);
        })
      })
    }

    //Grading

    getGradingByParticipation(participationId) {
      return this.#fetchAdvanced(this.#getGradingByParticipationURL(participationId), {credentials: 'include'})
      .then((responseJSON) => {
        let responseGrading = GradingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseGrading);
        })
      })
    }


    getGrading(gradingId) {
        return this.#fetchAdvanced(this.#getGradingURL(gradingId)).then((responseJSON) => {
          let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
          // console.info(responseCustomerBO);
          return new Promise(function (resolve) {
            resolve(responseGradingBO);
          })
        })
      }

    getGradingById(gradingId) {
        return this.#fetchAdvanced(this.#getGradingByIdURL(gradingId)).then((responseJSON) => {
            let responseGrading = GradingBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGrading)
            })
        })
    };

    createGrading(grading) {
        return this.#fetchAdvanced(this.#createGradingURL(grading)).then((responseJSON) => {
            let responseGrading = GradingBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGrading)
            })
        })
    };

    createGradingForParticipation(grading) {
        return this.#fetchAdvanced(this.#createGradingForParticipationURL(grading)).then((responseJSON) => {
            let responseGrading = GradingBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGrading)
            })
        })
    };

    saveGrading(gradingId) {
        return this.#fetchAdvanced(this.#saveGradingURL(gradingId), {
          method: 'POST'
        }).then((responseJSON) => {
          let responseGradingBO = GradingBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(responseGradingBO);
          })
        })
      }

    deleteGrading(gradingId) {
        return this.#fetchAdvanced(this.#deleteGradingURL(gradingId), {
          method: 'DELETE'
        }).then((responseJSON) => {
          let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responseGradingBO);
          })
        })
      }
    
    updateGrading(gradingBO) {
        return this.#fetchAdvanced(this.#updateGradingURL(gradingBO.getID()), {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(gradingBO)
        }).then((responseJSON) => {
          let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responseGradingBO);
          })
        })
      }

    addGrading(gradingBO) {
      return this.#fetchAdvanced(this.#addGradingURL(), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(gradingBO)
      }).then((responseJSON) => {
        let gradingBO = GradingBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
          resolve(gradingBO);
        })
      })
    }

    removeGradingFromParticipation(gradingId, participationId) {
        return this.#fetchAdvanced(this.#removeGradingFromParticipationURL(gradingId, participationId.getId()), {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(participationId)
        }).then((responseJSON) => {
            let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseParticipation)
            })
        })
    }; 


    /**getStudentById(studentId) {
      return this.#fetchAdvanced(this.#getStudentByIdURL(studentId))
      .then((responseJSON) => {
        let StudentNBOs = StudentNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(StudentNBOs);
        })
      })
    }
    */

    
}

