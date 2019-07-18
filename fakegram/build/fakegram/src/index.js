import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyA_cD99g2wypo3Jxb5jnQJs9gP5PxM4yog",
    authDomain: "fakegram-3cfc2.firebaseapp.com",
    databaseURL: "https://fakegram-3cfc2.firebaseio.com",
    projectId: "fakegram-3cfc2",
    storageBucket: "fakegram-3cfc2.appspot.com",
    messagingSenderId: "936070948045"
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
