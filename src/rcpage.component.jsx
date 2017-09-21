import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'rc-pagination';
import '../assets/index.less';

class App extends React.Component {
    constructor(props){
        super(props);
         this.state = {current:1,pageSize:5,total:0,data:[]};
         this.onChange=this.onChange.bind(this);
         this.MMM=this.MMM.bind(this);
         this.loadDataFromServer=this.loadDataFromServer.bind(this);
    }
        MMM(){
            console.log("called");
            alert("HHM")
        }
    componentDidMount(){
        this.loadDataFromServer();
    }

    loadDataFromServer(){
        fetch("http://localhost:3000/users/test?perPage="+this.state.pageSize+"&offset="+(this.state.current-1)*this.state.pageSize,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
                if(response.ok)
                    return response.json();
                else
                    window.alert("failed");
        })
        .then((response)=>{
                this.setState({data:response.data});
                this.setState({total:response.total});
        })
    }
  onChange(page){
    console.log(page);
    this.setState({ current: page},()=>
            {this.loadDataFromServer()}
    );
  }
  render() {
      
    return  (<div>
        <UserData data={this.state.data}/>
            <Pagination 
                onChange={this.onChange} 
                current={this.state.current} 
                total={this.state.total} 
                pageSize={this.state.pageSize} 
                showSizeChanger/>
        </div>)
  }
}

class UserData extends React.Component{
    render(){
        var MMM=this.props.MMM;
        return <div >
            {this.props.data.map(function(user,i){
                     return <div className="row" >
                
                         <div className="col-md-1 col-sm-1 col-md-offset-1" >
                            <a onClick={MMM}>{user.user_id}</a>
                            </div>
                         <div className="col-md-1 col-sm-1">
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
                            
                     </div> 
                     },this)}
        </div>
    }
}

export default App;