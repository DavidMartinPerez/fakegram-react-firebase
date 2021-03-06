import React, { Component } from 'react';

class FileUpload extends Component {

    constructor(){
        super();
        this.state = {
            uploadValue: 0
        };
    }

    render () {
        return (
            <div>
                <progress value={ this.props.uploadValue } max="100">
                    { this.props.uploadValue }
                </progress>
                <br />
                <input className="fileUpload" type="file" onChange={ this.props.onUpload } />
                <br />
            </div>
        )
    }


}

export default FileUpload;