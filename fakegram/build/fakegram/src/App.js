import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './FileUpload';

class App extends Component {
    constructor (){
        super();
        this.state = {
            user: null,
            pictures: [],
            uploadValue: 0
        };

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        });

        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            });
        })
    }

    //SignIn
    handleAuth () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then( result => { console.log(`${result.user.email} ha iniciado sesión`) })
            .catch( err => console.log(err) )
    }
    //deslogeare
    handleLogout() {
        firebase.auth().signOut()
            .then( result => { console.log(`${result.user.email} ha cerrado sesión`) })
            .catch( err => console.log(err) )
    }
    //Subir fichero
    handleUpload (e) {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref( `/photo/${file.name}` );
        var task = storageRef.child(`${file.name}`).put(file);

        task.on( 'state_changed', ( snapshot ) => {
            let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
            this.setState({
                uploadValue: percentage
            });
        }, ( error ) => {
            console.log(error);
        }, () => {
            storageRef.child(file.name).getDownloadURL().then((url) => {
                const record = {
                    photoURL: this.state.user.photoURL,
                    displayName: this.state.user.displayName,
                    image: url
                }
                const dbRef = firebase.database().ref('pictures');
                const newPicture = dbRef.push();
                newPicture.set(record)
            });
        });
    }
    //Render boton
    renderLoginButton () {
        //Logeado
        if(this.state.user){
            return (
                <div>
                    <img src={this.state.user.photoURL} width="350" alt={this.state.user.displayName} />
                    <p>Hola {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}> Salir</button>
                    <FileUpload onUpload={this.handleUpload} />

                    {
                        this.state.pictures.map( picture  => (
                            <div className="subida">
                                <div className="subida__user">
                                    <img className="subida__fotoUsuario" src={picture.photoURL} alt={picture.displayName} />
                                    <span className="subida__nombreUsuario">{picture.displayName}</span>
                                </div>
                                <img className="subida__fotoSubida" src={picture.image} alt=""/>
                            </div>
                        )).reverse()
                    }
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
