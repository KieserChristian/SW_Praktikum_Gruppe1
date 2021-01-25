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

export default class ProjectAdminAPI {

    static #api = null;

    // Local Backend
    #projectServerBaseURL = 'http://localhost:5000/project';

    // Grading related
    #getAllGradingsURL = () => `${this.#projectServerBaseURL}/gradings`;
    #getGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #getGradingByParticipationIdURL = (participationId) => `${this.#projectServerBaseURL}/grading-by-participation-id`;
    #getGradingByIdURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingURL = (grading) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingForParticipationURL = () => `${this.#projectServerBaseURL}/gradings`;
    #saveGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #deleteGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #updateGradingURL = (gradingBO) => `${this.#projectServerBaseURL}/gradings`;
    #addGradingToParticipationURL = (gradingId, participationId) => `${this.#projectServerBaseURL}/gradings`;
    #removeGradingFromParticipationURL = (gradingId, participationId) => `${this.#projectServerBaseURL}/gradings`;

    #getModuleByProjectURL = (projectId) => `${this.#projectServerBaseURL}/module-by-project/${projectId}`;

     // Module related
/*     #getAllModulesURL = () => `${this.#projectServerBaseURL}/modules`;
    
    #getModuleByNameURL = (name) => `${this.#projectServerBaseURL}/modules`;
    #getModuleByEdvNumberURL = (edvNumber) => `${this.#projectServerBaseURL}/modules`;
    #createModuleURL = () => `${this.#projectServerBaseURL}/modules`;
    #saveModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #deleteModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #updateModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;  */
       
    // Participation related
    #getAllParticipationsURL = () => `${this.#projectServerBaseURL}/participations`;
    #getParticipationByIdURL = (participationId) => `${this.#projectServerBaseURL}/participation/{participation}`;
    #getParticipationsOfStudentURL = (participationId) => `${this.#projectServerBaseURL}/participation-of-student/${participationId}`;
    #addParticipationToProjectURL = (projectId) => `${this.#projectServerBaseURL}/project_of_participation/${projectId}`;
    #addParticipationURL = () => `${this.#projectServerBaseURL}/participation`;

    // Person related
    #getAllPersonsURL = () => `${this.#projectServerBaseURL}/persons`;

    // Project related
    #getAllProjectsURL = () => `${this.#projectServerBaseURL}/projects`;
    #getNumberEctsByProjectURL = (projectId) => `${this.#projectServerBaseURL}/number-ects-by-project/${projectId}`;
    #getNumberSwsByProjectURL = (projectId) => `${this.#projectServerBaseURL}/number-sws-by-project/${projectId}`;
    //#getAcceptedProjectsURL  = (projectId) => `${this.#projectServerBaseURL}/
    #getProjectByIdURL = (projectId) => `${this.#projectServerBaseURL}/project/{project_id}`

    // ProjectType related
    #getProjectTypeByIdURL = (projectTypeId) => `${this.#projectServerBaseURL}/project/project-type/§{project_type_id}`;
    #getProjectTypeByProjectURL = (projectId) => `${this.#projectServerBaseURL}/project-type-by-project/${projectId}`;

    // Semester related

    // Student related
    #getStudentByEmailURL = (email) => `${this.#projectServerBaseURL}/student/${email}`;
    #getAllStudentsURL = () => `${this.#projectServerBaseURL}/students`;

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
    
