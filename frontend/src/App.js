import firebase from "firebase/app";
import "firebase/auth";
import Themen from "./Theme";
//import der Components
import firebaseConfig from "./firebaseconfig";


class App extends React.Component {

    //Constructor of the App, which initializes firebase */
    constructor(props) {
        super (props);

        //Init empty state 
        this.state = {
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false
        }; 
    };

}