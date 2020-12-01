import logo from './logo.svg';
import './App.css';
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
function App () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
  export default App;