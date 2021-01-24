import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseconfig';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import LogIn from './components/pages/LogIn';
import StudentGradingView from './components/StudentGradingView';
import StudentView from './components/StudentView';
import StudentNavigation from './components/StudentNavigation';
import DocentBewertungsListe from './components/DocentBewertungsListe';
import StudentAvailableProjectsView from './components/StudentAvailableProjectsView';
import DocentView from './components/DocentView';
import AdminView from './components/AdminView';
import DocentNavigation from './components/DocentNavigation';
import AdminNavigation from './components/AdminNavigation';
import DocentTeilnehmerliste from './components/DocentTeilnehmerliste';
import DocentMeineProjekte from "./components/DocentMeineProjekte";
import DocentProjectCreation from './components/DocentProjectCreation';
import AdminEingereichteProjekte from './components/AdminEingereichteProjekte';




/*
Die Haupt-Projektverwaltungs-App. Wir benutzen Google Firebase zum Login.
Um die User zu den einzelnen Seiten zu leiten, wird react-router-com benutzt.
 */

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      AppError: null,
      authError: null,
      authLoading: false
    };
  }

	//Create an error boundary for this app and recieve all errors from below the component tree.
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {appError: error};
  }

  // Handles firebase users logged in state changes
  handleAuthStateChange = user => {
    if (user) {
      this.setState({
        authLoading: true
      });

      // Hier muss am Ende der Domain-Name hinzugefügt werden
      // The user is signed in
      user.getIdToken().then(token => {
        // Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
        document.cookie = `token=${token}; path=/; domain=;`;

        // Set the user not before the token arrived 
        this.setState({
          currentUser: user,
          authError:null,
          authLoading: false
        });

      }).catch(e =>{
        this.setState({
          authError: e,
          authLoading: false
        });
      });

    } else {
      //User has logged out, so clear the id token
      document.cookie = 'token=;path=/';

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: false
      });
    }
  }

  // Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  /*Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	Initializes the firebase SDK. */
  componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }
  
  // Die gesamte Applikation rendern
  render() {
    const { currentUser, appError, authError, authLoading } = this.state;
    if(currentUser){console.log(currentUser.email)}
    return(
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						{ 
							// Is a user signed in?
							currentUser ?
								<>
                <Redirect from='/' to='login'/>
                <Route exact path='/login'>
                  <LogIn/>
                </Route>
                <Route path='/student'>
                  <StudentNavigation/>
                </Route>
                <Route path='/student/projektübersicht'>
                  <StudentView/>
                  <StudentAvailableProjectsView currentUserEmail={currentUser.email} />
                </Route>
                <Route path='/student/leistungsübersicht'>
                  <StudentGradingView/>
                </Route>
                <Route path='/dozent'>
                  <DocentNavigation/>
                </Route>
                <Route path='/dozent/projektübersicht'>
                  <DocentView/>
                  
                </Route>
                <Route path='/dozent/docentview'>
                  
                 
                  <DocentTeilnehmerliste/>
                </Route>
                <Route path='/dozent/neuesprojekt'>
                  <DocentProjectCreation/>
                </Route>
                <Route path='/admin'>
                  <AdminNavigation/>
                </Route>

                <Route path='/admin/projektübersicht'>
                  <AdminEingereichteProjekte/>
                </Route>
                         
								</>
								:
								// else show the sign in page
								<>
									<Redirect to='/SignIn' />
									<SignIn onSignIn={this.handleSignIn} />
                </>
						}
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Während deiner Anmeldung lief etwas schief.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Während deiner Anmeldung lief etwas schief. Bitte lade die Seite erneut.`} />
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;