    getAllPersons() {
      return this.#fetchAdvanced(this.#getAllPersonsURL())
      .then((responseJSON) => {
        let PersonNBOs = PersonNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(PersonNBOs);
        })
      })
    }

    //Project

    getAllProjects() {
      return this.#fetchAdvanced(this.#getAllProjectsURL())
      .then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      })
    }

    

    getProjectById(projectId) {
      return this.#fetchAdvanced(this.#getProjectByIdURL(projectId))
      .then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      })
    }

    getNumberEctsByProject(projectId) {
      return this.#fetchAdvanced(this.#getNumberEctsByProjectURL(projectId)).then((responseJSON) => {
          let responseNumberEcts = ProjectTypeNBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
              resolve(responseNumberEcts)
          })
      })
  };

  getNumberSwsByProject(projectId) {
    return this.#fetchAdvanced(this.#getNumberSwsByProjectURL(projectId)).then((responseJSON) => {
        let responseNumberSws = ProjectTypeNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseNumberSws)
        })
    })
  };

    //ProjectType

    getProjectTypeById(projectTypeId) {
      return this.#fetchAdvanced(this.#getProjectTypeByIdURL(projectTypeId))
      .then((responseJSON) => {
        let ProjectTypeNBOs = ProjectTypeNBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(ProjectTypeNBOs);
        })
      })
    }

    getProjectTypeByProject(projectId) {
      return this.#fetchAdvanced(this.#getProjectTypeByProjectURL(projectId)).then((responseJSON) => {
          let responseProjectType = ProjectTypeNBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
              resolve(responseProjectType)
          })
      })
    };
   
    // Grading

    getAllGradings() {
      return this.#fetchAdvanced(this.#getAllGradingsURL()).then((responseJSON) => {
        let gradingBOs = GradingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(gradingBOs)
        })
      })
    };

    //Module
    
    getModuleByProject(projectId) {
      return this.#fetchAdvanced(this.#getModuleByProjectURL(projectId)).then((responseJSON) => {
          let responseModule = ModuleNBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
              resolve(responseModule)
          })
      })
    };

    //Participation

    addParticipationToProject(projectId) {
      return this.#fetchAdvanced(this.#addParticipationToProjectURL(projectId), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(projectId)
      })
    }

    addParticipation(participationBO) {
      return this.#fetchAdvanced(this.#addParticipationURL(), {
        method: 'POST',
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

    getParticipationById(participationId) {
      return this.#fetchAdvanced(this.#getParticipationByIdURL(participationId))
      .then((responseJSON) => {
        let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipationBO);
        })
      })
    }

    getParticipationsOfStudent(studentId) {
      return this.#fetchAdvanced(this.#getParticipationsOfStudentURL(studentId))
      .then((responseJSON) => {
        let responseParticipationsOfStudent = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipationsOfStudent);
        })
      })
    }

    getAllParticipations() {
      return this.#fetchAdvanced(this.#getAllParticipationsURL())
      .then((responseJSON) => {
        let ParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ParticipationBOs);
        })
      })
    }

    //Student

    getStudentByEmail(email) {
      return this.#fetchAdvanced(this.#getStudentByEmailURL(email)).then((responseJSON) => {
        let studentNBO = StudentNBO.fromJSON(responseJSON);
        return new Promise(function(resolve) {
          resolve(studentNBO)
        })
      })
    }

    getAllStudents() {
      return this.#fetchAdvanced(this.#getAllStudentsURL())
      .then((responseJSON) => {
        let StudentNBOs = StudentNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(StudentNBOs);
        })
      })
    }

/*
    getGrading(gradingId) {
        return this.#fetchAdvanced(this.#getGradingURL(gradingId)).then((responseJSON) => {
          let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
          // console.info(responseCustomerBO);
          return new Promise(function (resolve) {
            resolve(responseGradingBO);
          })
        })
      }

    getGradingByParticipationId(participationId) {
        return this.#fetchAdvanced(this.#getGradingByParticipationIdURL(participationId)).then((responseJSON) => {
            let responseGrading = GradingBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseGrading)
            })
        })
    };

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

    addGradingToParticipation(gradingId, participationId) {
        return this.#fetchAdvanced(this.#addGradingToParticipationURL(gradingId, participationId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain'
            },
        }).then((responseJSON) => {
            let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseParticipation)
            })
        })
    };

    removeGradingFromParticipation(gradingId, participationId) {
        return this.#fetchAdvanced(this.#removeGradingFromParticipationURL(gradingId, participationId.getId()), {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(participation)
        }).then((responseJSON) => {
            let responseParticipation = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseParticipation)
            })
        })
    }; */


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

