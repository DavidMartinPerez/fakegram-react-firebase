import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload';

class App extends Component {
    constructor (){
        super();
        this.state = {
            user: null
        };

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        })
    }

    //SignIn
    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then( result => { console.log(`${result.user.email} ha iniciado sesión`) })
            .catch( err => console.log(err) )
    }
    handleLogout() {
        firebase.auth().signOut()
            .then( result => { console.log(`${result.user.email} ha cerrado sesión`) })
            .catch( err => console.log(err) )
    }
    //Render boton
    renderLoginButton () {
        //Logeado
        if(this.state.user){
            return (
                <div>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}> Salir</button>
                    <FileUpload />
                </div>
            )
        } else{
        return ( <button onClick={this.handleAuth}> Login con google </button> )
        }
        // No logeado
    }
    render() {
        return (
            <div className="App">
                <header className="">
                    <h2>FakeGram</h2>
                </header>
                <div className="App-intro">
                    { this.renderLoginButton() }
                </div>
            </div>
        );
    }
}

export default App;
