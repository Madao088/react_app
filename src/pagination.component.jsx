import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

class Paginate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      perPage:1
    }

    this.handlePageClick=this.handlePageClick.bind(this);
  }

  loadCommentsFromServer(){
        fetch("http://localhost:3000/users/test?perPage="+this.state.perPage+"&offset="+this.state.offset,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
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
            this.setState({data: response.data, pageCount:response.total/this.state.perPage});
        })
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  handlePageClick (data){
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    this.setState({offset:offset},() => 
        {this.loadCommentsFromServer()});
  };

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    );
  }
};

class CommentList extends React.Component{

    render() {
    let commentNodes = this.props.data.map(function(user,i){
                               console.log(this);
                               return <div className="row">
                
                         <div className="col-md-1 col-sm-1 col-md-offset-1">
                            {user.user_id}
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
                             });

    return (
      <div id="project-comments" className="commentList">
          <div className="row" >
		<div className="col-md-1 col-sm-1 col-md-offset-1">
			<h4>Id</h4>
		</div>
		<div className="col-md-1 col-sm-1">
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
      
	</div>
    
        <ul>    
          {commentNodes}
        </ul>
      </div>
    );
  }
}



export default Paginate;