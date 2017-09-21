import React,{Component} from "react";


class Add extends React.Component {
    constructor(props){
        super(props);
        this.state={ states: [],items :'',form:{},tech:[],skills:[],tech_skills:[],temp_tech:[],temp_skill:[]};
        this.sendData=this.sendData.bind(this);
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
    sendData(){
        var state=this.state;
        var form=this.state.form;
        var technology={};
        
            console.log("yo");
        state.tech.forEach(function(tch){
            var tech=[];
            if(form.skills){
                form.skills.forEach(function(skill){
                        if(tch.skills.indexOf(skill)>-1)
                        tech.push(skill);
                })
            }
            technology[tch.technology]=tech;
        })
        form.technology=technology;
        this.setState({form:form});
        this.setState({temp_skill:this.state.form.skills});
        this.setState({temp_tech:this.state.form.tech});

        delete this.state.form.skills;
        delete this.state.form.tech;

        fetch('http://localhost:3000/mongo_users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                data: this.state.form,
                author:'hammad'
            })
        })
        .then((response)=>{

            if(response.ok){
                window.alert("success");
                this.props.history.push("/users");    
            }
            else{
                console.log("errpr");
                this.showError(response.statusText);
                }
        })
        
    }

    
    componentDidMount(){
        fetch('http://localhost:3000/mongo_users/states')
             .then((response) => {
                 console.log(response);
                 if(response.ok)
                    return response.json();
                 else
                     window.alert(response.statusText);
             })
            .then((json)=>{
                this.setState({states:json});

            });

            fetch('http://localhost:3000/mongo_users/techs')
            .then((response)=>{
                if(response.ok)
                    return response.json();
                 else
                    window.alert(response.statusText);
            })
                .then((json)=>{
                     this.setState({tech:json});   
                     var skills={};
                     json.forEach(function(res){

                         skills[res.technology]=res.skills;
                     })
                        
                        this.setState({skills:skills});
                         console.log(this.state);
                })
           
    }
        handleChange(e){
            var temp=this.state.form;
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
                if(e.target.checked){
                        arr.push(e.target.value);
                    }
                else{
                    var i=arr.indexOf(e.target.value);
                    if(i>-1)
                        arr.splice(i,1);
                }
                temp[e.target.name]=arr;
            }
            else 
                temp[e.target.name]=e.target.value;
            this.setState({form:temp});
    }

        onBackClick(){
        this.props.history.push("/users");
    }
   render() {
      return (
         <div> 
              <input type="text" name="name" placeholder="Name" onChange={this.handleChange}  /><br></br>
              <input type="text" name="email" placeholder="Email" onChange={this.handleChange}></input><br></br>
              <textarea onChange={this.handleChange} name="address"></textarea><br/>
                <label>Gender :</label>
            <label><input type="radio" name="gender" value="male"  onChange={this.handleChange}/>Male</label>
            <label><input type="radio" name="gender" value="female"  onChange={this.handleChange}/>Female</label><br/>
            <label>Technology :</label>
              {this.state.tech.map((tech,i)=>
                <label><input type="checkbox" name="tech" value={tech.technology} onChange={this.handleChange}/>{tech.technology}</label> )}<br/>  
              {/* {this.state.tech.map((tech,i)=><Checkbox key={i} data={tech}/>)}<br/>   */}
            <label >Skills :</label>
              {this.state.tech_skills.map( (skill,i)=>
                <label><input type="checkbox" name="skills" value={skill} onChange={this.handleChange}/>{skill}</label>
                
            )}  <br/>
            <label>State :</label>
                 <select value={this.state.value} onChange={this.handleChange} name="state">
                     <option>Select a state</option>
                     {this.state.states.map((state, i) => <Dropdown key = {i} data = {state} />)} 
                     {/* {this.state.states.map(function(state, i){ return <Dropdown key = {i} data = {state} />})}  */}
                </select> <br/>
                 <button onClick={this.sendData}>Submit</button>  
                <button onClick={this.onBackClick}>Back</button>
         </div>
      );
   }
}

class Dropdown extends React.Component{
    render(){
        return (
         <option value={this.props.data.name} >{this.props.data.name}</option>
        );
    }
}

class Checkbox extends React.Component{
    render(){
        return(
            <label><input type="checkbox" name="tech" onChange={this.handleChange} value={this.props.data.technology}/>{this.props.data.technology}</label>
        )
    }
}
export default Add;

