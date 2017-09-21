import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ReactBootStrap extends React.Component{
    constructor(props){
        super(props);
        
     this.state = {data:[],total:0,currentPage:1,
            sizePerPage:1};
     this.loadDataFromServer=this.loadDataFromServer.bind(this);
     this.onPageChange=this.onPageChange.bind(this);
     this.mmm=this.mmm.bind(this);
    }

    componentDidMount(){
        this.loadDataFromServer();
    }
    onPageChange(page,sizePerPage){
        this.setState({currentPage:page},()=>{
            this.loadDataFromServer();
        })
    }
    loadDataFromServer(){
        fetch("http://localhost:3000/users/test?perPage="+this.state.sizePerPage+"&offset="+(this.state.currentPage-1)*this.state.sizePerPage,{
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
    mmm(){
        console.log("yo");
    }
render(){

    return <BootstrapTable data={this.state.data} striped={true} 
     fetchInfo={ { dataTotalSize: this.state.total } }
            hover={true} remote={ true } pagination 
            options={{
                sizePerPage:this.state.sizePerPage,
                onPageChange:this.onPageChange,
                page:this.state.currentPage
            }}>
      <TableHeaderColumn dataField="user_id" isKey={true}  dataAlign="center" onClick={this.mmm}>User ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" >User Name</TableHeaderColumn>
      <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
      <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
      <TableHeaderColumn dataField="gender">Gender</TableHeaderColumn>
  </BootstrapTable>
}
}

export default ReactBootStrap;
