import React,{Component} from "react";

const queryString = require('query-string');


class Update extends React.Component{
    constructor(props){
        super(props);
        const parsed = queryString.parse(this.props.location.search);
        
        this.state={id:parsed.id,data:{},states:[],tech:[],skills:[],tech_skills:[]};
        
        this.onUpdateClick=this.onUpdateClick.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onBackClick=this.onBackClick.bind(this);
        this.showError=this.showError.bind(this);
    }
    showError(e){
        var form=this.state.form;
        form.skills=this.state.temp_skill;
        form.tech=this.state.temp_tech;
        this.setState({form:form});
        window.alert(e);
    }
    handleChange(e){
            var temp=this.state.data;
            console.log(this.state);
            if(e.target.name=="tech"){
                var arr=temp[e.target.name];
                var skills=this.state.tech_skills;
                if(arr==undefined)
                    var arr=[];
                if(e.target.checked){
                    arr.push(e.target.value);
                        this.state.skills[e.target.value].forEach(function(skill){
                            skills.push(skill);
                        })
                        this.setState({tech_skills:skills});
                 }
                else{
                    var i=arr.indexOf(e.target.value);
                    if(i>-1)
                        arr.splice(i,1);
                    this.state.skills[e.target.value].forEach(function(skill){

                            var i=skills.indexOf(skill);
                            if(i>-1)
                                     skills.splice(i,1);
                        })
                }
                temp[e.target.name]=arr;
            }
            else if(e.target.type=="checkbox"){
                var arr=temp[e.target.name];
                if(arr==undefined)
                    var arr=[];
                if(e.target.checked)
                    arr.push(e.target.value);
                else{
                    var i=arr.indexOf(e.target.value);
                    //console.log(i);
                    if(i>-1)
                        arr.splice(i,1);
                }
                temp[e.target.name]=arr;
            }
            else
                temp[e.target.name]=e.target.value;
            this.setState({data:temp});
            console.log(this.state);
    }
    componentDidMount(){
        

        fetch('http://localhost:3000/mongo_users/states')
             .then((response) => {
                 if(response.ok)
                    return response.json();
                 else{
                    this.showError(response.statusText);
                 }
                    
             })
            .then((json)=>{
                this.setState({states:json});

            });
        
        fetch('http://localhost:3000/mongo_users/techs')
            .then((response)=>{
                if(response.ok)
                    return response.json();
                 else
                    this.showError(response.statusText);
            })
                .then((json)=>{
                    var skills={};
                     json.forEach(function(res){

                         skills[res.technology]=res.skills;
                     })
                        
                        this.setState({skills:skills});
                     this.setState({tech:json});   
                })

        fetch("http://localhost:3000/mongo_users/"+this.state.id,
        {
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        .then((response)=>{
            console.log(response);
            if(response.ok)
                return response.json();
            else{
                console.log("error");
                window.alert(response.statusText);
                this.props.history.push("/users");
            }
        })
        .then((response)=>{
            var state=this.state;
            var tech=[];
            var skills=[];
            Object.keys(response.technology).forEach(function(key){
                if(response.technology[key].length>0){
                    tech.push(key); 
                    response.technology[key].forEach(function(val){
                         skills.push(val);
                    })
                    state.tech.forEach(function(val){
                        if(val.technology==key){
                            val.skills.forEach(function(skill){
                                state.tech_skills.push(skill);
                            })
                        }
                    })
                }
            });
            var i=0;
            response.tech=tech;
            response.skills=skills;
            this.setState({data:response});
            console.log(this.state);

        })

    }
    onBackClick(){
        this.props.history.push("/users");
    }
    onUpdateClick(){
        var state=this.state;
        var form=this.state.data;
        var technology={};
        state.tech.forEach(function(tch){
            var tech=[];
            form.skills.forEach(function(skill){
                 if(tch.skills.indexOf(skill)>-1)
                    tech.push(skill);
            })
            technology[tch.technology]=tech;
        })
        form.technology=technology;
        this.setState({form:form});
        
        delete this.state.data.skills;
        delete this.state.data.tech;
        console.log(this.state.data);
        fetch("http://localhost:3000/mongo_users/"+this.state.id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                data: this.state.data
            })

        })
        .then((response)=>{
            if(response.ok){
                window.alert("Updated");
                this.props.history.push("/users");
                }
            else
                window.alert("Failed");
        })
    }
    render(){
        console.log(this.state.data.tech);
        return(
        <div>
            <input type="text" name="name" onChange={this.handleChange} value={this.state.data.name}/><br/>
            <input type="text" name="email" onChange={this.handleChange} value={this.state.data.email}/><br/>
            <textarea name="address" value={this.state.data.address} onChange={this.handleChange}></textarea><br/>
            Gender :
            <label><input type="radio" name="gender" value="male" checked={this.state.data.gender=="male"} onChange={this.handleChange}/>Male</label>
            <label><input type="radio" name="gender" value="female" checked={this.state.data.gender=="female"} onChange={this.handleChange}/>Female</label><br/>
            State :
                 <select value={this.state.data.state} onChange={this.handleChange} name="state">
                     <option>Select a state</option>
                     {this.state.states.map((state, i) => <Dropdown key = {i} data = {state} />)} 
            </select><br/>
            Technology : 
                 {this.state.tech.map((tech,i)=>
                <label><input type="checkbox" name="tech" checked={this.state.data.tech.indexOf(tech.technology)>=0}value={tech.technology} onChange={this.handleChange}/>{tech.technology}</label> )}<br/>  
                 
            Skills: 
                 {this.state.tech_skills.map((skill,i)=>
                <label><input type="checkbox" name="skills" checked={this.state.data.skills.indexOf(skill)>=0}value={skill} onChange={this.handleChange}/>{skill}</label> )}<br/>  
                 
            <button onClick={this.onUpdateClick}>Save</button>
            <button onClick={this.onBackClick}>Back</button>
        </div>
            )
    }
}
class Dropdown extends React.Component{
    render(){
        return (
         <option value={this.props.data.name} >{this.props.data.name}</option>
        );
    }
}
export default Update;