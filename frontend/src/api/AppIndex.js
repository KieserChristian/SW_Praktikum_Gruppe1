/**Soll zum Reexport der BOs und NBOs dienen. Stichwort: Encapsulation refers to the bundling of data with the methods that operate on that data, or the restricting of direct access to some of an object's components.
 * Use: hide the values or state of a structured data object inside a class, preventing unauthorized parties' direct access to them
 * Publicly accessible methods are generally provided in the class (so-called "getters" and "setters") to access the values, and other client classes call these methods to retrieve and modify the values within the object.
 */

 export {default as BussinessObject} from "./BusinessObject"
 export {default as NamedBusinessObject} from "./NamedBusinessObject";
 export {default as PersonNBO} from "./PersonNBO";
 export {default as ProjectNBO} from "./ProjectNBO";
 export {default as StudentNBO} from "./StudentNBO";