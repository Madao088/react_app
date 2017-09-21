import React, { Component } from 'react';

class Upload extends React.Component{
    constructor(props){
        super(props);
        this.sendData=this.sendData.bind(this);
    }

    sendData(e){
        const reader = new FileReader();
         const file = e.target.files[0];
         var formData  = new FormData();
         formData.append("file",file);
         console.log(file)
        fetch('http://localhost:3000/users/upload',{
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
            <input type='file'  onChange={this.sendData} />
            </div>
        );
    }
}

export default Upload;