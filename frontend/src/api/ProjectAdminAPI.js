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
    #getGradingByParticipationIdURL = (participationId) => `${this.#projectServerBaseURL}/grading/by-participation-id`;
    #getGradingByIdURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingURL = (grading) => `${this.#projectServerBaseURL}/gradings`;
    #createGradingForParticipationURL = () => `${this.#projectServerBaseURL}/gradings`;
    #saveGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #deleteGradingURL = (gradingId) => `${this.#projectServerBaseURL}/gradings`;
    #updateGradingURL = (gradingBO) => `${this.#projectServerBaseURL}/gradings`;
    #addGradingToParticipationURL = (gradingId, participationId) => `${this.#projectServerBaseURL}/gradings`;
    #removeGradingFromParticipationURL = (gradingId, participationId) => `${this.#projectServerBaseURL}/gradings`;

     // Module related
/*     #getAllModulesURL = () => `${this.#projectServerBaseURL}/modules`;
    #getModuleByIdURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #getModuleByNameURL = (name) => `${this.#projectServerBaseURL}/modules`;
    #getModuleByEdvNumberURL = (edvNumber) => `${this.#projectServerBaseURL}/modules`;
    #createModuleURL = () => `${this.#projectServerBaseURL}/modules`;
    #saveModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #deleteModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;
    #updateModuleURL = (moduleId) => `${this.#projectServerBaseURL}/modules`;  */
       
    // Participation related

    // Person related

    // Project related
    #getAllProjectsURL = () => `${this.#projectServerBaseURL}/projects`;
    //#getAcceptedProjectsURL  = (projectId) => `${this.#projectServerBaseURL}/

    // ProjectType related
    #getProjectTypeByIdURL = (projectTypeId) => `${this.#projectServerBaseURL}/project/project-type/§{project_type_id}`;

    // Semester related

    // Student related


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
   
    // Gibt eine Promise zurück mit einer Liste von GradingBOs

    getAllGradings() {
      return this.#fetchAdvanced(this.#getAllGradingsURL()).then((responseJSON) => {
        let gradingBOs = GradingBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(gradingBOs)
        })
      })
    };
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

    
}