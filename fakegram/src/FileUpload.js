import React, { Component } from 'react';
import firebase from 'firebase/app';

class FileUpload extends Component {

    constructor(){
        super();
        this.state = {
            uploadValue: 0,
            picture: null
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload (e) {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref( `/photo/${file.name}` );
        const task = storageRef.put( file );

        task.on( 'state_changed', ( snapshot ) => {
            console.log(snapshot)
            let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
            this.setState({
                uploadValue: percentage
            });
        }, ( error ) => {
            console.log(error);
        }, () => {
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
        });
    }


    render () {
        return (
            <div>
                <progress value={ this.state.uploadValue } max="100">
                    { this.state.uploadValue } %
                </progress>
                <br />
                <input type="file" onChange={ this.handleUpload } />
                <br />
                <img width="350" src={ this.state.picture } alt="" />
            </div>
        )
    }


}

export default FileUpload;