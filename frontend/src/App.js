import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseconfig';
import Header from './components/layout/Header';
//import About from './components/pages/About';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import './App.css';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';


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

    return(
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header user={currentUser} />
						{ 
							// Is a user signed in?
							currentUser ?
								<>
									<Redirect to='startpage' />
                  <SignIn/>
									<Route path='/startpage'>
										<SignIn/>
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