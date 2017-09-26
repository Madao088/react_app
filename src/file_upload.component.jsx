import React, { Component } from 'react';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.handleFileChange=this.handleFileChange.bind(this);
        
        this.state={files:[]};
    }

    handleFileChange(e){

        const reader = new FileReader();
        this.setState({files:e.target.files})
        var files=this.state.files;
        var formData  = new FormData();
        Object.keys(e.target.files).forEach(function(key) {
            //files.push(e.target.files[key]);
            formData.append('files', e.target.files[key]);
        });
        console.log(formData);
        
        
        fetch('http://localhost:3000/test/upload',{
            method: "POST",
            body: formData
        })
        .then(function(res){
            console.log(res);
            if (res.ok) {
                alert("Perfect! ");
            } else if (res.status == 401) {
                alert("Oops! ");
            }
        });
    }
    render(){
        return(
        <div>
            <input type='file'  onChange={this.handleFileChange} multiple/>
            </div>
        );
    }
}

export default Upload;