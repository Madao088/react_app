import React,{ Component} from "react";
import ReactPaginate from 'react-paginate';

class Users extends React.Component{
    
    constructor(props){
        super(props);
        this.redirectToEdit=this.redirectToEdit.bind(this);
        this.state={data:[],pageSize:2,currPage:0,pageData:[]};
        //this.changePage=this.changePage.bind(this);
        this.redirectToAdd=this.redirectToAdd.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:3000/mongo_users",{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    throw new Error("Server error");
        })
        .then((response) =>{
            console.log(response);
            var i=0;
            var result=[];
            response.forEach((res)=>{
                if(res==null)
                    delete response[i];
                else{
                 var tech="";
                 var skills="";
                 Object.keys(res.technology).forEach(function(key) {
                        if(res.technology[key].length>0)
                            tech+=key+',';
                        res.technology[key].forEach(function(skill){
                            skills+=skill+',';
                        })
                    });

                    response[i].technology=tech;
                    response[i].skills=skills;
                    result.push(response[i]);
                }
                i++;
                
            })

            result.total=Object.keys(result).length;

            this.setState({data:result});
            this.setState({pageData:result.slice(0,this.state.pageSize)});
            this.setState({lastPage:result.total/this.state.pageSize});

        })

    }

    // changePage(e){
    //     var cp=this.state.currPage;
    //     if(e=="back"){
    //         if(cp>0){
    //             cp=this.state.currPage-1;
    //             this.setState({currPage:cp});
    //        }
    //     }else if(e=="next"){
    //         if(cp<this.state.lastPage-1){
    //             cp=this.state.currPage+1;
    //             this.setState({currPage:cp});
    //         }
    //     }else{
    //         console.log(e);
    //         cp=e-1;
    //         this.setState({currPage:cp});
    //     }
    //     console.log(cp);    
    //     var start=cp*this.state.pageSize;
    //     var pd=this.state.data.slice(start,start+this.state.pageSize);
    //        this.setState({pageData:pd});

    // }
    onDeleteClick(e){
        fetch("http://localhost:3000/mongo_users/"+e,{
            method:"Delete",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
                if(response.ok){
                    window.alert("Deleted");
                    window.location.reload();
                    }
                else
                    window.alert("Failed");
        })
        .then((response)=>{
                
        });
            
    }
    redirectToEdit(e){
        this.props.history.push("/edit?id="+e);   
        };

    redirectToAdd(){
        this.props.history.push("/add");   
        };
    onEditClick(e){
        fetch("http://localhost:8080/test/Api/"+e,{
            method:"Put",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
                if(response.ok)
                    return response.json();
                else
                    throw new Error("Unable to Edit");
        })
        .then((response)=>{
                window.alert("Edited");
        })
    }
    
    render(){

        // var pages=[];
        // for (var i=0;i<this.state.lastPage;i++){
        //     pages.push(i+1);
        // }
        var center={
        "text-align":"center",
        "border-style":"hidden hidden solid hidden "
    }
        var tableRow={
            
        }

        var add={
            "margin-left":"46%",
            "margin-top":"10px"
        }

        var pageNo={
            "display":"inline-flex",
            "list-style-type":"none"
        }
        return (
            <div>
            <Header/>
            <div className="row">
            <div  style={center}>
	<div className="row" >
		{/* <div className="col-md-1 col-sm-1 col-md-offset-1">
			<h4>Id</h4>
		</div> */}
		<div className="col-md-1 col-sm-1 col-md-offset-1">
			<h4>Name</h4>
		</div>	
		<div className="col-md-2 col-sm-2">
			<h4>Email</h4>
		</div>	
        <div className="col-md-2 col-sm-2">
			<h4>Address</h4>
		</div>	
        <div className="col-md-1 col-sm-1">
			<h4>Gender</h4>
		</div>
        <div className="col-md-1 col-sm-1">
			<h4>State</h4>
		</div>
        <div className="col-md-1 col-sm-1">
			<h4>Technology</h4>
		</div>
        <div className="col-md-1 col-sm-1">
			<h4>Skills</h4>
		</div>
	</div>
    
                           {this.state.data.map(function(user,i){
                               return <div className="row" style={tableRow}>
                
                         {/* <div className="col-md-1 col-sm-1 col-md-offset-1">
                            {user._id}
                            </div> */}
                         <div className="col-md-1 col-sm-1 col-md-offset-1">
                            {user.name}
                            </div>
                        <div className="col-md-2 col-sm-2">
                            {user.email}
                            </div> 
                            <div className="col-md-2 col-sm-2">
                            {user.address}
                            </div> 
                            <div className="col-md-1 col-sm-1">
                            {user.gender}
                            </div> 
                            <div className="col-md-1 col-sm-1">
                            {user.state}
                            </div>
                             <div className="col-md-1 col-sm-1">
                            {user.technology}
                            </div> 
                            <div className="col-md-1 col-sm-1">
                            {user.skills}
                            </div> 
                        <div className="col-md-2 col-sm-2">
                             <button onClick={this.redirectToEdit.bind(this,user._id)}>Edit</button>
                            <button onClick={this.onDeleteClick.bind(this,user._id)}>Delete</button> 
						</div>
                        
                     </div>
                             }, this) }
                   
                </div>
                {/* <ul style={pageNo}>
                    <li>
                       <a href="#" onClick={this.changePage.bind(this,"back")}> back</a>
                        </li>
                    {pages.map((page,i)=>{
                        return <li><a href="#" onClick={this.changePage.bind(this,page)}> {page}</a></li>
                    })}
                    <li>
                        <a href="#" onClick={this.changePage.bind(this,"next")}> next</a>
                        </li>
                    </ul> */}
                </div>
                <button onClick={this.redirectToAdd} style={add}>Add new user</button>
                <div className="App">
      </div>
                </div>
        );
    }
}

class Header extends React.Component{
    
    render(){
        var header={
        "height":"50px",
        "text-align":"center",
        "border-style":"hidden hidden solid hidden",
    }
        var title={
            "margin-top":"-2px"
        }
        return(
            <div className="row" style={header}>
                <h2 style={title}>Users</h2>
                </div>
        )
    }
}



export default Users;